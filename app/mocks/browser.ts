import { setupServer } from "msw/native";
import { usersHandlers } from "./usersHandlers";
import { authHandlers } from "./authHandlers";

export const server = setupServer(...usersHandlers, ...authHandlers);
