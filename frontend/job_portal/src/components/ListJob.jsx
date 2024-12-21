import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import "../App.css";

const ListJob = () => {
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/job_posts/") // API endpoint
      .then((response) => {
        console.log("Data fetched successfully:", response.data);

        // Extract the jobs array from the response object (since class based drf)
        const fetchedJobs = response.data.jobs;
        setJobs(fetchedJobs); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error.message);
        if (error.response) {
          console.error("Response Data:", error.response.data);
          console.error("Status Code:", error.response.status);
        }
        setError("Failed to fetch jobs. Please try again later.");
        setLoading(false); // Stop loading
      });
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!Array.isArray(jobs)) {
    return <p>Error: Data format is incorrect.</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default ListJob;
