import { graphqlClient } from "../../../api/apolloClient";
import gql from "fraql";

export const TaskInfo = gql`
  fragment TaskInfo on Task {
    taskId
    taskName
    lastRunDatetime
    taskTypeId
    createDatetime
    createByName
    modifyDatetime
    modifyByName
    taskTypeByTaskTypeId {
      taskTypeId
      taskTypeName
    }
  }
`;

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

export async function DeleteTask(id) {
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
        updateTaskByTaskId(input: { taskId: $taskId, taskPatch: $taskPatch }) {
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
