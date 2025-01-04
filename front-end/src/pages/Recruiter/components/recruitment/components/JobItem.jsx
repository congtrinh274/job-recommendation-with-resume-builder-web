import JobDetailModal from '@/components/custom/JobDetailModal';
import { Button } from '@/components/ui/button';
import { changeApplicationState, fetRecruiter } from '@/redux/features/recruiterSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AppliedListModal from './AppliedListModal';

const JobItem = ({ job }) => {
    const { _id, title, level, location, salary, expiredDate, approvedState, description } = job;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationState, setApplicationState] = useState(job?.isCanceled);
    const [isAppliedListModalOpen, setIsAppliedListModalOpen] = useState(false);
    const formattedDate = new Date(expiredDate).toLocaleDateString();
    const dispatch = useDispatch();

    const stateColor = () => {
        if (approvedState === 'PENDING') {
            return 'border-b-4 border-yellow-500';
        } else if (approvedState === 'APPROVED') {
            return 'border-b-4 border-green-500';
        } else {
            return 'border-b-4 border-red-500';
        }
    };

    const approvedStateValue = () => {
        if (approvedState === 'PENDING') {
            return 'Chờ xét duyệt';
        } else if (approvedState === 'APPROVED') {
            return 'Đã duyệt';
        } else {
            return 'Đã hủy';
        }
    };

    const handleViewDetails = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const handleStopApplicationAccepting = async (jobId, state) => {
        try {
            await dispatch(changeApplicationState({ state, jobId }));
            toast.success(`Ngừng nhận ứng tuyển công việc có ID ${jobId}`);
            dispatch(fetRecruiter());
        } catch (error) {
            console.log(error);
            toast.error(`Đã xảy ra lỗi: ${error}`);
        }
    };

    const handleContinueApplicationAccepting = async (jobId, state) => {
        try {
            await dispatch(changeApplicationState({ jobId, state }));
            dispatch(fetRecruiter());
            toast.success(`Mở nhận ứng tuyển công việc có ID ${jobId}`);
        } catch (error) {
            toast.error(`Đã xảy ra lỗi: ${error}`);
        }
    };

    return (
        <div
            className={`relative bg-white p-4 pb-10 border shadow-md rounded-lg transition-all duration-300  ${stateColor()} hover:shadow-lg group`}
        >
            <h3 className="text-lg font-bold ">{title}</h3>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="text-sm ">
                    <span className="font-semibold">Cấp bậc:</span> {level}
                </div>
                <div className="text-sm col-span-2">
                    <span className="font-semibold">Mức lương:</span> {salary}
                </div>
                <div className="text-sm ">
                    <span className="font-semibold">Ngày hết hạn: </span>
                    {formattedDate}
                </div>
                <div className="text-sm ">
                    <span className="font-semibold">Trạng thái: </span>
                    {approvedStateValue()}
                </div>
                <div className="text-sm col-span-2">
                    <span className="font-semibold">Địa chỉ: </span> {location}
                </div>
                <div className="col-span-2">
                    <span className="font-semibold">Mô tả:</span>
                    <div
                        className="text-sm pl-6 line-clamp-3 overflow-hidden text-ellipsis"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>
            </div>

            <div className="absolute inset-0 bg-gray-50/80 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {new Date(expiredDate) > new Date() ? (
                    <div className="grid grid-cols-2 gap-2 animate-spread">
                        <Button
                            onClick={() => handleViewDetails(job)}
                            className="px-2 py-1 text-sm bg-blue-600 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-blue-500"
                        >
                            Xem chi tiết
                        </Button>
                        <Button
                            onClick={() => setIsAppliedListModalOpen(true)}
                            disabled={approvedState !== 'APPROVED'}
                            className="px-2 py-1 text-sm bg-green-600 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-green-500"
                        >
                            DS ứng tuyển
                        </Button>
                        <Button className="px-2 py-1 text-sm bg-yellow-600 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-yellow-500">
                            Cập nhật
                        </Button>
                        {job?.isCanceled ? (
                            <Button
                                onClick={() => {
                                    handleContinueApplicationAccepting(job?._id, false);
                                }}
                                className="px-2 py-1 text-sm bg-violet-600 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-violet-500"
                            >
                                Mở nhận ứng tuyển
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    handleStopApplicationAccepting(job?._id, true);
                                }}
                                className="px-2 py-1 text-sm bg-red-600 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-red-500"
                            >
                                Ngừng nhận ứng tuyển
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="text-sm font-bold">Tin tuyển dụng đã quá hạn!</div>
                )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gray-200 py-1 flex items-center justify-center text-sm">
                <span className="px-2 truncate max-w-full">ID: {_id}</span>
            </div>

            <JobDetailModal isOpen={isModalOpen} onClose={closeModal} job={selectedJob} root="recruiter" />
            <AppliedListModal
                isOpen={isAppliedListModalOpen}
                onClose={() => setIsAppliedListModalOpen(false)}
                jobId={job._id}
            />
        </div>
    );
};

export default JobItem;
