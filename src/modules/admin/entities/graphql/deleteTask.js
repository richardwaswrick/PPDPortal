import gql from "fraql";

export const DeleteTask = gql`
  mutation deleteTask($id: Int!) {
    deleteTaskByTaskId(taskId: $id) {
      id
    }
  }
`;
