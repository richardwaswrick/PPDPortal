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
import { GetTasks } from "./graphql/tasksQuery";
import { GetTaskTypes } from "./graphql/taskTypesQuery";
import { UpdateTask } from "./graphql/updateTask";
import { InsertTask } from "./graphql/insertTask";
import { DeleteTask } from "./graphql/deleteTask";

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
    load: async function() {
      try {
        return await GetTasks().then(response => {
          return {
            data: response.data.allTasks.nodes,
            totalCount: response.data.allTasks.nodes.totalCount
          };
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    update: async function(key, values) {
      try {
        console.log(values);
        return await UpdateTask(key, values).then(response => {
          return response.data.updateTaskByTaskId.task;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    insert: async function(values) {
      try {
        return await InsertTask(values).then(response => {
          return response.data.createTask.task;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    remove: async function(key) {
      try {
        return await DeleteTask(key).then(response => {
          const result = response.data.deleteTaskByTaskId.task.taskId;
          return result;
        });
      } catch (e) {
        throw Error("An error has occured..." + JSON.stringify(e));
      }
    }
  })
};

class TaskGrid extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DataGrid
          id={"gridContainer"}
          dataSource={dataSource}
          keyExpr={"taskId"}
          allowColumnReordering={true}
          showBorders={true}
          showColumnLines={true}
          showRowLines={true}
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
          <Column dataField={"lastRunDatetime"} dataType={"datetime"} />
          <Column dataField={"taskTypeId"} caption={"Type"}>
            <Lookup
              dataSource={lookupDataSource}
              displayExpr={"taskTypeName"}
              valueExpr={"taskTypeId"}
            />
          </Column>

          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 100]} />
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default TaskGrid;
