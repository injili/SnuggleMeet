import theLogo from '../assets/img/snuggle.png';
import ReactDOM from 'react-dom/client';

export default function Home() {

    const openWindow = async () => {
        try {
            const dpip = await window.documentPictureInPicture.requestWindow({
                width: "1000",
                height: "1000",
            });

            const pipDiv = dpip.document.createElement("div");
            pipDiv.setAttribute("id", "pip-root");
            dpip.document.body.append(pipDiv);
            const pipRoot = ReactDOM.createRoot(
                dpip.document.getElementById("pip-root")
            );
            pipRoot.render(<WindowContents />);
        } catch (error) {
            if (error) {
                console.log(error);
            }
        }
    }

    const WindowContents = () => {
        return (
            <div>
                <p>This Window is open</p>
            </div>
        );
    };

    return (
        <div  className="h-[600px] w-[600px] flex flex-col gap-12 justify-center items-center">
            
            <img src={theLogo} alt="the snugglemeet logo" className="w-[230px] h-[230px]"/>
            <h1 className="font-bowldy text-6xl">welcome</h1>
            <button className='text-lg font-alata font-semibold py-2 px-12 border border-2 border-second bg-third' onClick={openWindow}>Log In</button>
            <p className='text-base font-semibold font-alata'>Don&apos;t Have an account? <button className='text-forth hover:underline hover:underline-offset-4 font-medium hover:font-bold'>Sign Up</button></p>


        </div>
    )
}
// import { useState } from "react";
// import Room from "./Room";
    // const [joined, setJoined] = useState(false);

            // {
            //     !joined && (
            //     <button onClick={() => setJoined(true)}>
            //         Join Room
            //     </button>
            //     )
            // }

            // {
            //     joined && (
            //     <Room/>
            //     )
            // }