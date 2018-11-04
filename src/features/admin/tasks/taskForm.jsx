import React from "react";
import TextInput from "../../../components/common/textInput";
import PropTypes from "prop-types";

const TaskForm = ({ task, onSave, onChange, saving, errors }) => {
  return (
    <form>
      <h2>Manage Task</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="taskName"
        label="Task Name"
        value={task.taskName}
        onChange={onChange}
        error={errors.taskName}
      />

      <TextInput
        name="taskType"
        label="Task Type"
        value={task.taskType}
        onChange={onChange}
        error={errors.taskType}
      />

      <input
        type="submit"
        disabled={saving}
        value={saving ? "Saving..." : "Save"}
        className="btn btn-primary"
        onClick={onSave}
      />
    </form>
  );
};

TaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default TaskForm;
