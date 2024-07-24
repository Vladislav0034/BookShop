import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from '@chakra-ui/react';
  import { NavLink } from "react-router-dom";
 

export default function NavBar(): JSX.Element {
  return (
    <Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink as={NavLink} to='/'>Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink as={NavLink} to='/'>SignUp</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink as={NavLink} to='/'>SignIn</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink as={NavLink} to='/filter'>Filter Page</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
  )
}

