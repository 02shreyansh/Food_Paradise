import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Loader2, LockKeyholeIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState(false)
    const loader = false
    
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
    }
    
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#1a1a1a]">
            {/* Left Decorative Section */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden min-h-[200px] md:min-h-screen p-6 md:p-12">
                {/* Animated Decorative Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-[10%] left-[10%] w-20 md:w-60 h-20 md:h-60 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[10%] right-[10%] w-16 md:w-40 h-16 md:h-40 bg-white/10 rounded-full animate-pulse [animation-delay:1s]"></div>
                    <div className="absolute top-1/2 left-1/2 w-32 md:w-80 h-32 md:h-80 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse [animation-delay:2s]"></div>
                </div>
                
                {/* Content */}
                <div className="relative w-full h-full flex flex-col items-center justify-center text-white">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-6">Food Paradise</h1>
                    <p className="text-base md:text-xl text-white/90 text-center max-w-md hidden md:block">
                        Secure your culinary journey with a new password
                    </p>
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-8 left-8 w-8 md:w-16 h-8 md:h-16 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-white/40"></div>
                    <div className="absolute bottom-8 right-8 w-8 md:w-16 h-8 md:h-16 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-white/40"></div>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-md">
                    <form 
                        className="w-full space-y-4 md:space-y-6 bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 shadow-lg relative overflow-hidden"
                        onSubmit={submitHandler}
                    >
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent"></div>

                        <div className="relative space-y-2 text-center md:text-left">
                            <h2 className="text-xl md:text-2xl font-semibold text-white">Reset Password</h2>
                            <p className="text-sm text-gray-400">
                                Enter your new password to continue
                            </p>
                        </div>
                        
                        <div className="relative group">
                            <Input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Enter Your New Password"
                                name="password"
                                title="New Password"
                                className="pl-10 pr-12 h-11 md:h-12 bg-gray-800 border-gray-700 text-gray-100 
                                         placeholder:text-gray-500 focus-visible:ring-orange-500 
                                         focus-visible:border-orange-500 rounded-lg
                                         transition-all duration-300 text-sm md:text-base"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <LockKeyholeIcon className="absolute inset-y-3 left-3 h-5 w-5 md:h-6 md:w-6 text-gray-400 
                                                     group-hover:text-orange-400 transition-colors duration-300" />
                            
                            {/* Password Toggle Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-2 right-2 p-1 h-7 w-7 md:h-8 md:w-8 flex items-center justify-center 
                                         rounded-md hover:bg-gray-700 transition-colors duration-200
                                         focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-orange-400 transition-colors duration-200" />
                                ) : (
                                    <EyeIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-orange-400 transition-colors duration-200" />
                                )}
                            </button>
                        </div>

                        <div className="relative">
                            {loader ? (
                                <Button 
                                    disabled={true} 
                                    className="w-full h-11 md:h-12 bg-orange-500 hover:bg-orange-600 text-white 
                                             font-medium rounded-lg transition-all duration-300 text-sm md:text-base
                                             shadow-lg shadow-orange-500/20"
                                >
                                    <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                                    Please Wait
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full h-11 md:h-12 bg-orange-500 hover:bg-orange-600 text-white 
                                             font-medium rounded-lg transition-all duration-300 text-sm md:text-base
                                             shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
                                >
                                    Reset Password
                                </Button>
                            )}
                        </div>

                        <Separator className="bg-gray-800" />

                        <div className="text-center">
                            <span className="text-gray-400 text-sm">
                                Back to{" "}
                                <Link 
                                    to="/login" 
                                    className="text-orange-400 hover:text-orange-300 font-medium 
                                             transition-colors duration-300 hover:underline 
                                             decoration-2 underline-offset-4"
                                >
                                    Login
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword