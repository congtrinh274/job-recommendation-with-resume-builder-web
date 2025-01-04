import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { getCVById } from '@/redux/features/candidateSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import JobItem from '@/components/custom/JobItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

const JobViewWithCVData = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const navigate = useNavigate();

    const { currentCV } = useSelector((state) => state.candidate);
    const dispatch = useDispatch();
    const { cvId } = useParams();

    useEffect(() => {
        if (cvId) {
            dispatch(getCVById({ cvId }));
        }
    }, [cvId, dispatch]);

    useEffect(() => {
        const savedData = localStorage.getItem('candidateRecommendedJobsWithCVData');

        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setJobs(parsedData.recommendedJobs);
            } catch (error) {
                console.error('Failed to parse jobs data from localStorage', error);
            }
        }
    }, []);

    const totalPages = Math.ceil(jobs.length / itemsPerPage);
    const paginatedJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="min-h-screen p-24 text-black ">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-white flex-grow text-center ml-14">{currentCV?.title}</h1>

                <Button
                    onClick={() => navigate('/resume-preview/' + currentCV._id)}
                    type="button"
                    className="border-primary text-white bg-green-500 mr-2"
                    size="sm"
                >
                    Xem CV
                </Button>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                </button>
            </div>

            <div>
                <div className=" p-4 border rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mt-4 mb-4 text-sm">
                        <h2 className="text-xl font-bold text-center text-white">Công việc phù hợp</h2>
                        <div className="flex gap-3 items-center text-sm">
                            <Button
                                disabled={currentPage === 1}
                                onClick={handlePrevPage}
                                className="border-primary bg-red-500 text-white"
                                size="sm"
                            >
                                <CircleArrowLeft className="h-6 w-6" />
                            </Button>
                            <span className="text-sm font-medium text-white">
                                Trang {currentPage}/{totalPages}
                            </span>
                            <Button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="border-primary bg-red-500 text-white"
                                size="sm"
                            >
                                <CircleArrowRight className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {paginatedJobs.map((job, index) => (
                            <JobItem job={job} recruiterData={job?.recruiterId} key={index} itemKey={index + 1} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobViewWithCVData;
