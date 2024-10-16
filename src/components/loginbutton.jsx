import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="w-[100px] h-[100px]"><button onClick={() => loginWithRedirect()}>Log In</button>;</div>
  )
};

export default LoginButton;