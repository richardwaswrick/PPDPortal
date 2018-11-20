import * as React from "react";
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

import { GetTasks } from "./graphql/tasksQuery";
import { UpdateTask } from "./graphql/updateTask";

const getRowId = row => row.taskId;

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
              : ""
        },
        {
          name: "lastRunDatetime",
          title: "Last Run",
          getCellValue: row => (row.lastRunDatetime ? row.lastRunDatetime : "")
        }
      ],
      hiddenColumnNames: ["taskId"],
      rows: []
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    let { rows } = this.state;

    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
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
        changed[row.taskId] ? { ...row, ...changed[row.taskId] } : row
      );

      //Todo: Find a better way to get the values
      var objVals = Object.entries(changed);
      var updateTask = {
        taskId: objVals[0][0],
        task: objVals[0][1]
      };

      UpdateTask(updateTask.taskId, updateTask.task);
    }

    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.taskId));
    }

    this.setState({ rows });
  }

  componentWillMount() {
    try {
      GetTasks().then(response => {
        this.setState({ rows: response.data.allTasks.nodes });
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {
      columns,
      hiddenColumnNames,
      rows
    } = this.state;

    return (
      <Card>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState onCommitChanges={this.commitChanges} />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
          <TableColumnVisibility
            hiddenColumnNames={hiddenColumnNames}
          />
        </Grid>
      </Card>
    );
  }
}
