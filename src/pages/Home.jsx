import theLogo from '../assets/img/snuggle.png';

export default function Home() {

    const openLoginPage = () => {
        chrome.tabs.create({
            url: "https://dev-wddm4b32vawbrco2.us.auth0.com/u/login?state=hKFo2SBnRlFnNzIySlVKZXdxT1luMHhtMF96N0hpWW9xbnR6N6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDdjRXd6WjVRd3pIRXZUR2pPMDdkY3lSQXIwQ2p5SG5mo2NpZNkgbUJiV1BrOE93czd3NUxOMGFLZnlLWXdsdkhPTGdIb0w"
        })
    }
    return (
        <div  className="h-[600px] w-[600px] flex flex-col gap-12 justify-center items-center">
            
            <img src={theLogo} alt="the snugglemeet logo" className="w-[230px] h-[230px]"/>
            <h1 className="font-bowldy text-6xl">welcome</h1>
            <button className='text-lg font-alata font-semibold py-2 px-12 border border-2 border-second bg-third' onClick={openLoginPage}>Log In</button>
            <p className='text-base font-semibold font-alata'>Don't Have an account? <button className='text-forth hover:underline hover:underline-offset-4 font-medium hover:font-bold'>Sign Up</button></p>


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