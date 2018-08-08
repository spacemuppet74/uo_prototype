import { observable, action, flow, computed } from "mobx";

import UserStore from "./userstore/userstore";
import DepartmentStore from "./departmentStore/departmentStore";
import UniformStore from "./uniformStore/uniformStore";
import GenderStore from "./genderStore/genderStore";
import CategoryStore from "./categoryStore/categoryStore";
import CartStore from "./cartstore/CartStore";
import MyOrderStore from "./myorderstore/myOrdersStore";
import ApprovalStore from "./approvals/approvalsStore";
import StatusStore from "./status/statusStore";

export default class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.departmentStore = new DepartmentStore(this);
    this.uniformStore = new UniformStore(this);
    this.genderStore = new GenderStore(this);
    this.categoryStore = new CategoryStore(this);
    this.cartStore = new CartStore(this);
    this.myOrderStore = new MyOrderStore(this);
    this.approvalStore = new ApprovalStore(this);
    this.statusStore = new StatusStore(this);
  }
}
