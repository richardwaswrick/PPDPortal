import "./task.js";
import gql from "fraql";

export const TaskSubscription = gql`
  subscription onTaskUpdated($id: Int!) {
    taskUpdated(id: $id) {
      mutation
      id
      node {
        ...TaskInfo
      }
    }
  }
`;
