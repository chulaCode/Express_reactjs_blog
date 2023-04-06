import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Register, {action as registerAction} from "./pages/Register";
import Login from "./pages/Login";
import Home, {loader as AllpostLoader}from "./pages/Home";
import Single, {loader as DetailLoader} from "./pages/Single";
import Write, {action as postAction} from "./pages/Write";
import AllPosts  from "./pages/AllPosts";
import About from "./pages/About";
import Adverts from "./pages/Adverts";
import RootLayout from "./component/Layout/RootLayout";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <RootLayout />,
    //errorElement: <Error />,
    children: 
    [

      {
        path: "/",
        element: <Home />,
        loader: AllpostLoader

      },
        {
          path: "/Home",
          element: <Home />,
          loader: AllpostLoader

        },
        {
          path: "/write",
          element: <Write />,
          action: postAction

        },
        {
          path: "/allNews",
          element: <AllPosts />,
          //loader: AllNewsLoader
        },
        {
          path: "/:id",
          element: <Single />,
          //loader: DetailLoader
        },
       
         
     ]

  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction
  },
  {
    path: "/login",
    element: <Login />,
    
  },
  {
    path: "/about",
    element: <About />,
    
  },
  {
    path: "/advert",
    element: <Adverts />,
    
  },
]);

function App() {
  return (
    <div className="app">
       <div className="container">
          <RouterProvider router={router} />
        </div>
    </div>
    );
}

export default App;
