import { graphqlClient } from "../../../../api/apolloClient";
import gql from "fraql";

export async function InsertTask(inTaskPatch) {
  const mappedTask = {
    task: {
      taskName: inTaskPatch.taskName,
      lastRunDatetime: inTaskPatch.lastRunDatetime,
      taskTypeId: inTaskPatch.taskTypeId
    }
  };

  const result = await graphqlClient.mutate({
    variables: { input: mappedTask },
    mutation: gql`
      mutation createTask($input: CreateTaskInput!) {
        createTask(input: $input) {
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
