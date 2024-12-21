import React from "react";
import "../App.css";
import {useNavigate} from "react-router-dom"; 

const JobCard = ({ job }) => {

  const navigate = useNavigate();

  const handleJobClick = () => {
    navigate(`/job_description/${job.id}`); // Dynamic routing with job ID
  };

  const calculateTimeAgo = (datetime) => {
    const now = new Date(); // Current time
    const postedDate = new Date(datetime); 

    const timeDiff = now.getTime() - postedDate.getTime(); 
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (minutes < 1) {
      return `just now`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };


  return (
    // <Link to={`../job_description/${job.id}`} className="job-card">
    <div className="job-card" onClick={handleJobClick} >
     
      <div className="job-header">
        <p className="job-posted">{calculateTimeAgo(job.updated_at)}</p>
        <span className="job-tags">{job.location} - {job.employment_type}</span>
      </div>

      
      <div className="job-content">
       
        <div className="job-logo-container">
          <img
            src={job.company_logo_url}
            alt={`${job.company} logo`}
            className="job-logo"
          />
        </div>

       
        <div className="job-details">
          <h2 className="job-title">{job.job_title}</h2>
          <p className="job-company">{job.company}</p>
        </div>

      
        <div className="job-info">
          <p className="job-salary">{job.salary}</p>
          <div className="job-meta">
            <span className="job-location">{job.location}</span>
            <span className="job-type">{job.employment_type}</span>
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
};

export default JobCard;
