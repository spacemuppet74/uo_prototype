import { observable, action, flow, computed } from "mobx";

import spCategoryApi from "../../api/spCategoryApi";
import Category from "./category";

export default class CategoryStore {
  @observable loading = false;
  @observable categories = new Map();
  @observable activeCategory = 0;

  constructor(rootstore) {
    this.rootstore = rootstore;
    this.loadData();
  }

  @computed
  get getCategories() {
    return [...this.categories.values()];
  }

  @action
  loadData = () => {
    this.fetchCategory();
  };

  @action
  setActiveCategory = categoryId => {
    this.activeCategory = categoryId;
  };

  fetchCategory = flow(function*() {
    this.loading = true;
    try {
      const categories = yield spCategoryApi.fetchCategories();
      categories.forEach(category =>
        this.categories.set(category.Id, new Category(category))
      );
      this.loading = false;
    } catch (error) {
      console.log("error fetching categories ", error);
      this.loading = false;
    }
  });
}
