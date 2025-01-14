import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Loader2, MailCheck } from "lucide-react"
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("")
    const loader = false
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
    }
    
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#1a1a1a]">
            {/* Left Decorative Section - Visible on all screens but adapted for mobile */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden min-h-[200px] md:min-h-screen p-6 md:p-12">
                {/* Decorative Circles - Adjusted sizes for mobile */}
                <div className="absolute top-5 left-5 w-20 md:w-60 h-20 md:h-60 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-5 right-5 w-16 md:w-40 h-16 md:h-40 bg-white/10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-32 md:w-80 h-32 md:h-80 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Content - Adjusted for mobile */}
                <div className="relative w-full h-full flex flex-col items-center justify-center text-white">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-6">Food Paradise</h1>
                    <p className="text-base md:text-xl text-white/90 text-center max-w-md hidden md:block">
                        Experience the finest flavors from around the world, 
                        delivered right to your doorstep.
                    </p>
                    {/* Decorative Lines - Hidden on mobile */}
                    <div className="absolute top-8 left-8 w-8 md:w-16 h-8 md:h-16 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-white/40"></div>
                    <div className="absolute bottom-8 right-8 w-8 md:w-16 h-8 md:h-16 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-white/40"></div>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-md">
                    <form 
                        className="w-full space-y-4 md:space-y-6 bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800"
                        onSubmit={submitHandler}
                    >
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-xl md:text-2xl font-semibold text-white">Forgot Password</h2>
                            <p className="text-sm text-gray-400">
                                Enter your email address to reset your password
                            </p>
                        </div>
                        
                        <div className="relative group">
                            <Input
                                type="email"
                                required
                                placeholder="Enter Your Email"
                                name="email"
                                title="Email"
                                className="pl-10 h-11 md:h-12 bg-gray-800 border-gray-700 text-gray-100 
                                         placeholder:text-gray-500 focus-visible:ring-orange-500 
                                         focus-visible:border-orange-500 rounded-lg
                                         transition-all duration-300 text-sm md:text-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MailCheck className="absolute inset-y-3 left-3 h-5 w-5 md:h-6 md:w-6 text-gray-400 
                                                group-hover:text-orange-400 transition-colors duration-300" />
                        </div>

                        <div>
                            {loader ? (
                                <Button 
                                    disabled={true} 
                                    className="w-full h-11 md:h-12 bg-orange-500 hover:bg-orange-600 text-white 
                                             font-medium rounded-lg transition-all duration-300 text-sm md:text-base"
                                >
                                    <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                                    Please Wait
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full h-11 md:h-12 bg-orange-500 hover:bg-orange-600 text-white 
                                             font-medium rounded-lg transition-all duration-300 text-sm md:text-base"
                                >
                                    Send Reset Link
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

export default ForgotPassword