import { sp } from "@pnp/sp";
import SpBaseApiConfig from "./spBaseConfig";

class SpUniformApi extends SpBaseApiConfig {
  constructor() {
    super();
    this.fields = [
      "Id",
      "Title",
      "code",
      "genderId",
      "colour/Id",
      "colour/Title",
      "categoryId",
      "roles/Id",
      "roles/Title",
      "available_sizes/Id",
      "available_sizes/Title",
      "uniform_image",
      "description"
    ];
  }

  fetchUniforms() {
    return this.web.lists
      .getByTitle("uo_uniforms")
      .items.select(this.fields.join(","))
      .expand("colour", "roles", "available_sizes")
      .getAll();
  }
}

const spUniformApi = new SpUniformApi();
export default spUniformApi;
