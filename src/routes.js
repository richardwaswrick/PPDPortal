import Home from "./modules/home/homeComponent";
import RequireAuth from "./components/auth/requireAuth";
import login from "./modules/login/loginMessage";
import Tasks from "./modules/admin/tasks/index";
import Entities from "./modules/admin/entities/index";
import ShippingWeightTypes from "./modules/admin/shippingWeights/index";
import ShippingTypes from "./modules/admin/shippingTypes/index";
import ShippingRates from "./modules/admin/shippingRates/index";
import MinimumQuantities from "./modules/admin/minimumQuantities/index";

export const routes = [
  {
    key: "appRoute",
    component: login,
    path: "/",
    exact: true
  },
  {
    key: "homeRoute",
    component: RequireAuth(Home),
    path: "/home"
  },
  {
    key: "taskGridRoute",
    component: RequireAuth(Tasks),
    path: "/admin/tasks"
  },
  {
    key: "entitiesGridRoute",
    component: RequireAuth(Entities),
    path: "/admin/entities"
  },
  {
    key: "shippingWeightTypeRoute",
    component: RequireAuth(ShippingWeightTypes),
    path: "/admin/shippingweights"
  },
  {
    key: "shippingTypeRoute",
    component: RequireAuth(ShippingTypes),
    path: "/admin/shippingtypes"
  },
  {
    key: "shippingRateRoute",
    component: RequireAuth(ShippingRates),
    path: "/admin/shippingrates"
  },
  {
    key: "minQtyRateRoute",
    component: RequireAuth(MinimumQuantities),
    path: "/admin/minimumquantities"
  }
];

export default routes;
