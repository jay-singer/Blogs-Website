import axios from "axios";
import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Blog from "../components/Blogs";
import Category from "../components/Category";
import LatestBlog from "../components/LatesBlog";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const Home = () => {
  const [data, setData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBlog, setTotalBlog] = useState(0);
  const [pageLimit] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [allBlogs, setAllBlogs] = useState([]); // To store all blog data for client-side filtering

  const options = ["Travels", "Fashion", "Fitness", "Sports", "Food", "Tech"];

  // Load blog data
  const LoadBlogData = async (start = 0, end = 5, increase = 0, operation = "") => {
    try {
      const totalBlogsResponse = await axios.get(`http://localhost:3000/blogs/`);
      setTotalBlog(totalBlogsResponse.data.length);

      const response = await axios.get(`http://localhost:3000/blogs?_start=${start}&_end=${end}`);
      if (response.status === 200) {
        setData(response.data);

        if (operation === "delete") {
          setCurrentPage(0);
        } else {
          setCurrentPage(currentPage + increase);
        }

        setAllBlogs(response.data); // Store all blogs for later filtering
      } else {
        toast.error("Something went wrong while fetching blogs");
      }
    } catch (error) {
      toast.error("Error fetching blogs");
    }
  };

  const fetchLatestBlog = async () => {
    const start = totalBlog - 4 >= 0 ? totalBlog - 4 : 0;
    const end = totalBlog;

    try {
      const response = await axios.get(`http://localhost:3000/blogs?_start=${start}&_end=${end}`);
      if (response.status === 200) {
        setLatestBlog(response.data);
      } else {
        toast.error("Something went wrong while fetching the latest blogs");
      }
    } catch (error) {
      toast.error("Error fetching the latest blogs");
    }
  };

  useEffect(() => {
    LoadBlogData();
    fetchLatestBlog();
  }, [totalBlog]);

  // Handle blog deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you want to delete this blog?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/blogs/${id}`);
        if (response.status === 200) {
          toast.success("Blog deleted successfully");
          LoadBlogData(0, 5, 0, "delete"); // Reload blogs after deletion
        } else {
          toast.error("Something went wrong while deleting the blog");
        }
      } catch (error) {
        toast.error("Error deleting the blog");
      }
    }
  };

  // Truncate long descriptions
  const except = (str) => {
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
  };

  // Handle search input change
  const onInputChange = (e) => {
    if (!e.target.value) {
      LoadBlogData(0,5,0);
    }
    setSearchValue(e.target.value);
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();

    // Filter blogs by title or category
    const filteredBlogs = allBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredBlogs.length === 0) {
      toast.info("No blogs found matching the search term.");
    }

    setData(filteredBlogs); // Update with filtered blogs
  };

  const handleCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:3000/blogs?category=${category}`);
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Something went wrong while fetching blogs for this category");
      }
    } catch (error) {
      toast.error("Error fetching blogs for this category");
    }
  };

  return (
    <>
      {/* Search Component */}
      <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch} />

      <MDBContainer className="my-4">
        <MDBCol>
          {/* If no blogs are found */}
          {data.length === 0 && (
            <MDBTypography className="text-center mb-0" tag="h2">
              No Blogs Found
            </MDBTypography>
          )}

          {/* Blog Grid */}
          <MDBCol className="flex md:justify-normal items-center lg:flex-row flex-col-reverse">
            <MDBContainer className="m-0">
              <MDBCol className="bg-white grid lg:grid-cols-3 md:grid-cols-2 gap-3 mr-0 flex-1">
                {data &&
                  data.map((item, index) => (
                    <Blog key={index} {...item} handleDelete={handleDelete} except={except} />
                  ))}
              </MDBCol>
            </MDBContainer>
            <MDBCol size="3" className="self-start ml-3 lg:ml-10 w-[30%] sm:w-fit">
              <h4 className="text-start">Latest Post</h4>
              {latestBlog &&
                latestBlog.map((item, index) => <LatestBlog key={index} {...item} />)}
              <Category options={options} handleCategory={handleCategory} />
            </MDBCol>
          </MDBCol>
        </MDBCol>
      </MDBContainer>

      <div className="mt-3 mb-2">
        <Pagination
          currentPage={currentPage}
          loadBlogData={LoadBlogData}
          pageLimit={pageLimit}
          data={data}
          totalBlog={totalBlog}
        />
      </div>
    </>
  );
};

export default Home;
