import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const DashboardPage = async (props: Props) => {
  const auth = await onAuthenticateUser();
 
  if (!auth.user && (auth.status === 200 || auth.status === 201)) {
    return redirect("/auth/sign-in");
  }

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`)

  }

  if ([500, 400, 404, 403].includes(auth.status)) {
    return redirect("/auth/sign-in");
  }

  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage