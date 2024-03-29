<script lang="ts">
    import { goto } from "$app/navigation";
    import { addToast } from "$lib/components/toaster";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { authStore } from "$lib/stores";
    import {
        ActivitiesSchema,
        type Activities,
        type Users,
    } from "$lib/types/db";
    import { onMount } from "svelte";
    import Tags from "../_components/Tags.svelte";
    import SelectEnum from "../_components/SelectEnum.svelte";
    import { Switch } from "$lib/components/ui/switch";
    import { Textarea } from "$lib/components/ui/textarea";
    import { ActivityPreview } from "$lib/components";

    onMount(async () => {
        if ($authStore.username != "" && $authStore.password != "") {
            username = $authStore.username;
            password = $authStore.password;
            await login();
        }
    });

    let userData: { user: Users; activities: Activities[] } | null = null;
    let activityData: Omit<Activities, "id"> = {
        name: "",
        description: "",
        union: null,
        keywords: [],
        sport: false,
        movement: false,
        environment: "Both",
        gender: "Neutral",
        equipment: [],
        health: [],
        logo: "",
        cover: "",
    };

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
            if (!userData?.user.permissions.includes("Admin")) {
                addToast({
                    data: {
                        title: "Fejl",
                        description: "Du har ikke adgang til denne side",
                        color: "bg-red-500",
                    },
                });
                goto("/admin");
            }
        } else {
            addToast({
                data: {
                    title: "Fejl",
                    description: "Forkert brugernavn eller kodeord",
                    color: "bg-red-500",
                },
            });
            goto("/admin/opret");
        }
    };

    const createActivity = async () => {
        const validation = ActivitiesSchema.omit({ id: true }).safeParse(
            activityData,
        );
        if (!validation.success) {
            console.log(validation.error);
            addToast({
                data: {
                    title: "Fejl",
                    description: validation.error.issues
                        .map((e) => e.message)
                        .join("\n"),
                    color: "bg-red-500",
                },
            });
            return;
        }

        const res = await fetch("/api/activity/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                activity: activityData,
            }),
        });
        if (res.ok) {
            addToast({
                data: {
                    title: "Succes",
                    description: "Aktiviteten blev oprettet",
                    color: "bg-green-500",
                },
            });
            const data = await res.json();
            goto(`/admin?id=${data.id}`);
        } else {
            console.log(res.statusText, res.status);
            addToast({
                data: {
                    title: "Fejl",
                    description: "Aktiviteten blev ikke oprettet",
                    color: "bg-red-500",
                },
            });
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
        const res = await fetch("/api/activity/image", {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const data = await res.json();
            if (type === "logo") activityData.logo = data.url;
            else activityData.cover = data.url;
        } else {
            addToast({
                data: {
                    title: "Fejl",
                    description: "Billedet blev ikke uploadet",
                    color: "bg-red-500",
                },
            });
        }
        uploading = false;
    };
</script>

<div class="py-10 page-container">
    {#if userData}
        <div class="flex items-center justify-between">
            <h1 class="mb-0">Opret aktivitet</h1>
            <Button href="/admin" variant="outline" class="no-underline"
                >Tilbage til aktiviteter</Button
            >
        </div>
        <p class="!mt-0">Her kan du oprette en aktivitet.</p>
        <div class="space-y-6">
            <div class="space-y-2">
                <Label for="union">Navn</Label>
                <Input bind:value={activityData.name} id="name" />
            </div>
            {#if activityData.name !== ""}
                <div class="space-y-2 not-prose">
                    <Label>Forhåndsvisning</Label>
                    <div class="w-full sm:w-1/2 xl:w-1/4">
                        <ActivityPreview activity={activityData} />
                    </div>
                </div>
                <div class="space-y-2">
                    <Label for="cover">Billede</Label>
                    <input
                        bind:files={coverFiles}
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        id="cover"
                        class="flex w-full px-3 py-1 text-sm transition-colors border rounded-md shadow-sm h-9 border-input bg-background file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p class="text-sm text-muted-foreground">
                        Billedet vil hovedsageligt blive vist i 3/2 aspect
                        ratio.
                    </p>

                    <Button
                        on:click={() => {
                            if (coverFiles) uploadImage(coverFiles[0], "cover");
                        }}
                        disabled={!coverFiles || uploading}>Upload</Button
                    >
                </div>
                <div class="space-y-2">
                    <Label for="logo">Logo</Label>
                    <input
                        bind:files={logoFiles}
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        id="logo"
                        class="flex w-full px-3 py-1 text-sm transition-colors border rounded-md shadow-sm h-9 border-input bg-background file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p class="text-sm text-muted-foreground">
                        Logoet vil hovedsageligt blive vist i en lille cirkel.
                    </p>

                    <Button
                        on:click={() => {
                            if (logoFiles) uploadImage(logoFiles[0], "logo");
                        }}
                        disabled={!logoFiles || uploading}>Upload</Button
                    >
                </div>
                <div class="space-y-2">
                    <Label for="description">Beskrivelse</Label>
                    <Textarea
                        bind:value={activityData.description}
                        id="description"
                    />
                </div>
                <div class="space-y-2">
                    <Label for="union">Union</Label>
                    <Input bind:value={activityData.union} id="union" />
                </div>
                <div class="space-y-2">
                    <Label for="keywords">Nøgleord</Label>
                    <Tags bind:activity={activityData} id="keywords" />
                    <p class="text-sm text-muted-foreground">
                        Tryk enter efter hvert nøgleord.
                    </p>
                </div>
                <div class="space-y-2">
                    <Label for="sport">Sport</Label>
                    <Switch
                        bind:checked={activityData.sport}
                        class="block"
                        id="sport"
                    />
                </div>
                <div class="space-y-2">
                    <Label for="movement">Bevægelse</Label>
                    <Switch
                        bind:checked={activityData.movement}
                        class="block"
                        id="movement"
                    />
                </div>
                <div class="space-y-2">
                    <Label for="environment">Miljø</Label>
                    <SelectEnum
                        bind:activityProperty={activityData.environment}
                        options={["Both", "Outdoor", "Indoor"]}
                    />
                    <p class="text-sm text-muted-foreground">
                        Om aktiviteten hovedsageligt bliver afhold i et miljø.
                    </p>
                </div>
                <div class="space-y-2">
                    <Label for="gender">Køn</Label>
                    <SelectEnum
                        bind:activityProperty={activityData.gender}
                        options={["Neutral", "Male", "Female"]}
                    />
                    <p class="text-sm text-muted-foreground">
                        Om aktiviteten er mere rettet mod et køn.
                    </p>
                </div>
                <Button on:click={createActivity}>Opret</Button>
            {/if}
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
            <Button on:click={login} disabled={!username || !password}
                >Log ind</Button
            >
        </div>
    {/if}
</div>
