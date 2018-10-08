import React from "react";
import TaskListRow from "./taskListRow";
import PropTypes from "prop-types";

const TaskList = ({ tasks }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Task Name</th>
          <th>Task Type</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <TaskListRow key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default TaskList;
