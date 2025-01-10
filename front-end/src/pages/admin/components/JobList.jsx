import JobDetailModal from '@/components/custom/JobDetailModal';
import { Button } from '@/components/ui/button';
import { fetchJobs } from '@/redux/features/JobSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const JobList = () => {
    const dispatch = useDispatch();
    const { jobs } = useSelector((state) => state.job);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    const getJobApprovalStatus = (approvedState) => {
        switch (approvedState) {
            case 'APPROVED':
                return 'Đã duyệt';
            case 'CANCELED':
                return 'Đã hủy';
            case 'PENDING':
                return 'Chưa duyệt';
            default:
                return 'Trạng thái không xác định';
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

    return (
        <div>
            <div className="p-4 vw">
                <h2 className="text-2xl font-semibold mb-4">Danh sách công việc đã được tạo</h2>
                <div className="overflow-x-auto w-full">
                    {jobs?.length > 0 ? (
                        <table className="bg-white border border-gray-200 rounded-lg shadow-md w-full table-fixed">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="w-[150px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        ID NTD
                                    </th>
                                    <th className="w-[200px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Tên công ty
                                    </th>
                                    <th className="w-[200px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Tên danh mục
                                    </th>
                                    <th className="w-[250px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Tiêu đề công việc
                                    </th>
                                    <th className="w-[150px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Cấp bậc
                                    </th>
                                    <th className="w-[200px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Địa chỉ
                                    </th>
                                    <th className="w-[150px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Mức lương
                                    </th>
                                    <th className="w-[150px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Ngày hết hạn
                                    </th>
                                    <th className="w-[200px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Trạng thái
                                    </th>
                                    <th className="w-[150px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Xem chi tiết
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs?.map((job, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="px-4 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                            {job?.recruiterId?._id}
                                        </td>
                                        <td className="px-4 py-2 text-sm  whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                            {job?.recruiterId?.companyName}
                                        </td>
                                        <td className="px-4 py-2 text-sm  whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                            {job?.categoryId?.title}
                                        </td>
                                        <td className="px-4 py-2 text-sm  whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                            {job?.title}
                                        </td>
                                        <td className="px-4 py-2 text-sm  whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                            {job.level}
                                        </td>
                                        <td className="px-4 py-2 text-sm  whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                            {job?.location}
                                        </td>
                                        <td className="px-4 py-2 text-sm  whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                            {job?.salary}
                                        </td>
                                        <td className="px-4 py-2 text-sm  whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                            {formatDate(job?.expiredDate)}
                                        </td>
                                        <td className="px-4 py-2 text-sm  whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                            {getJobApprovalStatus(job.approvedState)}
                                        </td>
                                        <td className="px-4 py-2 text-center border border-gray-300">
                                            <Button
                                                onClick={() => handleViewDetails(job)}
                                                className="text-xs text-white hover:underline"
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>Chưa có công việc nào được đăng!</div>
                    )}
                </div>
            </div>
            <JobDetailModal isOpen={isModalOpen} onClose={closeModal} job={selectedJob} />
        </div>
    );
};

export default JobList;
