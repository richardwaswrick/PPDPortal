import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_TASK_TYPE = gql`
  {
    allTaskTypes {
      nodes {
        taskTypeId
        taskTypeName
      }
    }
  }
`;

const TaskTypes = ({ onTaskTypeSelected }) => (
  <Query query={GET_TASK_TYPE}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <select
          className="form-control"
          name="taskType"
          onChange={onTaskTypeSelected}
        >
          {data.allTaskTypes.nodes.map(taskType => (
            <option key={taskType.taskTypeId} value={taskType.taskTypeName}>
              {taskType.taskTypeName}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);

export default TaskTypes;
