import { z } from "zod";

export const restaurantFormSchema = z.object({
    restaurantName: z.string().nonempty({message:"Restaurant Name is Required"}),
    city: z.string().nonempty({message:"City is Required"}),
    country: z.string().nonempty({message:"Country is Required"}),
    deliveryTime: z.number().min(0,{message:"Delivery Time cannot be negative"}),
    cuisines: z.array(z.string()),
    imageFile: z.instanceof(File).optional().refine((file)=>file?.size !== 0 ,{message:"Image File is Required"}),
});
export type RestaurantFormProps = z.infer<typeof restaurantFormSchema>;