/* eslint-disable @typescript-eslint/no-unused-vars */

import { UserModel, UserRaw } from '../users.model';

export const removeUserSensitiveData = (user: UserModel) => {
  const raw = user as unknown as UserRaw;
  const { password, createdAt, updatedAt, roles, ...userInfo } = raw;

  return userInfo;
};
