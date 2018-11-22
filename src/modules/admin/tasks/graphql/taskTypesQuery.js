import { graphqlClient } from "../../../../api/apolloClient";
import gql from "fraql";

export async function GetTaskTypes() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allTaskTypes {
          nodes {
            taskTypeId
            taskTypeName
          }
        }
      }
    `
  });
  return result;
}
