import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { toast } from "sonner";
import { useMenuStore } from "@/store/useMenuStore";

const EditMenu = ({
    selectedMenu,
    editOpen,
    setEditOpen
}: {
    selectedMenu: MenuFormSchema ;
    editOpen: boolean;
    setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const [input, setInput] = useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        image: undefined,
    });
    const {loading,editMenu}=useMenuStore();
    const [error, setError] = useState<Partial<MenuFormSchema>>({})
    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        const result = menuSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<MenuFormSchema>);
            return;
        }
        try {
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("description", input.description);
            formData.append("price", input.price.toString());
            if (input.image) {
                formData.append("image", input.image);
            }
            await editMenu(selectedMenu._id!, formData);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : String(error))
        }
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === "number" ? Number(value) : value });
    }
    useEffect(() => {
        setInput({
            name: selectedMenu?.name || "",
            description: selectedMenu?.description || "",
            price: selectedMenu?.price || 0,
            image: undefined,
        });
        return () => {
            setInput({
                name: "",
                description: "",
                price: 0,
                image: undefined,
            })
        }
    }, [selectedMenu])
    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Menu</DialogTitle>
                    <DialogDescription>
                        Update your menu to keep your offerings fresh and exciting!
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeHandler}
                            placeholder="Enter menu name"
                        />
                        {error && (
                            <span className="text-xs font-medium text-red-600">
                                {error.name}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeHandler}
                            placeholder="Enter menu Description"
                        />
                        {error && (
                            <span className="text-xs font-medium text-red-600">
                                {error.description}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>Price in (Rupees)</Label>
                        <Input
                            type="number"
                            name="price"
                            value={input.price}
                            onChange={changeHandler}
                            placeholder="Enter menu price"
                        />
                        {error && (
                            <span className="text-xs font-medium text-red-600">
                                {error.price}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>Upload Menu Image</Label>
                        <Input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) =>
                                setInput({
                                    ...input,
                                    image: e.target.files?.[0] || undefined,
                                })
                            }
                            placeholder="Enter menu Image"
                        />
                        {error && (
                            <span className="text-xs font-medium text-red-600">
                                {error.image?.name}
                            </span>
                        )}
                    </div>
                    <DialogFooter className="mt-5">
                        {loading ? (
                            <Button disabled className="bg-orange hover:bg-hoverOrange">
                                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button className="bg-orange hover:bg-hoverOrange">
                                Submit
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditMenu