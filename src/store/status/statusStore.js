import { observable, action, flow, computed, toJS } from "mobx";

import spStatusApi from "../../api/spStatusApi";

export default class StatusStore {
  @observable loading = false;
  @observable status = [];
  @observable activeStatus = null;

  constructor(rootstore) {
    this.rootstore = rootstore;
    this.loadStatus();
  }

  @computed
  get getStatus() {
    return this.status.map(stat => ({ id: stat.Id, title: stat.Title }));
  }

  @computed
  get getActiveStatus() {
    return this.status.find(stat => stat.id === this.activeStatus);
  }

  @action
  loadStatus = () => {
    this.fetchStatus();
  };

  @action
  setActiveStatus = statusId => {
    this.activeStatus = statusId;
  };

  fetchStatus = flow(function*() {
    this.loading = false;

    try {
      const status = yield spStatusApi.fetchStatus();

      this.status = status;
      this.loading = false;
      console.log("status ", this.status);
      this.setActiveStatus(this.getStatus[0].id);
    } catch (error) {
      console.log("error fetching status ", error);
      this.loading = false;
    }
  });
}
