import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { useRestaurantStore } from "./useRestaurantStore";
const API_END_POINT = "https://food-paradise-3zpn.onrender.com/api/v1/menu"
axios.defaults.withCredentials = true;
type MenuState = {
    loading: boolean,
    menu: null,
    createMenu: (formData: FormData) => Promise<void>;
    editMenu: (menuId: string, formData: FormData) => Promise<void>;
}
export const useMenuStore = create<MenuState>()(persist((set) => ({
    loading: false,
    menu: null,
    createMenu: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu })
            }
            useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("An unknown error occurred")
            }
            set({ loading: false });
        }
    },
    editMenu: async (menuId: string, formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("An unknown error occurred")
            }
            set({ loading: false });
        }
    }
}),
    {
        name: 'menu-name',
        storage: createJSONStorage(() => localStorage)
    }
))
