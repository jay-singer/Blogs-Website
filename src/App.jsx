import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Header from "./components/Header";
import About from "./pages/about";
import AddBlog from "./pages/addBlog";
import AddEditBlog from "./pages/addEditBlog";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import SingleBlog from "./pages/singleBlog";




function App() {
  return (
    <BrowserRouter>
  
      <div className="App">
        <Header/>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addBlog" element={<AddBlog/>}/>
          <Route path="/addEditBlog/:id" element={<AddEditBlog />} />
          <Route path="/singleBlog/:id" element={<SingleBlog/>}/>
          <Route path="/about" element={<About/>} />
         <Route path ="*" element={<NotFound/>}/>
      
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
