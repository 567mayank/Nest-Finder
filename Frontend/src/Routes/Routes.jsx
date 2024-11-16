import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Profile from '../Pages/Profile';
import ListProperty from '../Pages/ListProperty';
import PropertyDetail from '../Pages/PropertyDetail';
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
      }
    ],
  },
]);

export default router;
