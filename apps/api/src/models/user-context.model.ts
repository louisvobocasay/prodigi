import { CoreEUsersGroups } from "@online-festival/core";

export interface UserContext {
  id: number;
  username: string;
  group: CoreEUsersGroups;
}
