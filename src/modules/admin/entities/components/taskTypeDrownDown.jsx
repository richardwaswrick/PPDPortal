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

const TaskTypes = ({ onValueChange }) => (
  <Query query={GET_TASK_TYPE}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      const handleChange = event => {
        const returnValue = {
          id: event.target.options[event.target.selectedIndex].value,
          text: event.target.options[event.target.selectedIndex].text
        };
        onValueChange(returnValue);
      };

      return (
        <select
          className="form-control"
          name="taskType"
          onChange={handleChange}
        >
          {data.allTaskTypes.nodes.map(taskType => (
            <option
              key={taskType.taskTypeName}
              value={taskType.taskTypeId}
              label={taskType.taskTypeName}
            >
              {taskType.taskTypeName}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);

export default TaskTypes;
