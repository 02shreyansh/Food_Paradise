import { UtensilsCrossed, Clock, Star, Search, Smartphone, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const LandingPage = () => {
    const navigate = useNavigate();
    const features = [
        {
            icon: <UtensilsCrossed className="w-8 h-8 text-orange-500" />,
            title: "Wide Selection",
            description: "Choose from hundreds of local restaurants"
        },
        {
            icon: <Clock className="w-8 h-8 text-orange-500" />,
            title: "Fast Delivery",
            description: "Get your food delivered in 30 minutes or less"
        },
        {
            icon: <Star className="w-8 h-8 text-orange-500" />,
            title: "Top Rated",
            description: "Enjoy meals from the best-rated restaurants"
        },
        {
            icon: <Smartphone className="w-8 h-8 text-orange-500" />,
            title: "Easy Ordering",
            description: "Order with just a few taps on your phone"
        }
    ];

    const foodImages = {
        pizza: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
        burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
        indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
        chinese: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
        dessert: "https://images.unsplash.com/photo-1488477181946-6428a0291777"
    };

    return (
        <div className="min-h-screen">
            {/* Header with Login */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-orange-500">Food Paradise</h1>
                    <div className="flex gap-4">
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem  >
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem >
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem >
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Button onClick={() => navigate("/signup")} variant="outline">Sign Up</Button>
                        <Button onClick={() => navigate("/login")} className="bg-orange hover:bg-hoverOrange">Login</Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-orange-100 to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center py-12 lg:py-24">
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Delicious Food<br />
                                <span className="text-orange-500">Delivered to You</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">
                                Order from your favorite restaurants and get fresh food delivered to your doorstep in minutes.
                            </p>
                        </div>
                        <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                                alt="Delicious Food"
                                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-4 p-4 bg-white rounded-full shadow-lg">
                            <Search className="w-6 h-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for restaurants or dishes..."
                                className="flex-1 outline-none text-lg"
                            />
                            <Button className="bg-orange-500 hover:bg-orange-600">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                                <div className="flex justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Object.entries(foodImages).map(([category, imgUrl], index) => (
                            <div key={index} className="group relative cursor-pointer">
                                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                        src={imgUrl}
                                        alt={category}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-center mt-2 font-medium capitalize">{category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section with Background Image */}
            <section className="py-16 bg-orange-500 relative">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1543353071-087092ec393a)'
                    }}
                ></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-20">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Ready to order your favorite food?
                        </h2>
                        <p className="text-white/90 mb-8">
                            Join thousands of satisfied customers who order with us daily.
                        </p>
                        <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                            Download App Now
                        </Button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default LandingPage;