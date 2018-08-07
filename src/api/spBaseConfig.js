import { Web } from "@pnp/sp";

export default class SpBaseApiConfig {
  constructor() {
    this.web = new Web("http://sptest-intranet/apps");
  }
}
