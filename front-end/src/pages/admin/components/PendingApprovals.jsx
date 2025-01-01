import { Button } from '@/components/ui/button';
import { fetchJobs } from '@/redux/features/JobSlice';
import { getRecruiters } from '@/redux/features/managerSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const PendingApprovals = () => {
    const dispatch = useDispatch();
    const { jobs } = useSelector((state) => state.job);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    return (
        <div>
            <div className="p-4 vw">
                <h2 className="text-2xl font-semibold mb-4">Công việc chưa xét duyệt</h2>
                <div className="overflow-x-auto w-full">
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
                            {jobs.map((job, index) => (
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
                                    <td className="px-4 py-2 text-center border border-gray-300 ">
                                        <Button className="px-4 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 focus:outline-none">
                                            Duyệt
                                        </Button>
                                        <Button className="ml-2 px-4 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 focus:outline-none">
                                            Hủy
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PendingApprovals;
