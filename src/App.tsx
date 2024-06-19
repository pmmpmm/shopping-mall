import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LoginContextProvider } from "@/context/LoginContext";
import queryClient from "@/services/QueryClient";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductManagement from "@/pages/ProductManagement";
import NewProduct from "@/pages/NewProduct";
import Cart from "@/pages/Cart";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import Mypage from "@/pages/Mypage";
import NotFound from "@/pages/NotFound";

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
              { path: "/product-management", element: <ProductManagement /> },
              { path: "/product-management/new", element: <NewProduct /> },
              { path: "/cart", element: <Cart /> },
              { path: "/signup", element: <Signup /> },
              { path: "/login", element: <Login /> },
              { path: "/mypage", element: <Mypage /> },
              { path: "*", element: <NotFound /> }
            ]
          }
        ])}
      />
    </QueryClientProvider>
  );
};

export default App;
