import Tasks from './components/admin/tasks';
import Entities from './components/admin/tasks';
import HomePage from './components/home/index';
import Login from './components/login/index';

export const routes = [{
  key: "taskRoute",
  component: Tasks,
  path: '/admin/tasks',
}, {
  key: "homeRoute",
  component: HomePage,
  path: '/home',
}, {
  key: "loginRoute",
  component: Login,
  path: '/Login',
}, {
  key: "entitiesRoute",
  component: Entities,
  path: '/admin/entities',
}, ];

//console.log(routes);

export default routes;
