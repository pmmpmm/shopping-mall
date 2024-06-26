import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LoginContextProvider } from "@/context/LoginContext";
import queryClient from "@/services/QueryClient";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import ProductManagement from "@/pages/ProductManagement";
import CreateProduct from "@/pages/CreateProduct";
import UpdateProduct from "@/pages/UpdateProduct";
import Cart from "@/pages/Cart";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import Mypage from "@/pages/Mypage";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/features/ProtectedRoute";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider
        router={createBrowserRouter([
          {
            element: (
              <LoginContextProvider>
                <Outlet />
              </LoginContextProvider>
            ),
            children: [
              { path: "/", element: <Home /> },
              { path: "/products", element: <Products /> },
              { path: "/productpage", element: <ProductDetail /> },
              {
                path: "/product-management",
                element: <ProtectedRoute requireAdmin element={<ProductManagement />} />
              },
              {
                path: "/product-management/create",
                element: <ProtectedRoute requireAdmin element={<CreateProduct />} />
              },
              {
                path: "/product-management/update",
                element: <ProtectedRoute requireAdmin element={<UpdateProduct />} />
              },
              { path: "/cart", element: <ProtectedRoute element={<Cart />} /> },
              { path: "/mypage", element: <ProtectedRoute element={<Mypage />} /> },
              { path: "/signup", element: <Signup /> },
              { path: "/login", element: <Login /> },
              { path: "*", element: <NotFound /> }
            ]
          }
        ])}
      />
    </QueryClientProvider>
  );
};

export default App;
