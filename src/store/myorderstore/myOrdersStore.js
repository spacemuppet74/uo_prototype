import { observable, action, flow, computed, reaction } from "mobx";

import spOrdersApi from "../../api/spOrdersApi";

import Order from "./myorders";

export default class MyOrderStore {
  @observable loading = false;
  @observable myOrders = new Map();
  @observable numberOfItemPerPage = 2;
  @observable hasNext = false;
  @observable nextPage = null;
  @observable activeOrder = null;

  constructor(rootstore) {
    this.rootstore = rootstore;

    reaction(
      () => this.currentUser,
      currentUser => this.loadOrders(currentUser)
    );
  }

  @computed
  get currentUser() {
    return this.rootstore.userStore.currentUser;
  }

  @computed
  get isEmpty() {
    return this.myOrders.size === 0 ? true : false;
  }

  @computed
  get getMyOrders() {
    return [...this.myOrders.values()];
  }

  @action
  loadOrders = user => {
    this.myOrders.clear();
    this.fetchMyOrders(user.id);
  };

  @action
  setActiveOrder = orderId => {
    if (this.activeOrder == orderId) {
      this.activeOrder = null;
    } else {
      this.activeOrder = orderId;
    }
  };

  @action
  loadMore = () => {
    this.fetchMoreOrders();
  };

  @action
  addData = data => {
    data.forEach(order => this.myOrders.set(order.Id, new Order(this, order)));
  };

  fetchMyOrders = flow(function*(userId) {
    this.loading = true;
    try {
      const orders = yield spOrdersApi.getOrderForUser(
        userId,
        this.numberOfItemPerPage
      );

      this.addData(orders.results);
      console.log(orders.hasNext);
      this.hasNext = orders.hasNext;
      if (orders.hasNext) {
        this.nextPage = orders;
      }

      const firstOrder = this.myOrders.values().next().value;
      this.activeOrder = firstOrder.id;
      console.log("first order ", firstOrder);
      firstOrder.loadOrderItems();
      this.loading = false;
    } catch (error) {
      console.log("error fetching your orders ", error);
      this.loading = false;
    }
  });

  fetchMoreOrders = flow(function*() {
    this.loading = true;
    try {
      const orders = yield this.nextPage.getNext();

      this.addData(orders.results);
      this.hasNext = orders.hasNext;
      if (orders.hasNext) {
        this.nextPage = orders;
      }

      this.loading = false;
    } catch (error) {
      console.log("error loading more orders ", error);
      this.loading = false;
    }
  });
}
