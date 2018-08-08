import { observable, action, flow, computed, toJS } from "mobx";

import spOrderApi from "../../api/spOrdersApi";
import CartItem from "./CartItem";

export default class CartStore {
  @observable loading = false;
  @observable orderCompleted = false;
  @observable items = [];

  constructor(rootstore) {
    this.rootstore = rootstore;
  }

  @computed
  get cartIsEmpty() {
    return this.items.length === 0 ? true : false;
  }

  @computed
  get numOfItemsInCart() {
    console.log(this.items.length);
    return this.items.length;
  }

  @action
  addItemToCart = item => {
    const newItem = toJS(item);
    console.log("add item ", newItem);
    this.items.push(new CartItem(this, newItem));
  };

  @action
  removeItem = id => {
    console.log("remove itemw ith id ", id);
    const itemIdx = this.items.findIndex(item => item.id === id);
    this.items.splice(itemIdx, 1);
  };

  @action
  resetOrderCompleted = () => {
    this.orderCompleted = false;
  };

  @action
  submit = () => {
    const user = this.rootstore.userStore.currentUser;

    this.postOrder(user, toJS(this.items));
  };

  postOrder = flow(function*(user, order, isForSomeElse) {
    this.loading = true;
    try {
      const orderRecord = yield spOrderApi.postOrder(user, order);
      console.log("have posted order ", orderRecord);
      this.items = [];
      this.loading = false;
      this.orderCompleted = true;
      this.rootstore.myOrderStore.loadOrders(user);
    } catch (error) {
      console.log("error posting order ", error);
      this.posting = false;
    }
  });
}
