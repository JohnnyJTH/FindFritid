<script lang="ts">
    import mapboxgl from "mapbox-gl";
    import { onMount } from "svelte";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import { translateOption } from "$lib/utils";
    import type { PageData } from "./$types";
    import { PUBLIC_MAPBOX_TOKEN } from "$env/static/public";

    import "mapbox-gl/dist/mapbox-gl.css";
    mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;

    export let data: PageData;
    const activity = data.activity;

    onMount(() => {
        if (!activity.clubs.length) return;
        const map = new mapboxgl.Map({
            container: "map",
            maxBounds: [
                [7.734375, 54.527457],
                [12.996826, 57.856443],
            ],
            center: [11.943512, 55.478853],
            zoom: 7,
            minZoom: 7
        });
        for (const club of activity.clubs) {
            for (const location of club.locations) {
                const el = document.createElement("div");
                el.className = "marker rounded-full";
                el.style.backgroundImage = `url(${club.logo})`;
                el.style.width = `40px`;
                el.style.height = `40px`;
                el.style.backgroundSize = "100%";

                const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, className: "[&>.mapboxgl-popup-content]:bg-popover text-foreground" }).setHTML(`<h3>${location.name}</h3><h4>${club.name}</h4><p>${club.description}</p>`);

                const latlng = location.address.split(", ").reverse();
                new mapboxgl.Marker(el).setLngLat(latlng).setPopup(popup).addTo(map);
            }
        }
    });
</script>

<div class="page-container mb-20 h-">
    <div class="header">
        <img style="view-transition-name: {activity.name.replaceAll(' ', '-')};" class="w-full" src={activity.cover} alt={activity.name} />
        <div class="relative pl-3 mt-[-6em]">
            <div class="flex space-x-2">
                {#each activity.keywords as keyword}
                    <Badge class="rounded-none">{keyword}</Badge>
                {/each}
            </div>
            <div class="flex items-center bg-card-hover px-[0.25em] !mt-3 w-[calc(100%-20px)]">
                {#if activity.logo}
                    <img class="m-0 w-12 h-12 rounded-full" src={activity.logo} alt={activity.name} />
                {/if}
                <h1 class="!m-0 !ml-2 py-[0.25em] !leading-[1.5em]">{activity.name}</h1>
            </div>
            <div class="meta flex not-prose">
                <p class="mr-1">af <span class="font-bold">{activity.union}</span></p>
                <p class="text-primary mr-1 before:mr-1 before:content-['·']">Miljø: {translateOption(activity.environment)}</p>
                <p class="text-primary mr-1 before:mr-1 before:content-['·']">Køn: {translateOption(activity.gender)}</p>
            </div>
        </div>
    </div>
    <div class="content pt-8 space-y-8">
        <p>
            {activity.description}
        </p>
        <div class="grid lg:grid-cols-2 gap-2">
            <Card>
                <CardHeader>
                    <CardTitle>Praktisk</CardTitle>
                    <CardDescription>Information omkring aktiviteten</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-8">
                        <div>
                            <h4>Udstyr</h4>
                            {#if activity.equipment.length === 0}
                                <p>Der er intet nødvendigt udstyr.</p>
                            {:else}
                                {#each activity.equipment as equipment}
                                    <p>{equipment}</p>
                                {/each}
                            {/if}
                        </div>
                        <div>
                            <h4>Sundhedsmæssige Fordele</h4>
                            {#if activity.health.length === 0}
                                <p>Der er ingen sundhedsmæssige fordele.</p>
                            {:else}
                                {#each activity.health as benefit}
                                    <p>{benefit}</p>
                                {/each}
                            {/if}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div id="map" class="h-[30rem] lg:h-[50rem] rounded-md" />
        </div>
    </div>
</div>
