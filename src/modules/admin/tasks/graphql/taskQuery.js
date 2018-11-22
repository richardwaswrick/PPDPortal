import "./task.js";
import gql from "fraql";

export const Task = gql`
  query task($id: Int!) {
    task(id: $id) {
      ...TaskInfo
    }
  }
`;
