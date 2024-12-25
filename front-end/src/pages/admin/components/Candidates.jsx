import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidates } from '@/redux/features/managerSlice';

const Candidates = () => {
    const dispatch = useDispatch();
    const { candidates } = useSelector((state) => state.manager);
    const [modalData, setModalData] = useState(null);
    useEffect(() => {
        dispatch(getCandidates());
    }, [dispatch]);

    const handleViewCVs = (candidate) => {
        setModalData(candidate);
    };

    const handleAction = (action, candidate) => {
        if (action === 'block') {
            console.log(`Blocking user ${candidate.userId._id}`);
        } else if (action === 'sendMail') {
            console.log(`Sending mail to user ${candidate.userId._id}`);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Danh sách ứng viên</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">User ID</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Tên</th>
                        <th className="border border-gray-300 px-4 py-2">Số lượng CV</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates?.map((candidate) => (
                        <tr key={candidate?.userId?._id}>
                            <td className="border border-gray-300 px-4 py-2">{candidate?.userId?._id}</td>
                            <td className="border border-gray-300 px-4 py-2">{candidate?.userId?.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{candidate?.userId?.username}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <div className="flex gap-2 items-center ml-4">
                                    {candidate?.cvs?.length || 0}
                                    <button
                                        className="text-blue-500 underline"
                                        onClick={() => handleViewCVs(candidate)}
                                    >
                                        Xem
                                    </button>
                                </div>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleAction('block', candidate)}
                                >
                                    Chặn
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    onClick={() => handleAction('sendMail', candidate)}
                                >
                                    Gửi mail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal hiển thị thông tin CV */}
            {modalData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded p-6 w-1/4">
                        <h2 className="text-xl font-bold mb-4">Danh sách CV</h2>
                        <ul className="list-disc list-inside">
                            {modalData.cvs?.map((cv, index) => (
                                <a href={`http://localhost:5173/resume-preview/${cv._id}`} key={index}>
                                    <li>{cv.title}</li>
                                </a>
                            ))}
                        </ul>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => setModalData(null)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Candidates;
