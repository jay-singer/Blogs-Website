import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'
import "/src/App.css"

const LatestBlog = ({imageUrl, title, id}) => {
  return (
    <div>
    <Link to={`/singleBlog/${id}`}>
     <MDBCard style={{maxWidth:"300px", height:"60px", }} className='mt-2 '>
         <MDBRow className='g-0  justify-center items-center flex' >
            <MDBCol md="3" style={{height:"60px", width:"60px"}} className=''>
              <MDBCardImage src={imageUrl} alt={title} fluid = "true" className='rounded-circle object-cover object-center ' style={{height:"100%", width:"100%"}} />
            </MDBCol>
            <MDBCol md="9">
              <MDBCardBody>
               <p className="text-start latest-title">{title}</p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
    </MDBCard>
    </Link>
    </div>
  )
}

export default LatestBlog