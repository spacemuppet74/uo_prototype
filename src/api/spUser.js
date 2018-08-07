import { sp, PermissionKind } from "@pnp/sp";
import SpBaseApiConfig from "./spBaseConfig";

class SpUserApi extends SpBaseApiConfig {
  constructor() {
    super();
  }

  // Fetch some basic information about the user
  fetchCurrentUserDetails() {
    return this.web.currentUser.get();
  }

  // fetch a certain property of a user
  fetchUserProperty(user, property) {
    return sp.profiles.getUserProfilePropertyFor(user, property);
  }

  // fetch direct reports for a user
  fetchUserDirectReports(login) {
    return sp.profiles.getPropertiesFor(login).then(resp => resp.DirectReports);
  }

  // group properties into one Promise call
  fetchUserProperties(user, properties) {
    if (!Array.isArray(properties)) {
      throw new Error("you need to pass a array of properties");
    }

    const fetchProps = properties.map(property =>
      this.fetchUserProperty(user, property)
    );
    return Promise.all(fetchProps);
  }

  fetchIfUserStaff() {
    return this.web.lists
      .getByTitle("uo_orders")
      .currentUserHasPermissions(PermissionKind.AddListItems)
      .then(resp => resp);
  }

  fetchIfUserAdmin(email) {
    return this.web.siteGroups
      .getByName("uniform_orders_admin")
      .users.getByEmail(email)
      .get()
      .then(
        reps => {
          return true;
        },
        error => {
          return false;
        }
      );
  }
}

const spUserApi = new SpUserApi();
export default spUserApi;
