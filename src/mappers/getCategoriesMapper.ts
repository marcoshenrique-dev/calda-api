import type { ICategory } from "../types";

export function getCategoriesMapper(data: Record<string, any>[]): ICategory[] {
  const categories = data.map((item) => {
    return {
      name: item.name,
      slug: item.slug,
    };
  });
  return categories;
}
