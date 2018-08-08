import SpBaseApiConfig from "./spBaseConfig";

class SpGendersApi extends SpBaseApiConfig {
  constructor() {
    super();
  }

  fetchGenders() {
    return this.web.lists.getByTitle("uo_genders").items.get();
  }
}

const spGenderApi = new SpGendersApi();
export default spGenderApi;
