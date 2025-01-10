import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobItem from './components/JobItem';
import JobCreationModal from './components/JobCreationModal';
import { fetRecruiter } from '@/redux/features/recruiterSlice';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowLeftCircle, ArrowRight } from 'lucide-react';

const Recruitment = ({ activeItem, setActiveItem }) => {
    const { data: recruiterData } = useSelector((state) => state.recruiter);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 2;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetRecruiter());
    }, [dispatch]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = recruiterData?.postedJobs?.slice(indexOfFirstJob, indexOfLastJob);

    const totalPages = Math.ceil(recruiterData?.postedJobs?.length / jobsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="relative mt-6">
            {recruiterData?.validatedState === 'TRUE' ? (
                <>
                    <div className="flex justify-between items-center mb-4 border-b pb-4">
                        <h2 className="text-2xl font-medium">Danh sách công việc</h2>
                        <button
                            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                            onClick={handleOpenModal}
                        >
                            Thêm công việc mới
                        </button>
                    </div>
                    <div className="mt-10">
                        {currentJobs?.length >= 1 ? (
                            <div className="grid grid-cols-2 gap-10 w-full">
                                {currentJobs?.map((job, index) => (
                                    <JobItem key={index} job={job} />
                                ))}
                            </div>
                        ) : (
                            <div>
                                Chưa có công việc nào, nhấn nút{' '}
                                <span className="font-bold text-red-600">Thêm công việc mới!</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center items-center mt-4 space-x-4">
                        <Button
                            className="bg-blue-500 text-white text-sm px-2 py-1 rounded-lg shadow hover:bg-gray-400"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeft />
                        </Button>

                        <span className="text-sm text-black-700">{`Trang ${currentPage} / ${totalPages}`}</span>

                        <Button
                            className="bg-blue-500 text-white text-sm px-2 py-1 rounded-lg shadow hover:bg-gray-400"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <ArrowRight />
                        </Button>
                    </div>
                </>
            ) : (
                <div
                    className="flex justify-center items-center m-auto text-red-500 font-bold italic cursor-pointer"
                    onClick={() => setActiveItem('personal')}
                >
                    Cần hoàn thiện hồ sơ và đợi xét duyệt từ quản trị viên trước khi được phép đăng tin tuyển dụng!
                </div>
            )}
            {isModalOpen && <JobCreationModal onClose={handleCloseModal} />}
        </div>
    );
};

export default Recruitment;
