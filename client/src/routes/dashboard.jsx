// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Search from "@material-ui/icons/Search";
import CompareArrows from "@material-ui/icons/CompareArrows";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LocalOffer from "@material-ui/icons/LocalOffer";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Cart from "views/Cart/Cart.jsx";
import Offers from "views/Offers/Offers.jsx";
import SearchPage from "views/Search/Search.jsx";
import Transactions from "views/Transactions/Transactions.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/offers",
    sidebarName: "Offers",
    navbarName: "Offers",
    icon: LocalOffer,
    component: Offers
  },
    {
      path: "/search",
      sidebarName: "Search",
      navbarName: "Search",
      icon: Search,
      component: SearchPage
    },
    {
      path: "/cart",
      sidebarName: "Cart",
      navbarName: "Cart",
      icon: ShoppingCart,
      component: Cart
    },
    {
      path: "/transaction",
      sidebarName: "Transactions",
      navbarName: "Transactions",
      icon: CompareArrows,
      component: Transactions
    },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },


  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
