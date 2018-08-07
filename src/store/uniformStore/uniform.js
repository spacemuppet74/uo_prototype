import { observable, action, flow, computed } from "mobx";

export default class Uniform {
  @observable id = "";
  @observable name = "";
  @observable description = "";
  @observable departments = [];
  @observable colour = {};
  @observable image = "";
  @observable sizes = "";
  @observable genders = "";
  @observable categories = "";
  @observable maxOrderAmount = 4;

  constructor({
    Id,
    Title = "",
    description,
    roles,
    uniform_image,
    colour,
    available_sizes,
    genderId,
    categoryId
  }) {
    this.id = Id;
    this.name = Title;
    this.description = description;
    this.departments = roles;
    this.colour = colour || {};
    this.image = uniform_image.Url || "https://placekitten.com/200/300";
    this.sizes = available_sizes;
    this.genders = genderId;
    this.categories = categoryId;
  }
}
