import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RightPanel from "@/layout/RightPanel"
import { LoginProps, userLogin } from "@/schema/userSchema"
import { useUserStore } from "@/store/useUserStore"
import { Loader2, LockKeyhole, Mail, Utensils, Flame, Eye, EyeOff } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = () => {
    const { loading, login } = useUserStore()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [input, setInput] = useState<LoginProps>({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState<Partial<LoginProps>>({})

    const changeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        const result = userLogin.safeParse(input)
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors
            setErrors(fieldErrors as Partial<LoginProps>)
            return
        }
        try {
            await login(input)
            navigate("/")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : String(error))
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-black">
            <div className="w-full md:w-1/2 flex items-center justify-center p-3 md:p-7 lg:p-11 relative">
                <div className="absolute top-10 left-10 w-20 h-20 bg-orange/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange/10 rounded-full blur-2xl" />
                <div className="w-full max-w-md relative">
                    <div className="mb-8 flex items-center justify-center space-x-4">
                        <div className="bg-orange p-3 rounded-xl rotate-6 shadow-lg">
                            <Utensils className="w-8 h-8 text-white" />
                        </div>
                        <div className="bg-orange p-3 rounded-xl -rotate-6 shadow-lg">
                            <Flame className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-800">
                        <div className="mb-8">
                            <h1 className="font-bold text-3xl md:text-4xl text-white text-center bg-gradient-to-r from-orange to-orange-500 bg-clip-text text-transparent">
                                Welcome Back
                            </h1>
                            <p className="text-center text-gray-400 mt-2 text-lg">
                                Let's get you in!
                            </p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    name="email"
                                    title="Email"
                                    className="pl-12 h-14 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                    value={input.email}
                                    onChange={changeEvent}
                                />
                                <Mail className="absolute inset-y-4 left-4 text-gray-500" />
                                {errors.email && (
                                    <span className="text-sm text-red-400 mt-2 block">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Your Password"
                                    name="password"
                                    title="Password"
                                    className="pl-12 pr-12 h-14 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                    value={input.password}
                                    onChange={changeEvent}
                                />
                                <LockKeyhole className="absolute inset-y-4 left-4 text-gray-500" />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                                {errors.password && (
                                    <span className="text-sm text-red-400 mt-2 block">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Link
                                    to="/forgot-password"
                                    className="text-orange hover:text-orange-400 transition-colors text-sm"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange to-orange-500 hover:from-orange-500 hover:to-orange-600 h-14 text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Please Wait
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>

                        <Separator className="my-8 bg-gray-800" />

                        <p className="text-center text-gray-400">
                            New to Food App?{" "}
                            <Link to="/signup" className="text-orange hover:text-orange-400 font-semibold">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <RightPanel/>
        </div>
    )
}

export default Login