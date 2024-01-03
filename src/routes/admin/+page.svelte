<script lang="ts">
    import { goto, pushState } from "$app/navigation";
    import { page } from "$app/stores";
    import { addToast } from "$lib/components/toaster";
    import { Button } from "$lib/components/ui/button";
    import { Card, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { authStore } from "$lib/stores";
    import { ActivitiesSchema, type Activities, type Users } from "$lib/types/db";
    import { onMount } from "svelte";
    import Tags from "./_components/Tags.svelte";
    import SelectEnum from "./_components/SelectEnum.svelte";
    import { Switch } from "$lib/components/ui/switch";
    import { Textarea } from "$lib/components/ui/textarea";
    import { ActivityPreview } from "$lib/components";

    onMount(async () => {
        if ($authStore.username != "" && $authStore.password != "") {
            username = $authStore.username;
            password = $authStore.password;
            await login();
            if ($page.url.searchParams.has("id")) {
                const id = $page.url.searchParams.get("id");
                if (id && !isNaN(+id)) {
                    const activity = userData?.activities.find((a) => a.id === +id);
                    if (activity) {
                        activityData = activity;
                        pushState(`/admin?id=${activity.id}`, { activity });
                    } else {
                        goto("/admin");
                    }
                }
            } else {
                goto("/admin");
            }
        } else if ($page.url.searchParams.has("id")) {
            goto("/admin");
        }
    });

    let userData: { user: Users; activities: Activities[] } | null = null;
    let activityData: Activities | null = null;

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
            authStore.set({ username, password });
            userData = await res.json();
        } else {
            addToast({ data: { title: "Fejl", description: "Forkert brugernavn eller kodeord", color: "bg-red-500" } });
            goto("/admin");
        }
    };
    const logout = () => {
        username = "";
        password = "";
        authStore.set({ username: "", password: "" });
        userData = null;
        goto("/admin");
    };

    const backActivity = () => {
        pushState("/admin", { activity: null });
        activityData = null;
    };
    const selectActivity = (activity: Activities) => {
        pushState(`/admin?id=${activity.id}`, { activity });
        activityData = activity;
    };
    const submitActivity = async () => {
        const validation = ActivitiesSchema.safeParse(activityData);
        if (!validation.success) {
            addToast({ data: { title: "Fejl", description: validation.error.issues.map((e) => e.message).join("\n"), color: "bg-red-500" } });
            return;
        }
        const res = await fetch("/api/activity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, activity: activityData }),
        });
        if (res.ok) {
            addToast({ data: { title: "Succes", description: "Aktiviteten blev opdateret", color: "bg-green-500" } });
        } else {
            addToast({ data: { title: "Fejl", description: "Aktiviteten blev ikke opdateret", color: "bg-red-500" } });
        }
    };

    let coverFiles: FileList | null = null;
    let logoFiles: FileList | null = null;
    let uploading = false;
    const uploadImage = async (file: File, type: "cover" | "logo") => {
        if (uploading || !activityData) return;

        uploading = true;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", activityData.name);
        formData.append("type", type);
        formData.append("activityId", activityData.id.toString());
        const res = await fetch("/api/activity/image", {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const data = await res.json();
            if (type === "logo") activityData.logo = data.url;
            else activityData.cover = data.url;
        } else {
            addToast({ data: { title: "Fejl", description: "Billedet blev ikke uploadet", color: "bg-red-500" } });
        }
        uploading = false;
    };
</script>

<div class="page-container py-10">
    {#if activityData}
        <div class="flex justify-between items-center">
            <h1 class="mb-0">{activityData.name}</h1>
            <Button on:click={backActivity} variant="outline">Tilbage til aktiviteter</Button>
        </div>
        <p class="!mt-0">Her kan du ændre {activityData.name} detaljer.</p>
        <div class="space-y-6">
            <div class="space-y-2 not-prose">
                <div class="flex items-center space-x-4">
                    <Label>Forhåndsvisning</Label>
                    <Button variant="outline" href={`/aktivitet/${activityData.id}`}>Åben aktivitet</Button>
                </div>
                <div class="w-full sm:w-1/2 xl:w-1/4">
                    <ActivityPreview activity={activityData} />
                </div>
            </div>
            <div class="space-y-2">
                <Label for="cover">Billede</Label>
                <input bind:files={coverFiles} type="file" accept=".png, .jpg, .jpeg" id="cover" class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                <p class="text-sm text-muted-foreground">Billedet vil hovedsageligt blive vist i 3/2 aspect ratio.</p>

                <Button
                    on:click={() => {
                        if (coverFiles) uploadImage(coverFiles[0], "cover");
                    }}
                    disabled={!coverFiles || uploading}>Upload</Button
                >
            </div>
            <div class="space-y-2">
                <Label for="logo">Logo</Label>
                <input bind:files={logoFiles} type="file" accept=".png, .jpg, .jpeg" id="logo" class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                <p class="text-sm text-muted-foreground">Logoet vil hovedsageligt blive vist i en lille cirkel.</p>

                <Button
                    on:click={() => {
                        if (logoFiles) uploadImage(logoFiles[0], "logo");
                    }}
                    disabled={!logoFiles || uploading}>Upload</Button
                >
            </div>
            <div class="space-y-2">
                <Label for="description">Beskrivelse</Label>
                <Textarea bind:value={activityData.description} id="description" />
            </div>
            <div class="space-y-2">
                <Label for="union">Union</Label>
                <Input bind:value={activityData.union} id="union" />
            </div>
            <div class="space-y-2">
                <Label for="keywords">Nøgleord</Label>
                <Tags bind:activity={activityData} id="keywords" />
                <p class="text-sm text-muted-foreground">Tryk enter efter hvert nøgleord.</p>
            </div>
            <div class="space-y-2">
                <Label for="sport">Sport</Label>
                <Switch bind:checked={activityData.sport} class="block" id="sport" />
            </div>
            <div class="space-y-2">
                <Label for="movement">Bevægelse</Label>
                <Switch bind:checked={activityData.movement} class="block" id="movement" />
            </div>
            <div class="space-y-2">
                <Label for="environment">Miljø</Label>
                <SelectEnum bind:acticityProperty={activityData.environment} options={["Both", "Outdoor", "Indoor"]} />
                <p class="text-sm text-muted-foreground">Om aktiviteten hovedsageligt bliver afhold i et miljø.</p>
            </div>
            <div class="space-y-2">
                <Label for="gender">Køn</Label>
                <SelectEnum bind:acticityProperty={activityData.gender} options={["Neutral", "Male", "Female"]} />
                <p class="text-sm text-muted-foreground">Om aktiviteten er mere rettet mod et køn.</p>
            </div>
            <Button on:click={submitActivity}>Gem</Button>
        </div>
    {:else if userData}
        <div class="flex justify-between items-center">
            <h1 class="mb-0">Velkommen {userData.user.name}</h1>
            <Button on:click={logout} variant="destructive">Log ud</Button>
        </div>
        <p class="!mt-0">Vælg venligst en aktivitet at administrere.</p>
        <div class="space-y-2">
            {#each userData.activities as activity}
                <Card on:click={() => selectActivity(activity)} class="cursor-pointer">
                    <CardHeader>
                        <CardTitle class="mt-0">{activity.name}</CardTitle>
                        <CardDescription>{activity.id}</CardDescription>
                    </CardHeader>
                </Card>
            {/each}
        </div>
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
