import { graphqlClient } from "../../../../api/apolloClient";
import { EntityInfo } from "./entity.js";
import gql from "fraql";

export async function GetEntities() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allEntities {
          nodes {
            ${EntityInfo}
            }
          }
      }
    `
  });
  return result;
}
