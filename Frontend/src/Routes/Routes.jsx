import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Profile from '../Pages/Profile';
import ListProperty from '../Pages/ListProperty';
import PropertyDetail from '../Pages/PropertyDetail';
import UserRentedProperties from "../Pages/UserRentedProperties"
import UserSaleProperties from "../Pages/UserSaleProperties"
import Edit from '../Pages/Edit';
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <Home />, 
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/list-property",
        element:<ListProperty/>,
      },
      {
        path:"/property/:propertyId",
        element : <PropertyDetail/>
      },
      {
        path:"/listRent",
        element:<UserRentedProperties/>
      },
      {
        path:"/listSale",
        element:<UserSaleProperties/>
      },
      {
        path:"/edit/:propertyId",
        element:<Edit/>
      }
    ],
  },
]);

export default router;
