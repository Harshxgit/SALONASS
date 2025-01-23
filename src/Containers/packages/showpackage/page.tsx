'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { services, Service } from '../../../constants/service'
import { getPackages } from '@/app/actions/packages/package'
import useSWR from 'swr'
import useAdminPackages from '@/app/store/adminPackages'
import { Packages } from '@/types/packages'
import React from 'react'
import useAdminService from '@/app/store/adminservice'
export default function PackageList() {
  const [filter, setFilter] = useState<string>('All')
  const {data ,error , isLoading} = useSWR('api/packages',getPackages )
  const additem = useAdminPackages((state) => state.additem)
  const items = useAdminPackages((state) => state.items)
  console.log(items)
  //leave logic for 
  // const filteredServices = filter === 'All' 
  //   ? data 
  //   : data.filter(service => service.type === filter)

    useEffect(()=>{
        if(data){
            additem(data)
    }},[data,additem])
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Packages</h1>
        <Select onValueChange={setFilter} defaultValue="All">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className='backdrop-blur'>
            <SelectItem value="All">All Services</SelectItem>
            <SelectItem value="Haircut">Haircut</SelectItem>
            <SelectItem value="Coloring">Coloring</SelectItem>
            <SelectItem value="Styling">Styling</SelectItem>
            <SelectItem value="Treatment">Treatment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items && items.map((service) => (
          <Packagess key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

function ServiceCard({ service }: { service: Packages }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          {/* <Image
            src={service.image}
            alt={service.name}
            width={100}
            height={100}
            className="rounded-md"
          /> */}
          <div>
            <p className="font-semibold">${service.price}</p>
            { 
              service.services.map((service) => (
                <div key={service.id} className="text-sm text-gray-500">{service.servicename}</div>
              ))
            }
           
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const Packagess = React.memo(ServiceCard)