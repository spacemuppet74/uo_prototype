import { observable, action, flow, computed } from "mobx";

export default class User {
  @observable id = null;
  @observable displayName = "";
  @observable email = "";
  @observable jobTitle = "";
  @observable login = "";
  @observable department = "";
  @observable location = "";
  @observable roles = [];
  @observable avatar = "";
  @observable manager = "";
  @observable employeeID = null;

  constructor(
    { Id, Title, Email, LoginName },
    department = "",
    manager = "",
    employeeID = "",
    location = "",
    jobTitle = "",
    avatar = "",
    isStaff = false,
    isApprover = false,
    isAdmin = false
  ) {
    this.id = Id;
    this.displayName = Title;
    this.email = Email;
    this.login = LoginName;
    this.department = department;
    this.manager = manager;
    this.employeeID = employeeID;
    this.location = location;
    this.jobTitle = jobTitle;
    this.avatar = avatar;

    if (isStaff) this.addRole("staff");
    if (isApprover) this.addRole("approver");
    if (isAdmin) this.addRole("admin");
  }

  @computed
  get isStaff() {
    return this.roles.includes("staff");
  }

  @computed
  get isApprover() {
    return this.roles.includes("approver");
  }

  @computed
  get isAdmin() {
    return this.roles.includes("admin");
  }

  @action addRole = role => this.roles.push(role);
}
