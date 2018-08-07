import { observable, action, flow, computed } from "mobx";

import spUserApi from "../../api/spUser";
import User from "./user";

export default class UserStore {
  @observable loading = false;
  @observable.shallow currentUser = {};

  constructor(rootstore) {
    this.rootstore = rootstore;
    this.loadCurrentUser();
  }

  loadCurrentUser = flow(function*() {
    this.loading = true;

    try {
      const user = yield spUserApi.fetchCurrentUserDetails();
      const [
        department,
        manager,
        employeeID,
        location,
        jobTitle,
        avatar
      ] = yield spUserApi.fetchUserProperties(user.LoginName, [
        "Department",
        "Manager",
        "employeeID",
        "SPS-Location",
        "Title",
        "PictureURL"
      ]);

      const isStaff = yield spUserApi.fetchIfUserStaff();
      const isApprover = yield spUserApi.fetchUserDirectReports(user.LoginName);
      const isAdmin = yield spUserApi.fetchIfUserAdmin(user.Email);

      this.currentUser = new User(
        user,
        department,
        manager,
        employeeID,
        location,
        jobTitle,
        avatar,
        isStaff,
        isApprover,
        isAdmin
      );

      this.loading = false;

      console.log(jobTitle);
    } catch (error) {
      console.log("error fetching current user", error);
      this.loading = false;
    }
  });
}
