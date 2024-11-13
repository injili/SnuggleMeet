import {
  RouterProvider,
  createHashRouter,
  Outlet
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from "./pages/Home";
import LoginButton from './components/loginbutton';
import Dash from './pages/Dash';

const Layout = () => {

  const { isAuthenticated } = useAuth0()

  return (
    <div className='text-second bg-first'>
      { isAuthenticated ? (
        <Outlet/>
      ): (
        <Home/>
      )}
    </div>
  )
}


const router = createHashRouter([
  {
    path: '/',
    element:<Layout/>,
    children:[
      {
        path: '/',
        element: <Dash/>
      },
      {
        path: '/login',
        element: <LoginButton/>
      }
    ]
  }
])

export default function App(){
  return(
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}