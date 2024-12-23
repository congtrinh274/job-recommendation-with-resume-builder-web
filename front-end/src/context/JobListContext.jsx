import { createContext, useContext, useState } from 'react';

const JobListContext = createContext();

export const JobProvider = ({ children }) => {
    const [recommendedJobs, setRecommendedJobs] = useState([]);

    return (
        <JobListContext.Provider value={{ recommendedJobs, setRecommendedJobs }}>{children}</JobListContext.Provider>
    );
};

export const useJobListContext = () => useContext(JobListContext);
