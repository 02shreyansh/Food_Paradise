import {  Utensils, Flame, Cookie, ChefHat, Stars } from "lucide-react"
const RightPanel = () => {
    return (
        <div id="rightPanel" className="hidden md:block md:w-1/2 bg-gradient-to-br from-orange to-orange-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full grid grid-cols-8 gap-4">
                    {[...Array(64)].map((_, i) => (
                        <div key={i} className="relative">
                            <Cookie
                                className={`w-full h-full transform rotate-45 transition-transform duration-1000 hover:rotate-90 
                                    ${i % 2 === 0 ? 'animate-float-slow' : 'animate-float-slower'}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative h-full flex items-center justify-center p-8">
                <div className="text-center max-w-lg backdrop-blur-sm bg-black/5 p-8 rounded-3xl border border-white/10">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <ChefHat className="w-12 h-12 text-white" />
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-6 relative">
                        <span className="relative">
                            Experience the Joy of Cooking
                            <Stars className="absolute -right-8 -top-4 w-6 h-6 text-yellow-300 animate-pulse" />
                        </span>
                    </h2>

                    <p className="text-xl text-white/90 leading-relaxed">
                        Join our community of food lovers and discover amazing recipes from around the world
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {[
                            { text: "Easy to Use", icon: <Utensils className="w-4 h-4" /> },
                            { text: "Best Restaurants", icon: <Flame className="w-4 h-4" /> },
                            { text: "Pro Tips", icon: <ChefHat className="w-4 h-4" /> }
                        ].map((feature) => (
                            <div
                                key={feature.text}
                                className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full text-white flex items-center gap-2 
                                    hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                            >
                                {feature.icon}
                                {feature.text}
                            </div>
                        ))}
                    </div>

                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-xl animate-pulse-slow" />
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-orange-400/20 rounded-full blur-lg animate-pulse-slower" />
                </div>
            </div>
        </div>
    );
};
export default RightPanel;