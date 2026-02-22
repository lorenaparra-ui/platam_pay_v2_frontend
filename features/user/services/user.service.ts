import { userClient } from "@/infrastructure/api/user-client";
import type { User } from "@/features/user/interfaces/user";

export const userService = {
  getById: (id: string) => userClient.get<User>(`/${id}`),
};
