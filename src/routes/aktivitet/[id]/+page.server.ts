import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { db }, params }) => {
    const id = +params.id;
    if (isNaN(+id)) return error(404, "Aktiviteten findes ikke");

    const activity = await db.activities.findFirst({
        where: { id },
        include: { clubs: { include: { locations: true } } },
        // @ts-expect-error dont know why
        cacheStrategy: {
            ttl: 60 * 60 * 2,
            swr: 60 * 5,
        },
    });
    if (!activity) return error(404, "Aktiviteten findes ikke");
    return { activity };
};
