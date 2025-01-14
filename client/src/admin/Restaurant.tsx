import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RestaurantFormProps, restaurantFormSchema } from "@/schema/restaurantSchema"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const Restaurant = () => {
    const [input, setInput] = useState<RestaurantFormProps>({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined,
    });
    const [errors, setErrors] = useState<Partial<RestaurantFormProps>>({})
    const {
        loading,
        restaurant,
        createRestaurant,
        updateRestaurant,
        getRestaurant
    } = useRestaurantStore();


    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput(prevState => ({ ...prevState, [name]: type === 'number' ? Number(value) : value }))
    }
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = restaurantFormSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<RestaurantFormProps>)
            return;
        }
        try {
            const formData = new FormData();
            formData.append("restaurantName", input.restaurantName);
            formData.append("city", input.city);
            formData.append("country", input.country);
            formData.append("deliveryTime", input.deliveryTime.toString());
            formData.append("cuisines", JSON.stringify(input.cuisines));
            if (input.imageFile) {
                formData.append("imageFile", input.imageFile);
            }
            if (restaurant) {
                await updateRestaurant(formData);
            } else {
                await createRestaurant(formData);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : String(error))
        }
    }
    useEffect(() => {
        let isMounted = true; 
        const fetchRestaurant = async () => {
            await getRestaurant();
            if (isMounted && restaurant) {
                setInput({
                    restaurantName: restaurant.restaurantName || "",
                    city: restaurant.city || "",
                    country: restaurant.country || "",
                    deliveryTime: restaurant.deliveryTime || 0,
                    cuisines: restaurant.cuisines
                        ? restaurant.cuisines.map((cuisine: string) => cuisine)
                        : [],
                    imageFile: undefined,
                });
            };
        }
        fetchRestaurant();
        return ()=>{
            isMounted = false;
        }
    }, [])
    return (
        <div className="max-w-6xl mx-auto my-10">
            <div>
                <div>
                    <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
                    <form onSubmit={submitHandler}>
                        <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
                            <div>
                                <Label>Restaurant Name</Label>
                                <Input
                                    type="text"
                                    name="restaurantName"
                                    value={input.restaurantName}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your restaurant name"
                                />
                                {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.restaurantName}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label>City</Label>
                                <Input
                                    type="text"
                                    name="city"
                                    value={input.city}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your City name"
                                />
                                {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.city}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label>Country</Label>
                                <Input
                                    type="text"
                                    name="country"
                                    value={input.country}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your Country name"
                                />
                                {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.country}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label>Delivery Time</Label>
                                <Input
                                    type="number"
                                    name="deliveryTime"
                                    value={input.deliveryTime}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your delivery time"
                                />
                                {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.deliveryTime}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label>Cuisines</Label>
                                <Input
                                    type="text"
                                    name="cuisines"
                                    value={input.cuisines}
                                    onChange={(e) => setInput({ ...input, cuisines: e.target.value.split(",") })}
                                    placeholder="e.g. Momos, Biryani"
                                />
                                {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.cuisines}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label>Upload Restaurant Banner</Label>
                                <Input
                                    onChange={(e) =>
                                        setInput({
                                            ...input,
                                            imageFile: e.target.files?.[0] || undefined,
                                        })
                                    }
                                    type="file"
                                    accept="image/*"
                                    name="imageFile"

                                    placeholder="Enter your restaurant name"
                                />
                                {errors && (
                                    <span className="text-xs text-red-600 font-medium">
                                        {errors.imageFile?.name}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="my-5 w-fit">
                            {loading ? (
                                <Button disabled className="bg-orange hover:bg-hoverOrange">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button className="bg-orange hover:bg-hoverOrange">
                                    {restaurant
                                        ? "Update Your Restaurant"
                                        : "Add Your Restaurant"}
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Restaurant