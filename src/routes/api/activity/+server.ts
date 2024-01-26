import { ActivitiesSchema, type Activities } from "$lib/types/db";
import { type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { db } }) => {
  const body = (await request.json()) as {
    username: string;
    password: string;
    activity: Activities;
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
  if (!user) {
    return new Response("Invalid credentials", { status: 401 });
  }
  if (!ActivitiesSchema.safeParse(body.activity).success) {
    return new Response("Invalid activity", { status: 400 });
  }

  await db.activities.update({
    where: {
      id: body.activity.id,
    },
    data: body.activity,
  });

  return new Response("OK");
};
