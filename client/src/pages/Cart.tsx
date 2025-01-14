import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import CheckoutConfirmPage from "./CheckoutConfirmPage"
import { useCartStore } from "@/store/useCartStore"
import { CartItem } from "@/types/cartTypes"

const Cart = () => {
    const [open, setOpen] = useState<boolean>(false)
    const {
        cart,
        decrementQuantity,
        incrementQuantity,
        removeFromTheCart,
        clearCart
    } = useCartStore();
    let totalAmount = cart.reduce((acc, ele) => {
        return acc + ele.price * ele.quantity;
    }, 0);
    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button onClick={clearCart} variant="link">Clear All</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Items</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cart?.map((item: CartItem) => (
                        <TableRow>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={item?.image} alt={item?.name} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell> {item?.name}</TableCell>
                            <TableCell> {item?.price}</TableCell>
                            <TableCell>
                                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                                    <Button
                                        onClick={() => decrementQuantity(item?._id)}
                                        size={"icon"}
                                        variant={"outline"}
                                        className="rounded-full bg-gray-200"
                                    >
                                        <Minus />
                                    </Button>
                                    <Button
                                        size={"icon"}
                                        className="font-bold border-none"
                                        disabled
                                        variant={"outline"}
                                    >
                                        {item?.quantity}
                                    </Button>
                                    <Button
                                        onClick={() => incrementQuantity(item?._id)}
                                        size={"icon"}
                                        className="rounded-full bg-orange hover:bg-hoverOrange"
                                        variant={"outline"}
                                    >
                                        <Plus />
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell>{item.price * item.quantity}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => removeFromTheCart(item?._id)} size={"sm"} className="bg-orange hover:bg-hoverOrange">
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="text-2xl font-bold">
                        {cart.length > 0 && (
                            <>
                                <TableCell colSpan={5}>Total</TableCell>
                                <TableCell className="text-right">₹{totalAmount}</TableCell>
                            </>
                        )}
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-end my-5">
                <Button
                    disabled={cart.length>0 ? false : true}
                    onClick={() => setOpen(true)}
                    className="bg-orange hover:bg-hoverOrange"
                >
                    Proceed To Checkout
                </Button>
            </div>
            <CheckoutConfirmPage open={open} setOpen={setOpen} />
        </div>
    )
}

export default Cart