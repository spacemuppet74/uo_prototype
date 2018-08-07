import { observable, action, flow, computed } from "mobx";
import spDepartmentApi from "../../api/spDepartmentsApi";

import Department from "./department";

export default class DepartmentStore {
  @observable loading = false;
  @observable.shallow departments = new Map();

  constructor(rootstore) {
    this.rootstore = rootstore;
  }

  @computed
  get getDepartments() {
    return [...this.departments.values()];
  }

  @action
  loadDepartments = () => {
    this.fetchDepartments();
  };

  fetchDepartments = flow(function*() {
    this.loading = false;
    try {
      this.loading = false;
      const departments = yield spDepartmentApi.fetchDepartments();

      departments.forEach(department =>
        this.departments.set(department.Id, new Department(department))
      );
    } catch (error) {
      console.log("error fetching departments ", error);
      this.loading = false;
    }
  });
}
