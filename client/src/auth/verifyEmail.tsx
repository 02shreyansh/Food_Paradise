import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, UtensilsCrossed, ChefHat, Soup, Pizza, Coffee } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyEmail = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef = useRef<any>([]);
    const { loading, verifyEmail } = useUserStore();
    const navigate = useNavigate();

    const handleChange = (index: number, value: string) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
        if (value !== "" && index < 5) {
            inputRef.current[index + 1].focus();
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1].focus()
        }
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verificationCode = otp.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : String(error))
        }
    }

    // Decorative icons for small screens
    const SmallScreenDecorative = () => (
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <Pizza className="w-6 h-6 text-orange/40" />
            </div>
            <div className="absolute bottom-4 left-4 animate-bounce" style={{ animationDuration: '2.5s' }}>
                <Coffee className="w-6 h-6 text-orange/40" />
            </div>
            <div className="absolute top-1/4 left-4 animate-bounce" style={{ animationDuration: '4s' }}>
                <Soup className="w-6 h-6 text-orange/40" />
            </div>
            <div className="absolute bottom-1/4 right-4 animate-bounce" style={{ animationDuration: '3.5s' }}>
                <ChefHat className="w-6 h-6 text-orange/40" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden px-4">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 right-20 w-32 h-32 bg-orange rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-40 h-40 bg-orange rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Content Container */}
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 py-8">
                {/* Left Side - Form */}
                <div className="w-full max-w-md px-4 relative">
                    {/* Show decorative elements on small screens */}
                    <div className="block md:hidden">
                        <SmallScreenDecorative />
                    </div>

                    <div className="backdrop-blur-sm bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20 shadow-2xl relative">
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <UtensilsCrossed className="w-12 h-12 text-orange" />
                            </div>
                            <h1 className="font-extrabold text-2xl md:text-3xl mb-2 bg-gradient-to-r from-orange to-yellow-500 bg-clip-text text-transparent">
                                Verify Your Email
                            </h1>
                            <p className="text-sm text-gray-400">
                                Enter the verification code sent to your email
                            </p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-8">
                            <div className="flex justify-between gap-1 sm:gap-2">
                                {otp?.map((letter: string, idx: number) => (
                                    <Input
                                        key={idx}
                                        ref={(element) => (inputRef.current[idx] = element)}
                                        maxLength={1}
                                        type="text"
                                        value={letter}
                                        onChange={(e) => handleChange(idx, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(idx, e)}
                                        className="w-11 h-11 sm:w-12 sm:h-12 text-center text-xl sm:text-2xl font-bold rounded-lg bg-black/50 border-2 border-orange/50 focus:border-orange focus:ring-2 focus:ring-orange/50 text-white placeholder-gray-500 transition-all p-0"
                                    />
                                ))}
                            </div>

                            <Button 
                                disabled={loading} 
                                type="submit" 
                                className="w-full bg-orange hover:bg-orange/80 text-white py-6 text-lg font-semibold transition-all duration-300"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Verifying...
                                    </>
                                ) : "Verify Email"}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Right Side - Enhanced Decorative Elements */}
                <div className="hidden md:block w-full max-w-md relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange/20 to-transparent opacity-30 rounded-xl"></div>
                    
                    {/* Floating Icons */}
                    <div className="relative h-[500px]">
                        <div className="absolute top-10 left-10 p-4 backdrop-blur-md bg-white/5 rounded-xl border border-white/10 transform rotate-6 animate-bounce" style={{ animationDuration: '3s' }}>
                            <ChefHat className="w-8 h-8 text-orange" />
                        </div>
                        
                        <div className="absolute top-1/4 right-12 p-4 backdrop-blur-md bg-white/5 rounded-xl border border-white/10 transform -rotate-12 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                            <Pizza className="w-8 h-8 text-orange" />
                        </div>
                        
                        <div className="absolute bottom-1/3 left-16 p-4 backdrop-blur-md bg-white/5 rounded-xl border border-white/10 transform rotate-12 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                            <Soup className="w-8 h-8 text-orange" />
                        </div>
                        
                        <div className="absolute bottom-20 right-20 p-4 backdrop-blur-md bg-white/5 rounded-xl border border-white/10 transform -rotate-6 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
                            <Coffee className="w-8 h-8 text-orange" />
                        </div>

                        {/* Decorative Circles */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-2 border-orange/30 animate-spin" style={{ animationDuration: '10s' }}></div>
                                <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-orange/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                                <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-orange/10 animate-spin" style={{ animationDuration: '20s' }}></div>
                            </div>
                        </div>

                        {/* Glowing Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange/5 to-transparent blur-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;