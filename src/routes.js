import TasksPage from "./components/admin/tasks/tasksPage";
import Entities from "./components/admin/entities/entities";
import HomePage from "./components/home/index";
import Login from "./components/login/index";

export const routes = [
  {
    key: "taskRoute",
    component: TasksPage,
    path: "/admin/tasks"
  },
  {
    key: "homeRoute",
    component: HomePage,
    path: "/home"
  },
  {
    key: "loginRoute",
    component: Login,
    path: "/Login"
  },
  {
    key: "entitiesRoute",
    component: Entities,
    path: "/admin/entities"
  }
];

//console.log(routes);

export default routes;
