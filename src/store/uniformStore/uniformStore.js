import { observable, action, flow, computed } from "mobx";

import spUniformApi from "../../api/spUniformApi";
import Uniform from "./uniform";

export default class UniformStore {
  @observable loading = false;
  @observable uniforms = new Map();
  @observable selectedDepartment = null;

  constructor(rootstore) {
    this.rootstore = rootstore;
  }

  @computed
  get isEmpty() {
    return this.uniforms.size == 0 ? true : false;
  }

  @computed
  get getUniforms() {
    return [...this.uniforms.values()].filter(uniform => {
      if (!this.selectedDepartment) {
        return true;
      }
      uniform.departments.some(
        department => department.Id === this.selectedDepartment
      );
    });
  }

  @action
  fetchUniforms = () => {
    if (this.uniforms.size === 0) {
      this.loadUniforms();
    }
  };

  @action
  setSelectedDepartment = ({ depart }) => {
    this.selectedDepartment = +depart;
  };

  loadUniforms = flow(function*() {
    this.loading = true;
    try {
      const uniforms = yield spUniformApi.fetchUniforms();
      console.log("uniforms ", uniforms);
      uniforms.forEach(uniform =>
        this.uniforms.set(uniform.Id, new Uniform(uniform))
      );
      console.log(this.uniforms.values().next());
      this.loading = false;
    } catch (error) {
      console.log("error fetching uniforms ", error);
      this.loading = false;
    }
  });
}
