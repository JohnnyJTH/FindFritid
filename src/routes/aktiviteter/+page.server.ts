import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { db } }) => {
  const activities = await db.activities.findMany({
    // @ts-expect-error dont know why
    cacheStrategy: {
      ttl: 60 * 60 * 2,
      swr: 60 * 5,
    },
  });
  return { activities };
};
