import { graphqlClient } from "../../../../api/apolloClient";
import gql from "fraql";

export async function UpdateTask(inTaskId, inTaskPatch) {

  const mappedTask = {
    taskName: inTaskPatch.taskName,
    lastRunDatetime: inTaskPatch.lastRunDatetime,
    taskTypeId: inTaskPatch.taskTypeId,
    modifyByName: "admin@ppdbiz.com",
    modifyDatetime: new Date()
  };

  const result = await graphqlClient.mutate({
    variables: { taskId: inTaskId, taskPatch: mappedTask },
    mutation: gql`
      mutation UpdateTaskByTaskId($taskId: Int!, $taskPatch: TaskPatch!) {
        updateTaskByTaskId(
          input: { taskId: $taskId, taskPatch: $taskPatch }
        ) {
          task {
            taskId
            taskName
            lastRunDatetime
            taskTypeId
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
