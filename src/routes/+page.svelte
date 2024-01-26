<script lang="ts">
    import { onMount } from "svelte";
    import mapboxgl from "mapbox-gl";
    import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
    import { type Locations, type Clubs } from "$lib/types/db";
    import type { PageData } from "./$types";
    import { PUBLIC_MAPBOX_TOKEN } from "$env/static/public";

    import "mapbox-gl/dist/mapbox-gl.css";
    import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
    import { distanceBetween } from "$lib/utils";
    import type { LngLatGeometry } from "$lib/types/geo";
    mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;

    export let data: PageData;
    const clubs = data.clubs;
    const locations: (Locations & { club: Clubs })[] = [];
    clubs
        .flatMap((club) => club.locations)
        .forEach((location) => {
            const club = clubs.find((club) => club.id === location.clubId);
            if (club) locations.push({ club, ...location });
        });
    const geoLocations: GeoJSON.FeatureCollection<
        LngLatGeometry,
        {
            id: number;
            title: string;
            clubName: string;
            clubDescription: string;
            logo: string;
            distance: number;
        }
    > = {
        type: "FeatureCollection",
        features: locations.map((location, i) => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: location.address
                    .split(", ")
                    .reverse()
                    .map((coord) => parseFloat(coord)) as [number, number],
            },
            properties: {
                id: i,
                title: location.name,
                clubName: location.club.name,
                clubDescription: location.club.description,
                logo: location.club.logo,
                distance: -1,
            },
        })),
    };

    onMount(() => {
        const map = new mapboxgl.Map({
            container: "map",
            maxBounds: [
                [7.734375, 54.527457],
                [12.996826, 57.856443],
            ],
            center: [11.943512, 55.478853],
            zoom: 7,
            minZoom: 7,
        });

        map.on("load", () => {
            map.addControl(new mapboxgl.NavigationControl());
            map.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: { enableHighAccuracy: true },
                    showUserHeading: true,
                }),
            );

            map.addSource("places", {
                type: "geojson",
                data: geoLocations,
            });
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: true,
                bbox: [7.734375, 54.527457, 12.996826, 57.856443],
                placeholder: "Søg efter adresse...",
            });

            buildLocationList(geoLocations);
            map.addControl(geocoder, "top-left");
            addMarkers();

            geocoder.on("result", (event) => {
                const searchResult = event.result.geometry;

                for (const location of geoLocations.features) {
                    location.properties.distance =
                        distanceBetween(searchResult, location.geometry) / 1000;
                }

                geoLocations.features.sort(
                    (a, b) => a.properties.distance - b.properties.distance,
                );

                const listings = document.getElementById("listings");
                while (listings?.firstChild) {
                    listings.removeChild(listings.firstChild);
                }
                buildLocationList(geoLocations);

                createPopUp(geoLocations.features[0]);

                const activeListing = document.getElementById(
                    `listing-${geoLocations.features[0].properties.id}`,
                );
                activeListing?.classList.add("active");

                const bbox = getBbox(geoLocations, 0, searchResult);
                map.fitBounds(bbox, {
                    padding: 100,
                });
            });
        });

        const getBbox = (
            sortedLocations: typeof geoLocations,
            locationId: number,
            searchResult: { coordinates: number[] },
        ): [number, number, number, number] => {
            const lats = [
                sortedLocations.features[locationId].geometry.coordinates[1],
                searchResult.coordinates[1],
            ];
            const lons = [
                sortedLocations.features[locationId].geometry.coordinates[0],
                searchResult.coordinates[0],
            ];
            const sortedLons = lons.sort((a, b) => {
                if (a > b) {
                    return 1;
                }
                if (a < b) {
                    return -1;
                }
                return 0;
            });
            const sortedLats = lats.sort((a, b) => {
                if (a > b) {
                    return 1;
                }
                if (a < b) {
                    return -1;
                }
                return 0;
            });
            return [sortedLons[0], sortedLats[0], sortedLons[1], sortedLats[1]];
        };

        const addMarkers = () => {
            for (const location of geoLocations.features) {
                const el = document.createElement("div");
                el.id = `marker-${location.properties.id}`;
                el.className = "marker rounded-full h-10 w-10";
                el.style.backgroundImage = `url(${location.properties.logo})`;
                el.style.backgroundSize = "100%";

                new mapboxgl.Marker(el)
                    .setLngLat(
                        location.geometry.coordinates as [number, number],
                    )
                    .addTo(map);

                el.addEventListener("click", (e) => {
                    flyToStore(location);
                    createPopUp(location);
                    const activeItem =
                        document.getElementsByClassName("active");
                    e.stopPropagation();
                    if (activeItem[0]) {
                        activeItem[0].classList.remove("active");
                    }
                    const listing = document.getElementById(
                        `listing-${location.properties.id}`,
                    );
                    listing?.classList.add("active");
                });
            }
        };

        const buildLocationList = (locationList: typeof geoLocations) => {
            for (const location of locationList.features) {
                const listings = document.getElementById("listings");
                if (!listings) break;

                const listing = listings.appendChild(
                    document.createElement("a"),
                );
                listing.id = `listing-${location.properties.id}`;
                listing.href = "#";
                const card = listing.appendChild(document.createElement("div"));
                card.className =
                    "mb-2 rounded-md border bg-card hover:bg-card-hover text-card-foreground shadow px-1";
                card.innerHTML = `<h2 class="text-lg font-medium">${location.properties.title}</h2>`;

                const details = card.appendChild(document.createElement("div"));
                details.innerHTML = `${location.properties.clubName}`;
                if (location.properties.distance !== -1) {
                    const roundedDistance =
                        Math.round(location.properties.distance * 100) / 100;
                    details.innerHTML += `<div><strong>${roundedDistance} kilometer væk</strong></div>`;
                }

                listing.addEventListener("click", function () {
                    for (const feature of locationList.features) {
                        if (this.id === `listing-${feature.properties.id}`) {
                            flyToStore(feature);
                            createPopUp(feature);
                        }
                    }
                    const activeItem =
                        document.getElementsByClassName("active");
                    if (activeItem[0]) {
                        activeItem[0].classList.remove("active");
                    }
                    this.classList?.add("active");
                });
            }
        };

        const flyToStore = (
            currentFeature: (typeof geoLocations)["features"][number],
        ) => {
            map.flyTo({
                center: currentFeature.geometry.coordinates,
                zoom: 15,
            });
        };

        const createPopUp = (
            currentFeature: (typeof geoLocations)["features"][number],
        ) => {
            const popUps = document.getElementsByClassName("mapboxgl-popup");
            if (popUps[0]) popUps[0].remove();

            new mapboxgl.Popup({
                offset: 25,
                closeButton: false,
                closeOnClick: false,
                className:
                    "[&>.mapboxgl-popup-content]:bg-popover text-foreground",
            })
                .setLngLat(currentFeature.geometry.coordinates)
                .setHTML(
                    `<h3 class="text-lg">${currentFeature.properties.title}</h3><h4>${currentFeature.properties.clubName}</h4><p>${currentFeature.properties.clubDescription}</p>`,
                )
                .addTo(map);
        };
    });
</script>

<div class="page-container not-prose max-w-none">
    <div
        class="absolute w-1/3 h-[calc(100%-3.5rem)] top-14 left-0 overflow-hidden border-r"
    >
        <h1 class="text-center leading-[4rem] text-2xl font-bold">
            Find en aktivitet tæt på dig
        </h1>
        <div id="listings" class="h-full p-2 pb-16 overflow-auto a-mt-2"></div>
    </div>
    <div
        id="map"
        class="absolute h-[calc(100%-3.5rem)] w-2/3 left-1/3 top-14 bottom-0"
    ></div>
</div>
