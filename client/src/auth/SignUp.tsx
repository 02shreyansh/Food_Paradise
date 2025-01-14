import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { SignupProps, userSignUp } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import {
    Loader2,
    LockKeyhole,
    LucidePhone,
    Mail,
    User,
    Utensils,
    ChefHat,
    Eye,
    EyeOff
} from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
    const { signup, loading } = useUserStore();
    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState<SignupProps>({
        fullname: "",
        email: "",
        password: "",
        contact: "",
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Partial<SignupProps>>({})

    const togglePassword = () => setShowPassword(!showPassword);

    const changeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        const result = userSignUp.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<SignupProps>);
            return;
        }
        try {
            await signup(input);
            navigate("/verify-email");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : String(error))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-8">
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="flex justify-center items-center gap-4 mb-4">
                                <div className="bg-orange/20 p-3 rounded-xl rotate-6">
                                    <Utensils className="w-8 h-8 text-orange" />
                                </div>
                                <div className="bg-orange/20 p-3 rounded-xl -rotate-6">
                                    <ChefHat className="w-8 h-8 text-orange" />
                                </div>
                            </div>
                            <h1 className="font-bold text-2xl text-white">Food Paradise</h1>
                            <p className="text-gray-400 mt-2">Join our culinary community</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    name="fullname"
                                    title="Enter Full Name"
                                    className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                    value={input.fullname}
                                    onChange={changeEvent}
                                />
                                <User className="absolute inset-y-3 left-3 text-gray-500" />
                                {errors.fullname && (
                                    <span className="text-sm text-red-400 mt-1 block">{errors.fullname}</span>
                                )}
                            </div>

                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    name="email"
                                    title="Email"
                                    className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                    value={input.email}
                                    onChange={changeEvent}
                                />
                                <Mail className="absolute inset-y-3 left-3 text-gray-500" />
                                {errors.email && (
                                    <span className="text-sm text-red-400 mt-1 block">{errors.email}</span>
                                )}
                            </div>

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Your Password"
                                    name="password"
                                    title="Password"
                                    className="pl-10 pr-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                    value={input.password}
                                    onChange={changeEvent}
                                />
                                <LockKeyhole className="absolute inset-y-3 left-3 text-gray-500" />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="absolute inset-y-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                                {errors.password && (
                                    <span className="text-sm text-red-400 mt-1 block">{errors.password}</span>
                                )}
                            </div>

                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Enter Your Contact"
                                    name="contact"
                                    title="Contact"
                                    className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                    value={input.contact}
                                    onChange={changeEvent}
                                />
                                <LucidePhone className="absolute inset-y-3 left-3 text-gray-500" />
                                {errors.contact && (
                                    <span className="text-sm text-red-400 mt-1 block">{errors.contact}</span>
                                )}
                            </div>
                        </div>

                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-orange to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white transition-all duration-300 transform hover:scale-[1.02] font-semibold"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please Wait
                                </>
                            ) : "Sign Up"}
                        </Button>

                        <div className="space-y-4">
                            <Separator className="bg-gray-800" />
                            <p className="text-center text-gray-400">
                                Already have an account?{" "}
                                <Link to="/login" className="text-orange hover:text-orange-400 font-semibold">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Right Side - Decorative */}
                <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-orange to-orange-600 p-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-6 gap-4">
                            {[...Array(24)].map((_, i) => (
                                <Utensils
                                    key={i}
                                    className={`w-full h-full transform rotate-45 transition-transform duration-700
                                        ${i % 2 === 0 ? 'animate-pulse' : 'animate-fade-in'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="relative h-full flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Discover Amazing Flavors
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Join our community of food lovers and explore delicious recipes
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                {["Best Recipes", "Top Restaurants", "Food Community"].map((feature) => (
                                    <div
                                        key={feature}
                                        className="bg-white/10 px-6 py-2 rounded-full text-white text-sm
                                            transition-all duration-300 hover:bg-white/20 backdrop-blur-sm"
                                    >
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp