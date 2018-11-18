import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Card } from "reactstrap";
import { EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  TableColumnVisibility
} from "@devexpress/dx-react-grid-bootstrap4";

// import { generateRows, defaultColumnValues } from "./demoData";

const GET_ENTITIES = gql`
  {
    allTasks {
      nodes {
        taskId
        taskName
        lastRunDatetime
        taskTypeByTaskTypeId {
          taskTypeName
        }
      }
    }
  }
`;

export default class Entitites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "taskId", title: "Task Id" },
        { name: "taskName", title: "Task Name" },
        {
          name: "taskTypeName",
          title: "Type",
          getCellValue: row =>
            row.taskTypeByTaskTypeId
              ? row.taskTypeByTaskTypeId.taskTypeName
              : undefined
        },
        { name: "lastRunDatetime", title: "Last Run" }
      ],
      tableColumnExtensions: [{ columnName: "taskid", width: 60 }],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      defaultHiddenColumnNames: ["taskId"],
    };

    this.changeAddedRows = this.changeAddedRows.bind(this);
    this.changeEditingRowIds = this.changeEditingRowIds.bind(this);
    this.changeRowChanges = this.changeRowChanges.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
  }

  changeAddedRows(addedRows) {
    const initialized = addedRows.map(row =>
      Object.keys(row).length ? row : { TaskName: "New Task" }
    );
    this.setState({ addedRows: initialized });
  }

  changeEditingRowIds(editingRowIds) {
    this.setState({ editingRowIds });
  }

  changeRowChanges(rowChanges) {
    this.setState({ rowChanges });
  }

  commitChanges({ added, changed, deleted }) {
    let { rows } = this.state;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].taskid + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row
        }))
      ];
    }
    if (changed) {
      rows = rows.map(row =>
        changed[row.id] ? { ...row, ...changed[row.taskId] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.taskId));
    }
    this.setState({ rows });
  }

  render() {
    const {
      columns,
      tableColumnExtensions,
      editingRowIds,
      rowChanges,
      addedRows,
      defaultHiddenColumnNames
    } = this.state;

    return (
      <Card>
        <Query query={GET_ENTITIES}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <Grid
                rows={data.allTasks.nodes}
                columns={columns}
                getRowId={data.allTasks.nodes.taskId}
              >
                <EditingState
                  editingRowIds={editingRowIds}
                  onEditingRowIdsChange={this.changeEditingRowIds}
                  rowChanges={rowChanges}
                  onRowChangesChange={this.changeRowChanges}
                  addedRows={addedRows}
                  onAddedRowsChange={this.changeAddedRows}
                  onCommitChanges={this.commitChanges}
                />
                <Table columnExtensions={tableColumnExtensions} />
                <TableHeaderRow />
                <TableEditRow />
                <TableEditColumn
                  showAddCommand={!addedRows.length}
                  showEditCommand
                  showDeleteCommand
                />
                <TableColumnVisibility
                  defaultHiddenColumnNames={defaultHiddenColumnNames}
                />
              </Grid>
            );
          }}
        </Query>
      </Card>
    );
  }
}
