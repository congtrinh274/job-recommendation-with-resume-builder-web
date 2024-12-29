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
            <div className="overflow-x-auto">
                <table className="table-fixed w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
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
                                <th key={index} className="border border-gray-300 px-4 py-2 w-[10%] text-xs">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-600">
                        {recruiters?.map((recruiter, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 whitespace-normal break-words">
                                    {recruiter?.userId?._id}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 whitespace-normal break-words">
                                    {recruiter?.email}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 whitespace-normal break-words">
                                    {recruiter?.fullName}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 whitespace-normal break-words">
                                    {recruiter?.companyName}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 whitespace-normal break-words">
                                    {recruiter?.taxCode}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 whitespace-normal break-words">
                                    {`${recruiter?.district}, ${recruiter?.province}`}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 whitespace-normal break-words">
                                    <a
                                        href={recruiter?.webLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {recruiter?.webLink ? 'Link' : 'N/A'}
                                    </a>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <div className="flex gap-2 items-center justify-center">
                                        {recruiter?.postedJobs?.length}
                                        {recruiter?.postedJobs?.length > 0 && (
                                            <button className="text-blue-500 underline text-sm p-1">Xem</button>
                                        )}
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
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {recruiterState(recruiter)}
                                </td>
                                <td className="border-t border-gray-300 px-4 py-2 flex flex-col justify-center">
                                    {recruiter?.level === 2 && (
                                        <>
                                            <button
                                                className="bg-blue-500  text-white px-2 py-1 rounded hover:bg-blue-600 text-xs mt-5"
                                                onClick={() => handleValidated('TRUE', recruiter?._id)}
                                            >
                                                Duyệt HS
                                            </button>
                                            <button
                                                className="bg-red-500  text-white px-2 py-1 rounded hover:bg-red-600 text-xs mt-5"
                                                onClick={() => handleValidated('CANCELED', recruiter?._id)}
                                            >
                                                Hủy HS
                                            </button>
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
