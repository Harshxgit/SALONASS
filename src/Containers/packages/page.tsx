import Container from '@/components/ui/container'
import React from 'react'
import CreatePackageForm from './createpackage/page'
import PackageList from './showpackage/page'

export default function Package() {
  return (
    <Container>
        <CreatePackageForm/>
        {/* <PackageList/> */}
    </Container>
  )
}
