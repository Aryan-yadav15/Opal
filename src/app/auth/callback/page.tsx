import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";
import AuthLoading from "./loading"; // Import the AuthLoading component

type Props = {};

const authCallbackPage = async (props: Props) => {
  const [loading, setLoading] = useState(true); // Add loading state

  const auth = await onAuthenticateUser();

  useEffect(() => {
    setLoading(false); // Set loading to false after authentication
  }, []);

  if (loading) {
    return <AuthLoading />; // Show loading spinner while authenticating
  }

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }
  if (auth.status === 500 || auth.status === 400 || auth.status === 404) {
    return redirect("/auth/sign-in");
  }
};

export default authCallbackPage;