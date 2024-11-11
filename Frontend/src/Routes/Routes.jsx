import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout';
import SecLayout from "../SecLayout"
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import User from '../Pages/User';
import Register from '../Pages/Register';

// Create the browser router with routes
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />, // Layout will wrap around the pages (if needed)
    children: [
      {
        path: "/",
        element: <Home />, // Render Home when visiting "/"
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
    ],
    // Remove or adjust specific future flags here as needed
  },
]);

export default router;
