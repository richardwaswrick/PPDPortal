import { graphqlClient } from "../../../../api/apolloClient";
import { TaskInfo } from "./task.js";
import gql from "fraql";

export async function GetTasks() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allTasks {
          nodes {
            ${TaskInfo}
            }
          }
      }
    `
  });
  return result;
}

// import gql from "fraql";
// import { TaskInfo } from "./task.js";

// export const Tasks = gql`
//   {
//     allTasks {
//       nodes {
//         ${TaskInfo}
//       }
//     }
//   }
// `;
