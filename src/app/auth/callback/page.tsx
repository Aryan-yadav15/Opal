import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};  

const authCallbackPage = async (props: Props) => {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`);
  }
  if (auth.status === 500 || auth.status === 400 || auth.status === 404) {
    return redirect("/auth/sign-in");
    console.log("adsasd");
  }
};

export default authCallbackPage;
