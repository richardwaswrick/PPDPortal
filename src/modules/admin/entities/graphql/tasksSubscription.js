import { TaskInfo } from "./task.js";
import gql from "fraql";

export const TasksSubscription = gql`
  subscription onTasksUpdated($endCursor: Int!) {
    tasksUpdated(endCursor: $endCursor) {
      mutation
      node {
        ${TaskInfo}
      }
    }
  }
`;
