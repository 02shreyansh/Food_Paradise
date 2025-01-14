import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, LocateIcon, Mail, MapPin, MapPinHouse, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FormEvent, useRef, useState } from "react"
import { AvatarImageProps } from "@radix-ui/react-avatar"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/useUserStore"
type ProfileDataState = {
    fullname: string;
    email: string;
    address: string;
    city: string;
    country: string;
    profilePicture: AvatarImageProps | string;
}
const Profile = () => {
    const { user, updateProfile } = useUserStore();
    const [profileData, setProfileData] = useState<ProfileDataState>({
        fullname: user?.fullname || "",
        email: user?.email || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || "",
        profilePicture: typeof user?.profilePicture === 'string' ? user.profilePicture : "",
    })
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedProfilePicture, setSelectedProfilePicture] =
        useState<string>(typeof profileData.profilePicture === 'string' ? profileData.profilePicture : "");
    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setSelectedProfilePicture(result)
                setProfileData((prevData) => ({
                    ...prevData,
                    profilePicture: result
                }))
            }
            reader.readAsDataURL(file)
        }
    };
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value })
    };
    const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (updateProfile) {
                await updateProfile(profileData);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }
    return (
        <form className="max-w-7xl mx-auto my-5" onSubmit={updateProfileHandler}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
                        <AvatarImage src={selectedProfilePicture} />
                        <AvatarFallback>CN</AvatarFallback>
                        <input
                            ref={imageRef}
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={fileChangeHandler}
                        />
                        <div
                            onClick={() => imageRef.current?.click()}
                            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
                        >
                            <Plus className="text-white w-8 h-8" />
                        </div>
                    </Avatar>
                    <Input
                        type="text"
                        name="fullname"
                        value={profileData?.fullname}
                        onChange={changeHandler}
                        className="font-bold text-2xl lg:text-2xl outline-none border-none focus-visible:ring-transparent"
                    />
                </div>
            </div>
            <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <Mail className="text-gray-500" />
                    <div className="w-full">
                        <Label>Email</Label>
                        <input
                            disabled
                            name="email"
                            value={profileData.email}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <LocateIcon className="text-gray-500" />
                    <div className="w-full">
                        <Label>Address</Label>
                        <input
                            name="address"
                            value={profileData.address}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <MapPin className="text-gray-500" />
                    <div className="w-full">
                        <Label>City</Label>
                        <input
                            name="city"
                            value={profileData.city}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <MapPinHouse className="text-gray-500" />
                    <div className="w-full">
                        <Label>Country</Label>
                        <input
                            name="country"
                            value={profileData.country}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
            </div>
            <div className="text-center">
                {isLoading ? (
                    <Button disabled className="bg-orange hover:bg-hoverOrange">
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="bg-orange hover:bg-hoverOrange">Update</Button>
                )}
            </div>
        </form>
    )
}

export default Profile