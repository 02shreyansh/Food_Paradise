import React, { lazy, Suspense, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Loading from './layout/Loading'
import { useUserStore } from "./store/useUserStore"
const Login = lazy(() => import("./auth/login"))
const SignUp = lazy(() => import('./auth/SignUp'))
const ForgotPassword = lazy(() => import("./auth/ForgotPassword"))
const ResetPassword = lazy(() => import("./auth/ResetPassword"))
const VerifyEmail = lazy(() => import("./auth/verifyEmail"))
const NotFound = lazy(() => import("./pages/NotFound"))
const MainLayout = lazy(() => import("./layout/MainLayout"))
const HeroSection = lazy(() => import("./pages/HeroSection"))
const Profile = lazy(() => import('./pages/Profile'))
const Search = lazy(() => import("./pages/Search"))
const RestaurantDetails = lazy(() => import("./pages/RestaurantDetails"))
const Cart = lazy(() => import("./pages/Cart"))
const Restaurant = lazy(() => import('./admin/Restaurant'))
const Addmenu = lazy(() => import('./admin/Addmenu'))
const Orders = lazy(() => import('./admin/Orders'))
const Order = lazy(() => import("./pages/Orders"))
const LandingPage=lazy(()=>import("./pages/Landing_Page"))
import { Navigate } from "react-router-dom"
import { useThemeStore } from "./store/useThemeStore"
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to={"/foodApp"} replace />
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return <>{children}</>;
}
const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to={"/"} replace />
  }
  return <>{children}</>;
}
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>;
}
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/search/:text',
        element: <Search />
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantDetails />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order/status',
        element: <Order />
      },
      // admin
      {
        path: '/admin/restaurant',
        element: <AdminRoute><Restaurant /></AdminRoute>
      },
      {
        path: '/admin/menu',
        element: <AdminRoute><Addmenu /></AdminRoute>
      },
      {
        path: '/admin/orders',
        element: <AdminRoute><Orders /></AdminRoute>
      },
    ],
  },
  {
    path: '/login',
    element: <AuthenticatedUser><Login /></AuthenticatedUser>
  },
  {
    path: '/signup',
    element: <AuthenticatedUser><SignUp /></AuthenticatedUser>
  },
  {
    path: '/forgot-password',
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>
  },
  {
    path: '/reset-password',
    element: <AuthenticatedUser><ResetPassword /></AuthenticatedUser>
  },
  {
    path: '/verify-email',
    element: <AuthenticatedUser><VerifyEmail /></AuthenticatedUser>
  },
  {
    path:'/foodApp',
    element: <AuthenticatedUser>< LandingPage/></AuthenticatedUser>
  },
  {
    path: "*",
    element: <NotFound />
  }
])
function App() {
  const {initializeTheme}=useThemeStore();
  const {checkAuthentication,isCheckingAuth}=useUserStore();
  useEffect(()=>{
    checkAuthentication();
    initializeTheme();
  },[checkAuthentication])

  if(isCheckingAuth) return <Loading/>
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={appRouter} />
      </Suspense>
    </main>
  )
}

export default App
