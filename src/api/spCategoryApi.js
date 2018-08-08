import { sp, PermissionKind } from "@pnp/sp";
import SpBaseApiConfig from "./spBaseConfig";

class SpCategoryApi extends SpBaseApiConfig {
  constructor() {
    super();
  }

  fetchCategories() {
    return this.web.lists
      .getByTitle("uo_categories")
      .items.orderBy("Title")
      .get();
  }
}

const spCategoryApi = new SpCategoryApi();

export default spCategoryApi;
