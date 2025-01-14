import { CheckoutSessionRequest, OrderState } from "@/types/orderTypes";
import { create } from "zustand";
import axios from "axios"
import { persist, createJSONStorage } from "zustand/middleware"
import { toast } from "sonner";
const API_END_POINT: string = "https://food-paradise-ovjb.onrender.com/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(persist((set) => ({
    loading: false,
    orders: [],
    createCheckoutSession:async(checkoutSessionRequest:CheckoutSessionRequest)=>{
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutSessionRequest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.data.success){
                toast.success(response.data.message);
                window.location.href = response.data.session.url;
                set({ loading: false });
            }
        } catch (error) {
            set({ loading: false });
        }
    },
    getOrderDetails: async () => {
        try {
            set({loading:true});
            const response = await axios.get(`${API_END_POINT}/`);
            if(response.data.success){
                set({loading:false, orders:response.data.orders});
            }
        } catch (error) {
            set({loading:false});
        }
    }

}),
    {
        name: "order-name",
        storage: createJSONStorage(() => localStorage)
    }
))