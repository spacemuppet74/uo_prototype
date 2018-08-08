import SpBaseApiConfig from "./spBaseConfig";

class SpStatusApi extends SpBaseApiConfig {
  constructor() {
    super();
  }

  fetchStatus() {
    return this.web.lists.getByTitle("uo_order_status").items.get();
  }
}

const spStatusApi = new SpStatusApi();
export default spStatusApi;
