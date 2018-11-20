import * as React from "react";
import { Card } from "reactstrap";
import { EditingState } from "@devexpress/dx-react-grid";
import PropTypes from "prop-types";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  TableColumnVisibility
} from "@devexpress/dx-react-grid-bootstrap4";

const getRowId = row => row.taskId;

export default class TaskList extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    tasks: PropTypes.object,
    deleteTask: PropTypes.func.isRequired,
    loadData: PropTypes.func.isRequired
  };

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

  render() {
    const tableColumnExtensions = [{ columnName: "taskid", width: 60 }];
    const editingRowIds = [];
    const addedRows = [];
    const rowChanges = {};
    const defaultHiddenColumnNames = ["taskId"];
    const columns = [
      { name: "taskId", title: "Task Id" },
      { name: "taskName", title: "Task Name" },
      {
        name: "taskTypeName",
        title: "Type",
        getCellValue: row =>
          row.taskTypeByTaskTypeId ? row.taskTypeByTaskTypeId.taskTypeName : ""
      },
      {
        name: "lastRunDatetime",
        title: "Last Run",
        getCellValue: row => (row.lastRunDatetime ? row.lastRunDatetime : "")
      }
    ];

    const { loading, tasks } = this.props;

    const Loading = () => <div className="text-center">Loading</div>;
    const NoData = () => <div className="text-center">No data</div>;

    const RenderTasks = () => (
      <Grid
        rows={tasks.edges.map(({ node }) => node)}
        columns={columns}
        getRowId={getRowId}
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
          //showAddCommand={!addedRows.length}
          showEditCommand
          showDeleteCommand
        />
        <TableColumnVisibility
          defaultHiddenColumnNames={defaultHiddenColumnNames}
        />
      </Grid>
    );

    if (!loading) {
      console.log(tasks);
    }

    return (
      <Card>
        {loading && !tasks && <Loading />}
        {tasks && tasks.totalCount ? <RenderTasks /> : <NoData />}
      </Card>
    );
  }
}
