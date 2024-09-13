import axios from 'axios';
import { MDBBtn, MDBInput, MDBTextArea, MDBValidation } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "/src/App.css";

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: ""
};

const options = ["Travels", "Fashion", "Fitness", "Sports", "Food", "Tech"];

const AddBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const { title, description, category, imageUrl } = formValue;
  const navigate = useNavigate();
  const getDate = () =>{
  let today = new Date()
  let dd = String(today.getDate()).padStart(2,"0");
  let mm = String(today.getMonth() + 1).padStart(2,"0");
  let yyy = today.getFullYear();
  today = mm + "/" + dd + "/" +yyy;
  return today;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!title) errors.title = "Please provide a title";
    if (!description) errors.description = "Please provide a description";
    if (!category) errors.category = "Please select a category";
    if (!imageUrl) errors.imageUrl = "Please upload an image";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Clear errors and submit the form data
    setFormErrors({});
    if(title && description && imageUrl && category){
    const currentTime = getDate();
    const updatedBlogData = {...formValue, date: currentTime}
    const response = await axios.post("http://localhost:3000/blogs",updatedBlogData)
    if(response.status === 201){
    toast.success("Blog Created successfully")
    }else{
    toast.error("Something went wrong")
    }
    setFormValue({title:"",description:"",imageUrl:"", category:""})
    navigate("/")
    }

  };

  const onCategoryChange = (e) => {
    setFormValue({ ...formValue, category: e.target.value });
    setFormErrors({ ...formErrors, category: "" });
  };

  const onInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const onUploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tnkwdulp");

    axios.post("http://api.cloudinary.com/v1_1/dzycyxcku/image/upload", formData)
      .then((res) => {
        toast.info("Image uploaded successfully");
        setFormValue({ ...formValue, imageUrl: res.data.url });
        setFormErrors({ ...formErrors, imageUrl: "" });
      })
      .catch((err) => {
        toast.error("Something went wrong during image upload");
        setFormErrors({ ...formErrors, imageUrl: "Image upload failed" });
      });
  };

  return (
    <MDBValidation className='row g-3 mt-[100px]' noValidate onSubmit={handleSubmit}>
      <div className='flex flex-col items-center' style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center"
      }}>
        <p className='fs-4 fw-bold mb-4'>Add Blog</p>

        {/* Title Input */}
        <MDBInput
          value={title || ""}
          name='title'
          type='text'
          onChange={onInputChange}
          required
          label="Title"
          validation="Please provide title"
          invalid="true"
        />
        {formErrors.title && <p className='text-danger'>{formErrors.title}</p>}
        <br />

        {/* Description Input */}
        <MDBTextArea
          value={description || ""}
          name='description'
          onChange={onInputChange}
          required
          label="Description"
          rows={4}
          validation="Please provide description"
          invalid="true"
        />
        {formErrors.description && <p className='text-danger'>{formErrors.description}</p>}
        <br />

        {/* File Upload */}
        <MDBInput
          type='file'
          onChange={(e) => onUploadImage(e.target.files[0])}
          required
          validation="Please provide a file"
          invalid="true"
        />
        {formErrors.imageUrl && <p className='text-danger'>{formErrors.imageUrl}</p>}
        <br />

        {/* Category Dropdown */}
        <select
          name="category"
          id="category"
          className='categoryDropdown'
          onChange={onCategoryChange}
          value={category}
          required
        >
          <option value="">Please select a category</option>
          {options.map((option, index) => (
            <option value={option} key={index}>{option}</option>
          ))}
        </select>
        {formErrors.category && <p className='text-danger'>{formErrors.category}</p>}
        <br />
        <br />

        {/* Submit and Go Back Buttons */}
        <div>
          <MDBBtn type='submit' className='me-[10px]'>Add</MDBBtn>
          <MDBBtn className='me-[10px] bg-red-600' onClick={() => { navigate("/") }}>Go Back</MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddBlog;
