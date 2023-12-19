<script lang="ts">
    import type { Users } from "$lib/types/db";

    let username = "";
    let password = "";

    let user: Users | null = null;

    const login = async () => {
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            user = await res.json();
        } else {
            alert("Forkert brugernavn eller kodeord");
        }
    };
</script>

<input bind:value={username} type="text" name="Brugernavn" />
<input bind:value={password} type="password" name="Kodeord" />
<button on:click={login}>Login</button>

{#if user}
    <h1>Velkommen {user.name}</h1>
{/if}
