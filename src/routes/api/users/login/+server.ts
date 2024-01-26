import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { db } }) => {
  const body = await request.json();
  if (!body) {
    return new Response("No body", { status: 400 });
  }
  if (!body.username || !body.password) {
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
  const activities = await db.activities.findMany({
    where: {
      id: { in: user.activities },
    },
  });
  return json({
    user,
    activities,
  });
};
