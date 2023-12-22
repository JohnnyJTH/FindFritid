<script lang="ts">
    import { addToast } from "$lib/components/toaster";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import type { Activities, Users } from "$lib/types/db";

    let userData: { user: Users; activities: Activities[] } | null = null;

    let username = "";
    let password = "";
    const login = async () => {
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        if (res.ok) {
            userData = await res.json();
        } else {
            addToast({ data: { title: "Fejl", description: "Forkert brugernavn eller kodeord", color: "bg-red-500" } });
        }
    };

    let activityData: Activities | null = null;
</script>

<div class="page-container">
    {#if activityData}
        ...
    {:else if userData}
        <h1>Velkommen {userData.user.name}</h1>
        <p>Vælg venligst en aktivitet at administrere.</p>
        {#each userData.activities as activity}
            <div>{activity.name}</div>
        {/each}
    {:else}
        <div class="space-y-6">
            <div class="space-y-2">
                <Label for="username">Brugernavn</Label>
                <Input bind:value={username} id="username" />
            </div>
            <div class="space-y-2">
                <Label for="password">Kodeord</Label>
                <Input bind:value={password} id="password" type="password" />
            </div>
            <Button on:click={login} disabled={!username || !password}>Log ind</Button>
        </div>
    {/if}
</div>
