import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";

// import Header from "./components/nav/Header";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import Home from "./pages/Home";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import History from "./pages/user/History";
// import UserRoute from "./components/routes/UserRoute";
// import Password from "./pages/user/Password";
// import Wishlist from "./pages/user/Wishlist";
// import AdminRoute from "./components/routes/AdminRoute";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import SubCategory from "./pages/admin/sub/SubCategory";
// import ProductCreate from "./pages/admin/product/ProductCreate";
// import AllProducts from "./pages/admin/product/AllProducts";
// import ProductUpdate from "./pages/admin/product/ProductUpdate";
// import Product from "./pages/Product";
// import CategoryHome from "./pages/category/CategoryHome";
// import SubHome from "./pages/sub/SubHome";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import SideDrawer from "./components/drawer/SideDrawer";
// import Checkout from "./pages/Checkout";
// import Payment from "./pages/Payment";
// import Coupon from "./pages/admin/coupon/Coupon";

//using lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Header = lazy(() => import("./components/nav/Header"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const Home = lazy(() => import("./pages/Home"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const SubCategory = lazy(() => import("./pages/admin/sub/SubCategory"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const Coupon = lazy(() => import("./pages/admin/coupon/Coupon"));

function App() {
  const dispatch = useDispatch();

  //to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    //cleanup
    return () => unsubscribe;
  }, [dispatch]);
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          Glori Ecommerce
          <LoadingOutlined />
        </div>
      }
    >
      <SideDrawer />
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/register/complete" component={RegisterComplete} exact />
        <Route path="/forgot/password" component={ForgotPassword} exact />
        <Route path="/product/:slug" component={Product} exact />
        <Route path="/category/:slug" component={CategoryHome} exact />
        <Route path="/sub/:slug" component={SubHome} exact />
        <Route path="/shop" component={Shop} exact />
        <Route path="/cart" component={Cart} exact />

        <UserRoute path="/user/history" component={History} exact />
        <UserRoute path="/user/password" component={Password} exact />
        <UserRoute path="/user/wishlist" component={Wishlist} exact />
        <UserRoute path="/checkout" component={Checkout} exact />
        <UserRoute path="/payment" component={Payment} exact />

        <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact />
        <AdminRoute path="/admin/category" component={CategoryCreate} exact />
        <AdminRoute path="/admin/sub" component={SubCategory} exact />
        <AdminRoute path="/admin/product" component={ProductCreate} exact />
        <AdminRoute path="/admin/products" component={AllProducts} exact />
        <AdminRoute
          path="/admin/product/:slug"
          component={ProductUpdate}
          exact
        />
        <AdminRoute path="/admin/coupon" component={Coupon} exact />
      </Switch>
    </Suspense>
  );
}

export default App;
