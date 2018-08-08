import { sp } from "@pnp/sp";
import SpBaseApiConfig from "./spBaseApiConfig";

class SpAdminApi extends SpBaseApiConfig {
  status = ["pending", "approved", "declined", "ordered"];
  constructor() {
    super();
  }

  fetchNumberOfOrdersByStatus(status) {
    return this.web.lists
      .getByTitle("uo_orders")
      .items.select("ID")
      .filter(`status eq '${status}'`)
      .getAll()
      .then(resp => resp.length);
  }

  fetchStatsForOrders() {
    console.log("api fetch");
    const batch = this.status.map(status =>
      this.fetchNumberOfOrdersByStatus(status)
    );
    console.log("batch ", status);

    return Promise.all(batch);
  }
}

const spAdminApi = new SpAdminApi();
export default spAdminApi;
