import type { Activities } from "$lib/types/db";
import type { PrismaClient } from "@prisma/client";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            db: PrismaClient;
        }
        interface PageState {
            activity: Activities | null;
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export {};
