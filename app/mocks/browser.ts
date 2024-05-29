import { setupServer } from "msw/native";
import { usersHandlers } from "./usersHandlers";
import { authHandlers } from "./authHandlers";
import { imagesHandlers } from "./imageHandlers";

export const server = setupServer(...usersHandlers, ...authHandlers, ...imagesHandlers);
