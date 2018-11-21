import React from "react";
// import Button from "devextreme-react/button";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Lookup,
  Pager
} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";
import { GetTasks } from "../entities/graphql/tasksQuery";
import { GetTaskTypes } from "../entities/graphql/taskTypesQuery";
import { UpdateTask } from "../entities/graphql/updateTask";

const lookupDataSource = {
  store: new CustomStore({
    key: "taskTypeId",
    loadMode: "raw",
    load: async function() {
      try {
        const response = await GetTaskTypes();
        return response.data.allTaskTypes.nodes;
      } catch (e) {
        console.log(e);
        throw Error("Data Loading Error");
      }
    }
  }),
  sort: "taskTypeName"
};

const dataSource = {
  store: new CustomStore({
    key: "taskId",
    load: function() {
      try {
        return GetTasks().then(response => {
          return {
            data: response.data.allTasks.nodes,
            totalCount: response.data.allTasks.nodes.totalCount
          };
        });
      } catch (e) {
        console.log(e);
        throw Error("Data Loading Error");
      }
    },
    update: function(key, values) {
      try {
        UpdateTask(key, values);
      } catch (e) {
        console.log(e);
        throw Error("Update Error");
      }
    }
  })
};

class TaskGrid extends React.Component {
  //constructor(props) {
  //  super(props);
  // this.state = { events: [] };
  // this.logEvent = this.logEvent.bind(this);
  // this.onEditingStart = this.logEvent.bind(this, "EditingStart");
  // this.onInitNewRow = this.logEvent.bind(this, "InitNewRow");
  // this.onRowInserting = this.logEvent.bind(this, "RowInserting");
  // this.onRowInserted = this.logEvent.bind(this, "RowInserted");
  // this.onRowUpdating = this.logEvent.bind(this, "RowUpdating");
  // this.onRowUpdated = this.logEvent.bind(this, "RowUpdated");
  // this.onRowRemoving = this.logEvent.bind(this, "RowRemoving");
  // this.onRowRemoved = this.logEvent.bind(this, "RowRemoved");
  // this.clearEvents = this.clearEvents.bind(this);
  //}

  // logEvent(eventName) {
  //   this.setState(state => {
  //     return { events: [eventName].concat(state.events) };
  //   });
  // }

  // clearEvents() {
  //   this.setState({ events: [] });
  // }

  render() {
    return (
      <React.Fragment>
        <DataGrid
          id={"gridContainer"}
          dataSource={dataSource}
          keyExpr={"taskid"}
          allowColumnReordering={true}
          showBorders={true}
          // onEditingStart={this.onEditingStart}
          // onInitNewRow={this.onInitNewRow}
          // onRowInserting={this.onRowInserting}
          // onRowInserted={this.onRowInserted}
          // onRowUpdating={this.onRowUpdating}
          // onRowUpdated={this.onRowUpdated}
          // onRowRemoving={this.onRowRemoving}
          // onRowRemoved={this.onRowRemoved}
        >
          <Paging enabled={true} />
          <Editing
            mode={"row"}
            refreshMode={"repaint"}
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
          />

          <Column dataField={"taskName"} />
          <Column dataField={"lastRunDatetime"} dataType={"date"} />

          <Column dataField={"taskTypeId"} caption={"Type"} width={125}>
            <Lookup
              dataSource={lookupDataSource}
              displayExpr={"taskTypeName"}
              valueExpr={"taskTypeId"}
            />
          </Column>

          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 100]} />
        </DataGrid>

        {/* <div id={"events"}>
          <div>
            <div className={"caption"}>Fired events</div>
            <Button id={"clear"} text={"Clear"} onClick={this.clearEvents} />
          </div>
          <ul>
            {this.state.events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div> */}
      </React.Fragment>
    );
  }
}

export default TaskGrid;
