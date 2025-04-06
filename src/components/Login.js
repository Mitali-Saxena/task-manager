import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";


const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          console.log("User info after redirect:", user);
        }
      } catch (error) {
        console.error("Error during redirect sign-in:", error);
      }
    };

    fetchUser();
  }, []);

  return <button onClick={handleLogin}>Login with Google</button>;
};

export default Login;
