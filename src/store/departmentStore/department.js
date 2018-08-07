import { observable, action, flow, computed } from "mobx";

export default class Department {
  @observable id = "";
  @observable title = "";
  @observable image = "";
  @observable description = "";

  constructor({ Id, Title, description, card_image = {} }) {
    this.id = Id;
    this.title = Title;
    this.description = description;
    this.image = card_image.Url || "";
  }
}
