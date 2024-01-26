import { s3 } from "$lib/server/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { db } }) => {
    const body = await request.formData();
    if (!body) return new Response("No body", { status: 400 });
    const file = body.get("file") as File | null;
    const name = body.get("name") as string | null;
    const type = body.get("type") as "cover" | "logo" | null;
    const rawActivityId = body.get("activityId") as string | null;
    const activityId = rawActivityId ? parseInt(rawActivityId) : null;
    if (!file || !name || !type)
        return new Response("Invalid body", { status: 400 });

    const image = await file.arrayBuffer();
    const fileName = `${encodeURIComponent(`${name} ${type}`)}${file.name.slice(file.name.lastIndexOf("."))}`;
    await s3.send(
        new PutObjectCommand({
            Bucket: "findfritid",
            Key: fileName,
            Body: image,
            ContentType: file.type,
        }),
    );

    if (!activityId)
        return json({
            url: `https://findfritid.s3.eu-north-1.amazonaws.com/${encodeURIComponent(fileName)}`,
        });

    const activity = await db.activities.update({
        where: { id: activityId },
        data: {
            [type]: `https://findfritid.s3.eu-north-1.amazonaws.com/${encodeURIComponent(fileName)}`,
        },
    });
    return json({
        url: activity.cover,
    });
};
