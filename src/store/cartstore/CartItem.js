import { observable, action, flow, computed } from "mobx";

export default class CartItem {
  @observable selectedSize = null;
  @observable quantity = null;

  constructor(
    parent,
    {
      id,
      name,
      colour: { Id: colourId, Title: colour },
      image,
      sizes,
      selectedQuantity,
      selectedSize,
      maxOrderAmount
    }
  ) {
    this.parent = parent;
    this.id = Date.now(); // Temporary ID
    this.uniformId = id;
    this.name = name;
    this.colourId = colourId;
    this.colour = colour;
    this.image = image;
    this.sizes = sizes;
    this.selectedSize = selectedSize;
    this.quantity = selectedQuantity;
    this.maxOrderAmount = maxOrderAmount;
  }

  @computed
  get availableQuantites() {
    return [...Array(this.maxOrderAmount).keys()].map(amount => ({
      text: amount,
      value: amount
    }));
  }

  @computed
  get sizeOptions() {
    return this.sizes.map(size => ({ text: size.Title, value: size.Id }));
  }

  @action
  changeSize = size => {
    this.selectedSize = size;
  };

  @action
  changeQuantity = amount => {
    this.quantity = amount;
  };

  @action
  remove = () => {
    this.parent.removeItem(this.id);
  };
}
