import { combineReducers } from "redux";
import home from "./home";
import user from "./user";
import auth from "./auth";
export default combineReducers({
  home,
  user,
  auth
});
