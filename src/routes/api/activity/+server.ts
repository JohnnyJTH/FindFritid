import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
    const body = await request.json();
    if (!body) {
        return new Response("No body", { status: 400 });
    }
    if (!body.username || !body.password || !body.activityId) {
        return new Response("Invalid body", { status: 400 });
    }
    return new Response();
};