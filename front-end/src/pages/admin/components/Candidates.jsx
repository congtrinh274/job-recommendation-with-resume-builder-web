import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidates } from '@/redux/features/managerSlice';
import { Button } from '@/components/ui/button';

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

const Candidates = () => {
    const dispatch = useDispatch();
    const { candidates } = useSelector((state) => state.manager);
    const [modalData, setModalData] = useState(null);
    const [mailModalData, setMailModalData] = useState(null);
    const [mailContent, setMailContent] = useState('');

    useEffect(() => {
        dispatch(getCandidates());
    }, [dispatch]);

    const handleViewCVs = (candidate) => {
        setModalData(candidate);
    };

    const handleOpenMailModal = (candidate) => {
        setMailModalData(candidate);
    };

    const handleSendMail = () => {
        if (mailModalData && mailContent.trim() !== '') {
            console.log(`Gửi mail tới: ${mailModalData.userId.email}`);
            console.log(`Nội dung thư: ${mailContent}`);
            // Thực hiện logic gửi mail ở đây
            setMailContent('');
            setMailModalData(null); // Đóng modal
        } else {
            alert('Vui lòng nhập nội dung thư.');
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
                        <th className="border border-gray-300 px-4 py-2">Số lượng hồ sơ</th>
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
                                <div className="flex gap-2 items-center justify-center ml-4">
                                    <div className="flex gap-2 items-center justify-center ml-4">
                                        <Button
                                            onClick={() => handleViewCVs(candidate)}
                                            className="text-xs p-1"
                                        >{`Xem (${candidate?.cvs?.length})`}</Button>
                                    </div>
                                </div>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 flex justify-center">
                                <div className="flex gap-2 items-center justify-center">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                        onClick={() => handleOpenMailModal(candidate)}
                                    >
                                        Gửi mail
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal hiển thị thông tin CV */}
            {modalData && (
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
            )}

            {/* Modal gửi mail */}
            {mailModalData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="flex bg-white rounded p-6 w-1/3 flex-col">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            Gửi mail tới: {mailModalData.userId?.email}
                        </h2>
                        <textarea
                            className="w-full h-32 border border-gray-300 rounded p-2 mb-4"
                            placeholder="Nhập nội dung thư..."
                            value={mailContent}
                            onChange={(e) => setMailContent(e.target.value)}
                        ></textarea>
                        <div className="flex gap-2 justify-end">
                            <button
                                className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                                onClick={() => setMailModalData(null)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                onClick={handleSendMail}
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Candidates;
