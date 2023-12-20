import { message, superValidate } from "sveltekit-superforms/client";
import { loginSchema } from "./types";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        form: superValidate(loginSchema)
    }
};

export const actions: Actions = {
    login: async (event) => {
        const form = await superValidate(event, loginSchema);
        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: form.data.username, password: form.data.password }),
        });

        if (res.ok) {
            user = await res.json();
        } else {
            return message(form, "Forkert brugernavn eller kodeord");
        }

        return {
            form
        };
    }
};