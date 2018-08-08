import { observable, action, flow, computed } from "mobx";

import spUniformApi from "../../api/spUniformApi";
import Uniform from "./uniform";

export default class UniformStore {
  @observable loading = false;
  @observable uniforms = new Map();
  @observable selectedDepartment = null;

  constructor(rootstore) {
    this.rootstore = rootstore;
    this.fetchUniforms();
  }

  @computed
  get isEmpty() {
    return this.getUniforms.length == 0 ? true : false;
  }

  @computed
  get activeGender() {
    return this.rootstore.genderStore.activeGender;
  }

  @computed
  get activeCategory() {
    return this.rootstore.categoryStore.activeCategory;
  }

  @computed
  get getUniforms() {
    return [...this.uniforms.values()]
      .filter(uniform => {
        if (!this.selectedDepartment) {
          return true;
        }
        return uniform.departments.some(
          department => department.Id === this.selectedDepartment
        );
      })
      .filter(uniform => {
        if (!this.activeGender) {
          return true;
        }
        return uniform.genders.includes(this.activeGender);
      })
      .filter(uniform => {
        if (!this.activeCategory) return true;
        return uniform.categories.includes(this.activeCategory);
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
      uniforms.forEach(uniform =>
        this.uniforms.set(uniform.Id, new Uniform(uniform))
      );
      this.loading = false;
    } catch (error) {
      console.log("error fetching uniforms ", error);
      this.loading = false;
    }
  });
}
