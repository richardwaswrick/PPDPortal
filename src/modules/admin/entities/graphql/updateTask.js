import { graphqlClient } from "../../../../api/apolloClient";
import gql from "fraql";

export function UpdateTask(inTaskPatch) {

  const taskId = inTaskPatch.taskId;
  const mappedTask = {
    taskName: inTaskPatch.taskName,
    lastRunDatetime: inTaskPatch.lastRunDatetime,
    taskTypeId: inTaskPatch.taskTypeId,
    modifyByName: "admin@ppdbiz.com",
    modifyDatetime: new Date()
  };

  const result = graphqlClient.mutate({
    variables: { taskId: taskId, taskPatch: mappedTask },
    mutation: gql`
      mutation UpdateTaskByTaskId($taskId: Int!, $taskPatch: TaskPatch!) {
        updateTaskByTaskId(
          input: { taskId: $taskId, taskPatch: $taskPatch }
        ) {
          task {
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
