import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import "../App.css";

const ListJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(1); // Current page number
  const [nextPage, setNextPage] = useState(null); // URL for the next page
  const [prevPage, setPrevPage] = useState(null); // URL for the previous page
  const [count, setCount] = useState(0); // Total number of jobs

  const fetchJobs = useCallback(
    (pageUrl = `http://127.0.0.1:8000/api/job_posts/?page=${page}`) => {
      setLoading(true);
      axios
        .get(pageUrl)
        .then((response) => {
          console.log("Paginated Data:", response.data);

          // Extract job data and pagination info
          const fetchedJobs = response.data.results?.jobs || [];
          setJobs(fetchedJobs);
          setNextPage(response.data.next);
          setPrevPage(response.data.previous);
          setCount(response.data.count); // Total jobs count
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error.message);
          if (error.response) {
            console.error("Response Data:", error.response.data);
            console.error("Status Code:", error.response.status);
          }
          setError("Failed to fetch jobs. Please try again later.");
          setLoading(false);
        });
    },
    [page]
  );

  useEffect(() => {
    fetchJobs(); // Fetch jobs on initial render
  }, [fetchJobs]);

  const handleNextPage = () => {
    if (nextPage) {
      setPage((prev) => prev + 1);
      fetchJobs(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage((prev) => prev - 1);
      fetchJobs(prevPage);
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!Array.isArray(jobs)) {
    return <p>Error: Data format is incorrect.</p>;
  }

  return (
    <div>
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <div className="pagination-controls">
        <button
          onClick={handlePrevPage}
          disabled={!prevPage}
          className="pagination-button prev-button"
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.floor(count / 10) - 1} 
        </span>
        <button
          onClick={handleNextPage}
          disabled={!nextPage}
          className="pagination-button next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListJob;
