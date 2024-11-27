"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const client = new QueryClient()
// if we want to access conteext provider throughout the than we need to add it
const ReactQueryProvider = ({children}: Props) => {
  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider