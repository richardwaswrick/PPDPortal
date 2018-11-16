import gql from "graphql-tag";
import { Query } from "react-apollo";
import React from "react";

const GET_ENTITIES = gql`
  {
    allTasks {
      nodes {
        taskName
        lastRunDatetime
        taskTypeByTaskTypeId {
          taskTypeName
        }
      }
    }
  }
`;

export default class ManageEntitiesPage extends React.Component {
  render() {
    return (
      <Query query={GET_ENTITIES}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return data.allTasks.nodes.map(({ taskName, taskTypeByTaskTypeId }) => (
            <table className="table" key={taskName}>
              <tr>
                <td>{taskName}</td>
                <td>{taskTypeByTaskTypeId.taskTypeName}</td>
              </tr>
            </table>
          ));
        }}
      </Query>
    );
  }
}
