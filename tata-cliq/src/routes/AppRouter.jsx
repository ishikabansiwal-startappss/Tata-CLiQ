import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Home = lazy(() => import("../pages/Home/Home"));
const ProductListing = lazy(() => import("../pages/ProductListing/ProductListing"));
const ProductDetail = lazy(() => import("../pages/ProductDetail/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const Search = lazy(() => import("../pages/Search/Search"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div className="skeleton" style={{ width: 60, height: 60, borderRadius: '50%' }} />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: "products", element: <Suspense fallback={<PageLoader />}><ProductListing /></Suspense> },
      { path: "product/:id", element: <Suspense fallback={<PageLoader />}><ProductDetail /></Suspense> },
      { path: "search", element: <Suspense fallback={<PageLoader />}><Search /></Suspense> },
      { path: "wishlist", element: <Suspense fallback={<PageLoader />}><Wishlist /></Suspense> },
      { path: "cart", element: <Suspense fallback={<PageLoader />}><Cart /></Suspense> },
      { path: "checkout", element: <Suspense fallback={<PageLoader />}><Checkout /></Suspense> },
      { path: "profile", element: <Suspense fallback={<PageLoader />}><Profile /></Suspense> },
      { path: "*", element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}