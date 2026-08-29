import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import './index.css';

import App from './App';

// import Quiz from './modules/placementQuiz/pages/quiz';



import AddPost from './modules/tnp/pages/AddPost';
import AddPackage from './modules/tnp/pages/AddPackage';
import Listposts from './modules/tnp/pages/Listposts';
import Addadmin from './modules/tnp/pages/Addadmin';
import Tpohome from './modules/tnp/pages/Tpohome';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './page/login';
import Protectedsuperadmin from './components/Protectsupaeradmin';
import Guestaddpage from './modules/guestLecture/pages/Guestaddpage';
import GuestListpage from './modules/guestLecture/pages/GuestListpage';

// Protect routes wrapper

const router = createBrowserRouter([
   {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ), // Layout with sidebar + main content
    children: [
      {
        path: '/addpost',
        element: <AddPost />,
      },
      {
        path: '/',
        element: <AddPost />,
      },
      {
        path: '/addadmin',
          element: (
    <Protectedsuperadmin requireSuperAdmin={true}>
      <Addadmin />
    </Protectedsuperadmin>
  ),

      },
      
      {
        path: '/tpohome',
           element: (
    <Protectedsuperadmin requireSuperAdmin={true}>
      <Tpohome />
    </Protectedsuperadmin>
  ),
      },
      {
        path: '/addpackage',
        element: <AddPackage />,
      },
      
      {
        path: '/listposts',
        element: <Listposts />,
      },


      
      {
        path: '/guestaddlecture',
        element: <Guestaddpage /> ,
      },
      {
        path: '/guestlistlecture',
        element: <GuestListpage /> ,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
