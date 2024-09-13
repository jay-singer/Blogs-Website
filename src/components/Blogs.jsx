import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon
} from "mdb-react-ui-kit";
import React from 'react';
import { Link } from "react-router-dom";
import Badge from "./Badge";

const Blog = ({ title, description, category, imageUrl, id, except, handleDelete }) => {
  return (
    <MDBCol size="4" className=" w-full pb-10">
      <MDBCard className=' mt-3 h-[100%] shadow-md shadow-gray-200' style={{ maxWidth: "22rem" }}>
        <MDBCardImage 
          src={imageUrl}
          alt={title}
          position='top'
          style={{
          width:"100%",
            maxWidth: "100%",
            height: "180px",  // Increased height for better image visibility
            objectFit: "cover",  // Ensures the image covers the space neatly
             // Rounded corners for a smoother look
          }}
        />
        <MDBCardBody className="text-center d-flex flex-column justify-content-between">
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText className=" text-center ">
            {except(description)}       <Link to={`/singleBlog/${id}`} className="text-primary ml-1">Read More</Link>
      
          </MDBCardText>
          <Badge >{category}</Badge>
          <span>
           
            <MDBBtn className='mt-1 mr-[10px]' tag="a" color='none' onClick={() => { handleDelete(id); }}>
              <MDBIcon fas icon='trash' style={{ color: "#dd4b39" }} size='lg' />
            </MDBBtn>
             <Link to={`/addEditBlog/${id}`} className="">
              <MDBIcon fas icon='edit' style={{ color: "#55acee", marginRight: "15px" }} size='lg' />
            </Link>
          </span>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Blog;
