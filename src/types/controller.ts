import type { IRequest } from "./request";
import type { IResponse } from "./response";

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
