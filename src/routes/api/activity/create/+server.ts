import { ActivitiesSchema, type Activities } from "$lib/types/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, locals: { db } }) => {
    const body = (await request.json()) as {
        username: string;
        password: string;
        activity: Omit<Activities, "id">;
    };
    if (!body) {
        return new Response("No body", { status: 400 });
    }
    if (!body.username || !body.password || !body.activity) {
        return new Response("Invalid body", { status: 400 });
    }
    const user = await db.users.findFirst({
        where: {
            username: body.username,
            password: body.password,
        },
    });
    if (!user || !user.permissions.includes("Admin")) {
        return new Response("Invalid credentials", { status: 401 });
    }
    if (!ActivitiesSchema.omit({ id: true }).safeParse(body.activity).success) {
        return new Response("Invalid activity", { status: 400 });
    }

    const activity = await db.activities.create({
        data: body.activity,
    });
    await db.users.update({
        where: {
            id: user.id,
        },
        data: {
            activities: {
                push: [activity.id],
            },
        },
    });

    return json({
        id: activity.id,
    });
};
