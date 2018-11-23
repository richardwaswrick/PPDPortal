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
      taskTypeName
    }
  }
`;
