import { graphqlClient } from "../../../../api/apolloClient";
import gql from "fraql";

export async function  DeleteTask(id) {
  const delObject = {
    clientMutationId:
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15),
    taskId: id
  };

  const result = await graphqlClient.mutate({
    variables: { input: delObject },
    mutation: gql`
      mutation deleteTaskByTaskId($input: DeleteTaskByTaskIdInput!) {
        deleteTaskByTaskId(input: $input) {
          task {
            taskId
            taskName
            lastRunDatetime
            taskTypeId
          }
        }
      }
    `
  });

  return result;
}
