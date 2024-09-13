import { MDBCard, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit'
import React from 'react'

const Category = ({handleCategory,options}) => {
  return (
    <MDBCard style={{ marginTop:"20px"}} className=' h-fit xl:w-[18rem] lg:w-[15rem] md:w-[12rem] w-full text-center'>
    <h4 className='mb-3 text-black font-medium'>Categories </h4>
    <MDBListGroup flush ="true">
    {options.map((item,index) =>(  <MDBListGroupItem  key={index} className=' cursor-pointer' onClick={() => 
    handleCategory(item)}>
     {item}
     </MDBListGroupItem>))}
    </MDBListGroup>
    </MDBCard>
  )
}

export default Category