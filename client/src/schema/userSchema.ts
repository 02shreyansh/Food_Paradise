import {z} from "zod";
export const userSignUp=z.object({
    fullname:z.string().min(1,"Name is required"),
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"Password must be at least 6 characters").max(18,"Password must be at most 18 characters"),
    contact:z.string().min(10,"Contact must be 10 digits")
});
export type SignupProps=z.infer<typeof userSignUp>;

export const userLogin=z.object({
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"Password must be at least 6 characters").max(18,"Password must be at most 18 characters"),
});
export type LoginProps=z.infer<typeof userLogin>;

