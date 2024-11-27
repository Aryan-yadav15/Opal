import { Select } from '@/components/ui/select'
import Image from 'next/image'
import React from 'react'

type Props ={
    activeWorkspaceId:string
}

const Sidebar = ({activeWorkspaceId}:Props) => {
  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
        <div className="bg-[#111111] flex flex-row p-4 gap-2 justify-center items-center border-b-4 absolute top-0 left-0 right-0">
            <Image src={"/opal-logo.svg"} height={40} width={40} alt="logo" />
            <p className='text-2xl'>Opal</p>
        </div>
        <Select defaultValue={activeWorkspaceId}  ></Select>
    </div>
  )
}

export default Sidebar