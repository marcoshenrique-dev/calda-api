import type { ICook } from "../types";

export function getCooksMapper(data: Record<string, any>[]): ICook[] {
  const cooks = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      instagram: item?.instagram || null,
      website: item?.website || null,
      photoUrl: item?.photoUrl || null,
    };
  });
  return cooks;
}
