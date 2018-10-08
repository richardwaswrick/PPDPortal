const Tasks = [
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
        resolve(Object.assign([], Tasks));
      }, 1000);
    });
  }

  static saveTask(Task) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTaskNameLength = 3;
        if (Task.taskName.length < minTaskNameLength) {
          reject(`Task Name must be at least ${minTaskNameLength} characters.`);
        }

        if (Task.id) {
          const existingTaskIndex = Tasks.findIndex(a => a.id === Task.id);
          Tasks.splice(existingTaskIndex, 1, Task);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new Tasks in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          Task.id = generateId(Task);
          Tasks.push(Task);
        }

        resolve(Object.assign({}, Task));
      }, 1000);
    });
  }

  static deleteTask(TaskId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTaskToDelete = Tasks.findIndex(a => a.id === TaskId);
        Tasks.splice(indexOfTaskToDelete, 1);
        resolve();
      }, 1000);
    });
  }
}

export default TaskApi;
