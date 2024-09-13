import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";
const About = () => {
  return <div className="text-center mt-[100px]">
   
         <MDBContainer>
         <MDBTypography note noteColor="primary">
       
Welcome to our vibrant blogging website, where you'll discover engaging content across a variety of categories, including Travel, Food, Sports, Fitness, Tech, and Fashion. Whether you're planning your next adventure, looking for delicious recipes, staying updated on the latest sports news, or seeking fitness tips to boost your health, we've got something for everyone. Our Tech section keeps you informed about the latest gadgets and innovations, while the Fashion category offers style advice and trend updates to keep you looking your best. With a diverse range of posts, we aim to inspire and inform readers from all walks of life. Dive into our blog today and explore topics that spark your interest!
         </MDBTypography>
         </MDBContainer>
     <Link to="/" className="flex justify-center">
        <strong style={{ float: "left" }} className="mt-3 bg-Secondary text-white px-2 py-1 rounded cursor-pointer">
          Go back
        </strong>
      </Link>
  </div>;
};

export default About;
