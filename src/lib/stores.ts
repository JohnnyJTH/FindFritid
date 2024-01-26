import { localStorageStore } from "./localStorageStore";

export const authStore = localStorageStore("user", {
    username: "",
    password: "",
});
