import { S3_ACCESS_KEY, S3_SECRET_KEY } from "$env/static/private";
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
  region: "eu-north-1",
});
