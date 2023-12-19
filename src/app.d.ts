import type { PrismaClient } from "@prisma/client";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: PrismaClient;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
