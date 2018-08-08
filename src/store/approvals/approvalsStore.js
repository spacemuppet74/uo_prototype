import { observable, action, flow, computed, toJS } from "mobx";

import spOrdersApi from "../../api/spOrdersApi";
import Approval from "./approvals";

export default class ApprovalStore {
  @observable loading = false;
  @observable approvals = new Map();
  @observable numberOfItemsPerPage = 1;
  @observable hasNext = false;
  @observable nextPage = null;

  constructor(rootstore) {
    this.rootstore = rootstore;
  }

  @action
  loadApprovals = () => {
    const approver = this.rootstore.userStore.currentUser;

    this.fetchApprovals(approver, "pending");
  };

  fetchApprovals = flow(function*() {
    this.loading = true;
    try {
      const approvals = yield spOrdersApi.getOrdersForApproval();
      this.loading = false;
    } catch (error) {
      console.log("error fetching approvals ", error);
      this.loading = false;
    }
  });
}
