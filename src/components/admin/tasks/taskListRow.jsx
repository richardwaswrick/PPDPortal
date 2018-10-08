import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TaskListRow = ({ task }) => {
  return (
    <tr>
      <td>
        <a href={task.watchHref} target="_blank" rel="noopener noreferrer">
          Watch
        </a>
      </td>
      <td>
        <Link to={"admin/Task/" + task.id}>{task.taskName}</Link>
      </td>
      <td>{task.taskType}</td>
    </tr>
  );
};

TaskListRow.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskListRow;
