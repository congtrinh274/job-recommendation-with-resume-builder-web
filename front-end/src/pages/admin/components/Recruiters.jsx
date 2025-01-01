import { Button } from '@/components/ui/button';
import { getRecruiters, recruiterValidated } from '@/redux/features/managerSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

const Recruiters = () => {
    const dispatch = useDispatch();
    const { recruiters } = useSelector((state) => state.manager);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        dispatch(getRecruiters());
    }, [dispatch]);

    const recruiterState = (recruiter) => {
        if (recruiter.level === 1) {
            return 'Thiếu hồ sơ';
        } else if (recruiter.level === 2 && recruiter.validatedState === 'FALSE') {
            return 'Chờ xét duyệt';
        } else if (recruiter.level === 2 && recruiter.validatedState === 'CANCELED') {
            return 'Đã hủy hồ sơ';
        } else {
            return 'Đã xét duyệt';
        }
    };

    const handleValidated = async (validated, recruiterId) => {
        const data = { validated, recruiterId };
        const response = await dispatch(recruiterValidated(data)).unwrap();

        if (response?.success) {
            dispatch(getRecruiters());
        }
    };

    return (
        <div className="p-6" style={{ overflowX: 'auto' }}>
            <h1 className="text-2xl font-bold mb-4">Danh sách nhà tuyển dụng</h1>
            <div className="overflow-x-auto w-full">
                <table className="table-fixed w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 ">
                            {[
                                'User ID',
                                'Email',
                                'Tên NTD',
                                'Tên công ty',
                                'Mã số thuế',
                                'Địa điểm',
                                'Website',
                                'Công việc đã đăng',
                                'Giấy phép',
                                'Trạng thái',
                                'Action',
                            ].map((header, index) => (
                                <th
                                    key={index}
                                    className="w-[200px] px-4 py-2 text-left text-sm font-semibold border border-gray-300"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm ">
                        {recruiters?.map((recruiter, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                    {recruiter?.userId?._id}
                                </td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                    {recruiter?.email}
                                </td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                    {recruiter?.fullName}
                                </td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                    {recruiter?.companyName}
                                </td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                    {recruiter?.taxCode}
                                </td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                    {`${recruiter?.district}, ${recruiter?.province}`}
                                </td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300">
                                    <a
                                        href={recruiter?.webLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {recruiter?.webLink ? 'Link' : 'N/A'}
                                    </a>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 ">
                                    <div className="flex gap-2 items-center justify-center">
                                        <Button className="text-xs p-1">
                                            {`Xem (${recruiter?.postedJobs?.length})`}
                                        </Button>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 whitespace-normal break-words">
                                    <a
                                        href={`${apiBaseUrl}${recruiter?.businessLicense}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {recruiter?.businessLicense ? 'Xem' : 'N/A'}
                                    </a>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{recruiterState(recruiter)}</td>
                                <td className="border-t border-gray-300 px-4 py-1 ">
                                    {recruiter?.level === 2 && (
                                        <>
                                            {recruiter.validatedState !== 'TRUE' && (
                                                <Button
                                                    className="ml-2 w-[40%] px-4 py-2 bg-blue-500 text-white text-xs rounded-lg hover:bg-red-600 focus:outline-none"
                                                    onClick={() => handleValidated('TRUE', recruiter?._id)}
                                                >
                                                    Duyệt HS
                                                </Button>
                                            )}
                                            <Button
                                                className="ml-2 w-[40%] px-4 py-2 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 focus:outline-none"
                                                onClick={() => handleValidated('CANCELED', recruiter?._id)}
                                            >
                                                Hủy HS
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal hiển thị Danh sách công việc */}
            {/* {modalData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="flex bg-white rounded p-6 w-1/4 flex-col">
                        <h2 className="text-xl font-bold mb-4 text-center">Danh sách hồ sơ</h2>
                        <ul className="list-disc list-inside">
                            {modalData.cvs?.map((cv, index) => (
                                <a
                                    key={index}
                                    href={
                                        cv.isOwn
                                            ? `http://localhost:5173/resume-preview/${cv._id}`
                                            : cv.uploadedCV.startsWith('http')
                                            ? cv.uploadedCV
                                            : `${apiBaseUrl}${cv.uploadedCV}`
                                    }
                                    target="_blank"
                                >
                                    <li>{cv.title}</li>
                                </a>
                            ))}
                        </ul>
                        <button
                            className="mt-4 bg-red-500 text-white px-3 py-1 rounded text-sm"
                            onClick={() => setModalData(null)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Recruiters;
