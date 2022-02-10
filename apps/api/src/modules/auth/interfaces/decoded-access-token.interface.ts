import { CoreEUsersGroups } from '@online-festival/core';

export interface DecodedAccessTokenInterface {
  iat: number;
  exp: number;
  username: string;
  group: CoreEUsersGroups;
  id: number;
}