import SpBaseApiConfig from "./spBaseConfig";
import spUserApi from "./spUser";

class SpOrdersApi extends SpBaseApiConfig {
  fields = [
    "Id",
    "Created",
    "customer/Title",
    "customer/Id",
    "approver/Title",
    "approver/Id",
    "status",
    "employeeID",
    "department",
    "location",
    "job_title",
    "arrow_order_number"
  ];

  orderFields = [
    "Id",
    "Title",
    "order_item_colour/Title",
    "order_item_size/Title",
    "order_item_name/Title",
    "order_item_name/code",
    "order_headerId"
  ];

  constructor() {
    super();
  }

  getOrderForUser(userId, numOfItems) {
    return this.web.lists
      .getByTitle("uo_orders")
      .items.select(this.fields.join(","))
      .filter(`customer/Id eq ${userId}`)
      .expand("customer", "approver")
      .orderBy("Created", false)
      .top(numOfItems)
      .getPaged();
  }

  getOrderDetails(orderId) {
    return this.web.lists
      .getByTitle("uo_orders_items")
      .items.select(this.orderFields.join(","))
      .filter(`order_header/Id eq ${orderId}`)
      .expand("order_item_colour", "order_item_size", "order_item_name")
      .get();
  }

  getOrdersForApproval(approver, status, itemsPerPage) {
    console.log("fetch orders that need to approval for ", approver, status);
    return this.web.lists
      .getByTitle("uo_orders")
      .items.select(this.fields.join(", "))
      .expand("approver", "customer")
      .filter(`status eq '${status}' and approver/Id eq ${approver.id}`)
      .top(itemsPerPage)
      .orderBy("Created", false)
      .getPaged();
  }

  getOrdersByStatus(status, itemsPerPage) {
    console.log("fetch orders by status", status);
    return this.web.lists
      .getByTitle("uo_orders")
      .items.select(this.fields.join(", "))
      .expand("approver", "customer")
      .filter(`status eq '${status}'`)
      .top(itemsPerPage)
      .orderBy("Created", false)
      .getPaged();
  }

  async postOrder(user, order) {
    console.log("posting order for ", user, order);
    try {
      const manager = await spUserApi.fetchUserByLogin(user.manager);

      const posted = await this.web.lists.getByTitle("uo_orders").items.add({
        customerId: user.id,
        employeeID: user.employeeId,
        department: user.department,
        location: user.location,
        job_title: user.jobtitle,

        approverId: manager.Id,
        status: "pending"
      });

      const details = await this.postOrderItems(posted.data.Id, order);
      return "order completed";
    } catch (error) {
      console.log("error adding order ", error);
    }
  }

  postOrderDetails(orderId, { uniformId, selectedSize, quantity, colourId }) {
    console.log("post order details ");
    return this.web.lists.getByTitle("uo_orders_items").items.add({
      order_headerId: orderId,
      order_item_colourId: colourId,
      order_item_nameId: uniformId,
      order_item_sizeId: selectedSize,
      Title: quantity.toString()
    });
  }

  postOrderItems(orderId, orders) {
    const batch = orders.map(order => this.postOrderDetails(orderId, order));
    return Promise.all(batch);
  }

  updateOrderApproval(orderId, status) {
    return this.web.lists
      .getByTitle("uo_orders")
      .items.getById(orderId)
      .update({ status: status });
  }

  updateOrderArrowNumber(orderId, arrowNum, status) {
    return this.web.lists
      .getByTitle("uo_orders")
      .items.getById(orderId)
      .update({ arrow_order_number: arrowNum, status: status });
  }
}

const spOrdersApi = new SpOrdersApi();
export default spOrdersApi;
