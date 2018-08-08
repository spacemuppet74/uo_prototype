import { observable, action, flow, computed, toJS } from "mobx";

export default class Approval {
  constructor(parent) {
    this.parent = parent;
  }
}
