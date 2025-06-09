import {create} from "zustand"

export const useThemeStore = create((set)=>({
    theme:localStorage.getItem("chat-theam") || "cupcake",
    setTheme:(theme) => {
        localStorage.setItem("chat-theme",theme);
        set({theme});
    }
}))