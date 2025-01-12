import { GetCategoriesController } from "../../controllers/categories/getCategories";

export function makeGetCategoriesController() {
  return new GetCategoriesController();
}
