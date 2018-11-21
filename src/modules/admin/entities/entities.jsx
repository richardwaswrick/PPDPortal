import * as React from "react";
import { Card } from "reactstrap";
import { EditingState, DataTypeProvider } from "@devexpress/dx-react-grid";
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
import TaskTypes from "./components/taskTypeDrownDown";

const getRowId = row => row.taskId;

const TaskTypeProvider = props => (
  <DataTypeProvider editorComponent={TaskTypes} {...props} />
);

export default class Entitites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "taskId", title: "Task Id" },
        { name: "taskName", title: "Task Name" },
        {
          name: "taskTypeId",
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
      rows: [],
      TaskTypeColumns: ["taskTypeId"],
      editingColumnExtensions: [
        {
          columnName: "taskTypeId",
          createRowChange: (row, value) => ({
            taskId: row.taskId,
            taskTypeId: parseInt(value.id,10),
            taskTypeByTaskTypeId: { taskTypeName: value.text }
          })
        }
      ]
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
      var updatedTask = objVals[0][1];

      if (updatedTask) {
        UpdateTask(updatedTask);
      }
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
      rows,
      TaskTypeColumns,
      editingColumnExtensions
    } = this.state;

    return (
      <Card>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState
            onCommitChanges={this.commitChanges}
            columnExtensions={editingColumnExtensions}
          />
          <TaskTypeProvider for={TaskTypeColumns} />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
          <TableColumnVisibility hiddenColumnNames={hiddenColumnNames} />
        </Grid>
      </Card>
    );
  }
}
