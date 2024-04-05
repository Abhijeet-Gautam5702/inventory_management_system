import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customErrorToastMessage from "../utilities/customErrorToastMessage";
import toast, { Toaster } from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";

/*
    Wrapper Component (Higher Order Component)

    This wrapper component is built to protect the routes that must not be accessed by unauthorized & unautheticated users.

    This component simply does a backend call to check if the user is logged-in. If not, it redirects the client to the login page.
*/
export default function ProtectedComponent({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  async function isUserAuthenticated() {
    try {
      await axios.get("http://localhost:3000/api/v1/user/is-user-logged-in", {
        withCredentials: true,
      });
      //   console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      const errorCode = error.response.data.statusCode;
      const toastMessage = customErrorToastMessage(
        {
          422: "Unauthorized route. Please Login to continue",
        },
        errorCode
      );

      // Navigate to the Login Page
      navigate("/login", { replace: true });

      // Toast message
      setTimeout(() => {
        toast.error(toastMessage, {
          position: "top-center",
          duration: 3000,
        });
      }, 500);
    }
  }

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  return (
    <>
      {isLoading == true ? (
        <FallingLines
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
          color="#004aad"
        />
      ) : (
        <>
          <Toaster />
          <>{children}</>
        </>
      )}
    </>
  );
}
