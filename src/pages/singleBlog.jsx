import axios from 'axios';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Badge from '../components/Badge';
import "/src/App.css";

const SingleBlog = () => {
  const [blog, setBlog] = useState(null); 
  const [relatedPost, setRelatedPost] = useState([]);  // Initialize as an empty array
  const { id } = useParams();

  const getSingleBlog = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/blogs/${id}`);
      const relatedPostData = await axios.get(`http://localhost:3000/blogs?category=${response.data.category}&_start=0&_end=3`);
      
      if (response.status === 200 && relatedPostData.status === 200) {  // Check both responses
        setRelatedPost(relatedPostData.data);
        setBlog(response.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error fetching the blog");
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleBlog(id);
    }
  }, [id]);

  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px"
  };

  const except = (str) => {
    if (str.length > 70) {
      return str.substring(0, 70) + " ... ";
    }
    return str;
  };

  return (
    <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
      <Link to="/">
        <strong style={{ float: "left" }} className="mt-3 bg-Secondary text-white px-2 py-1 rounded cursor-pointer">
          Go back
        </strong>
      </Link>
      <MDBTypography className='text-center text-slate-900 font-medium w-full  mt-4 text-xl'  style={{ display: "block" }} >
        {blog && blog.title}
      </MDBTypography>
      {blog && (
        <>
          <img src={blog.imageUrl} alt={blog.title} style={{ width: "100%", maxHeight: "600px",marginTop:"15px" }} />
          <div style={{ marginTop: "20px" }}>
            <div style={{ height: "43px" }} className="bg-slate-100 pe-2">
              <MDBIcon style={{ float: "left" }} className='mt-3 ml-1' far icon='calendar-alt' size='lg' />
              <strong style={{ float: "left", marginTop: "7px", marginLeft: "4px" }}>
                {blog.date}
              </strong>
              <Badge styleInfo={styleInfo}>{blog.category}</Badge>
            </div>
            <MDBTypography className="lead md-0 text-center">
              {blog.description}
            </MDBTypography>
          </div>
        </>
      )}
      
      {relatedPost && relatedPost.length > 0 && (
        <>
        { relatedPost && relatedPost.length > 1 &&  <h1 className='text-gray-700 font-medium text-xl mt-2'>Related Posts</h1>}
          <MDBRow className='row-cols-1 row-cols-md-3 g-3 mt-[1px]'>
            {relatedPost.filter((item) => item.id != id).map((item, index) => (
              <MDBCol key={index}>
                <MDBCard>
                  <Link to={`/singleBlog/${item.id}`}>
                    <MDBCardImage src={item.imageUrl} alt={item.title} position='top' />
                  </Link>
                  <MDBCardBody>
                    <MDBCardTitle className='text-center'>{item.title}</MDBCardTitle>
                    <MDBTypography className='text-center'>{except(item.description)}</MDBTypography>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </>
      )}
    </MDBContainer>
  );
};

export default SingleBlog;
