import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import axios from "axios"
import { toast } from "sonner";
import { LoginProps, SignupProps } from "@/schema/userSchema";
const API_END_POINT = "https://food-paradise-3zpn.onrender.com/api/v1/user";
axios.defaults.withCredentials = true;

type User = {
    fullname: string;
    email: string;
    contact: number;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
    admin: boolean;
    isVerified: boolean;
}

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: SignupProps) => Promise<void>;
    login: (input: LoginProps) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile?: (input: any) => Promise<void>;
}
export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,
    // api Implementaion
    signup: async (input: SignupProps) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/signup`, input, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true })
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unknown error occurred");
            }
            set({ loading: false });
        }
    },
    login: async (input: LoginProps) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("An unknown error occurred")
            }
            set({ loading: false })
        }
    },
    verifyEmail: async (verificationCode: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true});
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("An unknown error occurred")
            }
            set({ loading: false })
        }
    },
    checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axios.get(`${API_END_POINT}/check-auth`);
            if (response.data.success) {
                set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("An unknown error occurred")
            }
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },
    logout: async () => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/logout`);
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: null, isAuthenticated: false })
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("An unknown error occurred")
            }
            set({loading:false });
        }
    },
    forgotPassword: async (email: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
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
    resetPassword: async (token: string, newPassword: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
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
    updateProfile: async (input: any) => {
        try {
            const response = await axios.put(`${API_END_POINT}/profile/update`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ user: response.data.user });
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("An unknown error occurred")
            }
        }
    }
}),
    {
        name: 'user-name',
        storage: createJSONStorage(() => localStorage)
    }
))