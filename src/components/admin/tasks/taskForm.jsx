import React from "react";
import TextInput from "../common/TextInput";
import PropTypes from "prop-types";

const TaskForm = ({ Task, onSave, onChange, saving, errors }) => {
  return (
    <form>
      <h1>Manage Task</h1>
      <TextInput
        name="title"
        label="Title"
        value={Task.taskName}
        onChange={onChange}
        error={errors.taskName}
      />

      <TextInput
        name="category"
        label="Category"
        value={Task.taskType}
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
  Task: PropTypes.object.isRequired,
  allAuthors: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default TaskForm;
