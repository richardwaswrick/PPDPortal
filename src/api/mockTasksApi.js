const tasks = [
  {
    id: 1,
    taskName: "Load GlobalCracts Inventory",
    taskType: "Logic App"
  },
  {
    id: 2,
    taskName: "Load GlobalCracts Pricing",
    taskType: "Logic App"
  },
  {
    id: 3,
    taskName: "Load GlobalCracts Products",
    taskType: "Logic App"
  }
];

const generateId = Task => {
  return Task.id = 12;
};

class TaskApi {
  static getAllTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], tasks));
      }, 150);
    });
  }

  static saveTask(task) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTaskNameLength = 3;
        if (task.taskName.length < minTaskNameLength) {
          reject(`Task Name must be at least ${minTaskNameLength} characters.`);
        }

        if (task.id) {
          const existingTaskIndex = tasks.findIndex(a => a.id === task.id);
          tasks.splice(existingTaskIndex, 1, task);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new Tasks in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          task.id = generateId(task);
          tasks.push(task);
        }

        resolve(Object.assign({}, task));
      }, 150);
    });
  }

  static deleteTask(TaskId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTaskToDelete = tasks.findIndex(a => a.id === TaskId);
        tasks.splice(indexOfTaskToDelete, 1);
        resolve();
      }, 150);
    });
  }
}

export default TaskApi;
