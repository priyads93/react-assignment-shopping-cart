import { UserResponse } from "../services/interface";

export const isUserDataValid = (
  user: Partial<UserResponse> | null
): user is UserResponse =>  Boolean(user?.id && user?.accountType);
