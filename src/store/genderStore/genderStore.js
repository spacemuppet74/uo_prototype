import { observable, action, flow, computed } from "mobx";

import spGendersApi from "../../api/spGendersApi";

import Gender from "./gender";

export default class GenderStore {
  @observable loading = false;
  @observable genders = new Map();
  @observable activeGender = null;

  constructor(rootstore) {
    this.rootstore = rootstore;
    this.loadData();
  }

  @computed
  get getGenders() {
    return [...this.genders.values()];
  }

  @action
  loadData = () => {
    this.fetchGenders();
  };

  @action
  setActiveGender = genderId => {
    this.activeGender = genderId;
  };

  fetchGenders = flow(function*() {
    this.loading = true;

    try {
      const genders = yield spGendersApi.fetchGenders();
      genders.forEach(gender =>
        this.genders.set(gender.Id, new Gender(gender))
      );
      this.loading = false;
    } catch (error) {
      console.log("Error fetching Genders", error);
      this.loading = false;
    }
  });
}
