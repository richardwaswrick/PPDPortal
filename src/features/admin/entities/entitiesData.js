import { graphqlClient } from "../../../api/apolloClient";
import gql from "graphql-tag";

export function GetTasks() {
  const result = graphqlClient.query({
    query: gql`
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
    `
  });
  return result;
}
