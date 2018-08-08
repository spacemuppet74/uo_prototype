import { observable, action, flow, computed } from "mobx";

import spOrdersApi from "../../api/spOrdersApi";

export default class Order {
  @observable loading = "";
  @observable id = 0;
  @observable createdDate = "";
  @observable customerId = null;
  @observable customerName = "";
  @observable approverId = null;
  @observable approverName = "";
  @observable status = null;
  @observable items = [];

  constructor(parent, { ID, Created, customer = {}, approver = {}, status }) {
    this.parent = parent;
    const { Id: approverId = 0, Title: approverName = "Unknown" } = approver;
    const { Id: customerId = 0, Title: customerName = "Unknown" } = customer;
    this.id = ID;
    this.createdDate = Created;
    this.customerId = customerId;
    this.customerName = customerName;
    this.approverName = approverName;
    this.approverId = approverId;
    this.status = status;
  }

  @computed
  get itemsIsEmpty() {
    console.log("number of items to display ", this.items.length);
    return this.items.length === 0 ? true : false;
  }

  @action
  loadOrderItems = () => {
    this.fetchOrderDetails();
  };

  @action
  makeActive = () => {
    this.parent.setActiveOrder(this.id);
    this.loadOrderItems();
  };

  fetchOrderDetails = flow(function*() {
    this.loading = "loading";
    try {
      console.log("check items array ", this.items.length);
      if (this.items.length == 0) {
        console.log("fetching data");
        const orderDetails = yield spOrdersApi.getOrderDetails(this.id);

        orderDetails.forEach(order => this.items.push(order));
      }
      console.log("items ", this.items);
      this.loading = "";
    } catch (error) {
      console.log("loading orders details ", error);
      this.loading = "";
    }
  });
}
