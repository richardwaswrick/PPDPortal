import App from "./components/app";
import Entities from "./components/admin/entities/entities";
import HomePage from "./components/home/index";
import Login from "./components/login/index";
import TasksPage from "./components/admin/tasks/tasksPage";
import ManageTaskPage from "./components/admin/tasks/manageTaskPage";

export const routes = [
  {
    key: "appRoute",
    component: App,
    path: "/"
  },
  {
    key: "taskListPageRoute",
    component: TasksPage,
    path: "/admin/tasks"
  },
  {
    key: "manageTasksPageRoute",
    component: ManageTaskPage,
    path: "/admin/task",
    exact: true
  },
  {
    key: "manageTaskPageRoute",
    component: ManageTaskPage,
    path: "/admin/task/:id",
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
