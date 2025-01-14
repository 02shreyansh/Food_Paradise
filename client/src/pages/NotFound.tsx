import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="flex flex-col items-center text-center space-y-6 px-4 sm:px-8">
        {/* Animated 404 */}
        <h1 className="text-8xl font-bold tracking-tighter animate-slide-up text-gray-900">
          404
        </h1>

        {/* A subtle fading message */}
        <p className="text-lg sm:text-xl md:text-2xl font-medium max-w-lg animate-fade-in">
          Sorry, we couldn't find the page you're looking for. Let's get you back home.
        </p>

        {/* Button with hover effect */}
        <div>
          <Button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-500 transition-transform transform hover:scale-105"
          >
            Take Me Home
          </Button>
        </div>

        {/* Animated decorative lines */}
        <div className="mt-10 relative w-64 h-8">
          <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-blue-300 animate-slide-right"></div>
          <div className="absolute top-4 left-0 h-[2px] w-full bg-gradient-to-r from-gray-300 to-gray-100 animate-slide-left"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
