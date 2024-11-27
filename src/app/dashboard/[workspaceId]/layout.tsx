import React from 'react'
import { getNotification, onAuthenticateUser } from '@/actions/user'
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkSpaces,
  verifyAcessToWorkspace,
} from '@/actions/workspace'
import { redirect } from 'next/navigation'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Sidebar from '@/components/global/sidebar'

type Props = {
  params: { workspaceId: string }
  children: React.ReactNode
}

const Layout = async ({ params,children }: Props) => {
  // Destructure workspaceId here instead of in the function parameters
  const { workspaceId } = await params;  // <-- Fix applied here

  const auth = await onAuthenticateUser()
  if (!auth.user?.workspace) redirect('/auth/sign-in')
  if (!auth.user.workspace.length) redirect('/auth/sign-in')
  
  const hasAccess = await verifyAcessToWorkspace(workspaceId)

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`)
  }

  if (!hasAccess.data?.workspace) return null

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['user-workspaces'],
    queryFn: () => getWorkSpaces(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['user-notifications'],
    queryFn: () => getNotification(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkspaceId={workspaceId} />
        <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default Layout