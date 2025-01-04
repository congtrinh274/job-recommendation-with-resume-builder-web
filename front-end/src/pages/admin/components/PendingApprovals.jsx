import { Button } from '@/components/ui/button';
import { approveJob, fetchJobs } from '@/redux/features/JobSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const PendingApprovals = () => {
    const dispatch = useDispatch();
    const { jobs } = useSelector((state) => state.job);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    const filteredJobs = jobs?.filter((job) => job.approvedState === 'PENDING');

    const handleApprove = (jobId, recruiterId) => {
        dispatch(approveJob({ jobId, recruiterId, approvedState: 'APPROVED' }))
            .then(() => {
                toast.success('Duyệt thành công');
                dispatch(fetchJobs());
            })
            .catch(() => {
                toast.error('Có lỗi xảy ra khi duyệt công việc.');
            });
    };

    const handleCancel = (jobId, recruiterId) => {
        const cancelReason = prompt('Nhập lý do hủy tin tuyển dụng:');
        if (!cancelReason) return;

        dispatch(approveJob({ jobId, recruiterId, approvedState: 'CANCELED', cancelReason }))
            .then(() => {
                toast.warning('Đã hủy tin tuyển dụng!');
                dispatch(fetchJobs());
            })
            .catch(() => {
                toast.error('Có lỗi xảy ra khi duyệt công việc.');
            });
    };

    return (
        <div>
            <div className="p-4 vw">
                <h2 className="text-2xl font-semibold mb-4">Công việc chưa xét duyệt</h2>
                <div className="overflow-x-auto w-full">
                    {filteredJobs?.length > 0 ? (
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
                                    <th className="w-[150px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Xem chi tiết
                                    </th>
                                    <th className="w-[200px] px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredJobs?.map((job, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="px-4 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                            {job?.recruiterId._id}
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
                                        <td className="px-4 py-2 text-center border border-gray-300">
                                            <Button className="text-xs text-white hover:underline">Xem chi tiết</Button>
                                        </td>
                                        <td className="px-4 py-2 text-center border border-gray-300">
                                            {job?.approvedState === 'APPROVED' ? (
                                                <span className="text-green-500 text-xs font-semibold">Đã duyệt</span>
                                            ) : job?.approvedState === 'CANCELED' ? (
                                                <span className="text-red-500 text-xs font-semibold">Đã hủy</span>
                                            ) : (
                                                <>
                                                    <Button
                                                        onClick={() => handleApprove(job._id, job.recruiterId._id)}
                                                        className="px-4 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 focus:outline-none"
                                                    >
                                                        Duyệt
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleCancel(job._id, job.recruiterId._id)}
                                                        className="ml-2 px-4 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 focus:outline-none"
                                                    >
                                                        Hủy
                                                    </Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>Không có công việc nào cần xét duyệt!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingApprovals;
