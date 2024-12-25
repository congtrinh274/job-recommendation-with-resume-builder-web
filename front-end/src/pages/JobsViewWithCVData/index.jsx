import { useJobListContext } from '@/context/JobListContext';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { getCVById } from '@/redux/features/candidateSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ResumePreview from '../resumeEditor/components/ResumePreview';
import JobItem from '@/components/custom/JobItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { CircleArrowLeft, CircleArrowRight, Expand } from 'lucide-react';

const JobViewWithCVData = () => {
    const { recommendedJobs } = useJobListContext();
    const [resumeInfo, setResumeInfo] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
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
        if (currentCV) {
            setResumeInfo({
                title: currentCV.title,
                skills: currentCV.skills,
                experience: currentCV.experience,
                education: currentCV.education,
                ...currentCV,
            });
        }
    }, [currentCV]);

    // Pagination logic
    const totalPages = Math.ceil(recommendedJobs.length / itemsPerPage);
    const paginatedJobs = recommendedJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className="min-h-screen p-24 text-black">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-white flex-grow text-center ml-14">{resumeInfo?.title}</h1>

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-white bg-green-500 px-3 py-2 rounded-lg hover:bg-red-600"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </div>

                <div className="flex justify-between items-start mt-4">
                    <div className="w-1/2 border rounded-lg p-4 mr-6">
                        <div className="flex justify-between items-center mt-4 mb-4 text-sm">
                            <h2 className=" text-center text-xl font-bold text-white">Hồ sơ của bạn</h2>
                            <div className="flex gap-2 items-center text-sm">
                                <Button
                                    onClick={() => navigate('/resume-preview/' + resumeInfo._id)}
                                    type="button"
                                    className="border-primary text-white bg-red-500"
                                    size="sm"
                                >
                                    <Expand className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div style={{ height: '114vh', overflowY: 'auto' }}>
                            <div>
                                <ResumePreview />
                            </div>
                        </div>
                    </div>

                    {/* Right Block: Recommended Jobs */}
                    <div className="w-1/2 ml-4 p-4 border rounded-lg shadow-lg" style={{ height: '128vh' }}>
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

                        <ul className="space-y-4">
                            {paginatedJobs.map((job, index) => (
                                <JobItem job={job} key={index} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
};

export default JobViewWithCVData;
