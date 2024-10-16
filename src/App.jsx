import {
  RouterProvider,
  createHashRouter,
  Outlet
} from 'react-router-dom';
import Home from "./pages/Home";

const Layout = () => {

  return (
    <div className='text-second bg-first'>
        <Outlet/>
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
        element: <Home/>
      }
    ]
  }
])

export default function App(){
  return(
    <div className="h-[600px] w-[600px]">
      <RouterProvider router={router}/>
    </div>
  )
}