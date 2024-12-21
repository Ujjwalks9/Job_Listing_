import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/SearchBar"; // Corrected import
import JobList from "./components/ListJob";
import JobDescription from "./components/job_description"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Search />
          <Routes> 
            <Route path="/" element={<JobList />} /> 
            <Route path="/job_description/:jobId" element={<JobDescription />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;