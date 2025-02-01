"use client"
import Container from '@/components/ui/container'
import React from 'react'
import CreateServiceForm from './createservice/page'
import ServiceList from './showallservice/page'

export default function Services() {
  return (
    <Container>
       <h1 className="text-2xl font-bold mb-6">Create New Service</h1>
        <CreateServiceForm/>
        <ServiceList/>
    </Container>
  )
}
