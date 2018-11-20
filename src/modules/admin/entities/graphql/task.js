import gql from "fraql";

export const TaskInfo = gql`
  fragment TaskInfo on Task {
    taskId
    taskName
    lastRunDatetime
    taskTypeByTaskTypeId {
      taskTypeName
      taskTypeId
    }
  }
`;
