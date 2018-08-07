import { observable, action, flow, computed } from "mobx";

import UserStore from "./userstore/userstore";
import DepartmentStore from "./departmentStore/departmentStore";
import UniformStore from "./uniformStore/uniformStore";

export default class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.departmentStore = new DepartmentStore(this);
    this.uniformStore = new UniformStore(this);
  }
}
