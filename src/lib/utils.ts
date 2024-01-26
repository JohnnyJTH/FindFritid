import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import type { Activities } from "./types/db";
import type { LngLatGeometry } from "./types/geo";
const { atan2, cos, sin, sqrt, PI } = Math;

export { localStorageStore } from "./localStorageStore";

export const distanceBetween = (a: LngLatGeometry, b: LngLatGeometry) => {
    const R = 6371e3; // earth radius in meters
    const φ1 = (a.coordinates[1] * PI) / 180; // φ, λ in radians
    const φ2 = (b.coordinates[1] * PI) / 180;
    const Δφ = ((b.coordinates[1] - a.coordinates[1]) * PI) / 180;
    const Δλ = ((b.coordinates[0] - a.coordinates[0]) * PI) / 180;

    const x =
        sin(Δφ / 2) * sin(Δφ / 2) +
        cos(φ1) * cos(φ2) * sin(Δλ / 2) * sin(Δλ / 2);
    const y = 2 * atan2(sqrt(x), sqrt(1 - x));

    return R * y; // meters
};

export const truncate = (text: string) =>
    text.length > 100 ? `${text.slice(0, 100)}...` : text;

export type Filter<T> = {
    [K in keyof T]: {
        fieldName: K;
        operator: "like" | "equal" | "notLike" | "notEqual";
        value: T[K];
    };
}[keyof T];

const TRANSLATIONS = {
    Both: "Begge",
    Outdoor: "Udenfor",
    Indoor: "Indenfor",
    Neutral: "Neutralt",
    Male: "Mandlig",
    Female: "Kvindelig",
};
export const translateOption = (str: Filter<Activities>["value"]) =>
    TRANSLATIONS[str as keyof typeof TRANSLATIONS] || str;

export const toTitleCase = (string: string) =>
    string.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
    );

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
    y?: number;
    x?: number;
    start?: number;
    duration?: number;
};

export const flyAndScale = (
    node: Element,
    params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 },
): TransitionConfig => {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;

    const scaleConversion = (
        valueA: number,
        scaleA: [number, number],
        scaleB: [number, number],
    ) => {
        const [minA, maxA] = scaleA;
        const [minB, maxB] = scaleB;

        const percentage = (valueA - minA) / (maxA - minA);
        const valueB = percentage * (maxB - minB) + minB;

        return valueB;
    };

    const styleToString = (
        style: Record<string, number | string | undefined>,
    ): string => {
        return Object.keys(style).reduce((str, key) => {
            if (style[key] === undefined) return str;
            return str + `${key}:${style[key]};`;
        }, "");
    };

    return {
        duration: params.duration ?? 200,
        delay: 0,
        css: (t) => {
            const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
            const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
            const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

            return styleToString({
                transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                opacity: t,
            });
        },
        easing: cubicOut,
    };
};
