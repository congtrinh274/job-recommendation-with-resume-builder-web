import { getResumes } from '@/redux/features/managerSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

const Resumes = () => {
    const dispatch = useDispatch();
    const { resumes } = useSelector((state) => state.manager);
    console.log(resumes);

    useEffect(() => {
        dispatch(getResumes());
    }, [dispatch]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Resumes</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">ID ứng viên</th>
                            <th className="border border-gray-300 px-4 py-2">Tên hồ sơ</th>
                            <th className="border border-gray-300 px-4 py-2 ">Loại CV</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumes?.length > 0 ? (
                            resumes.map((resume) => (
                                <tr key={resume.id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{resume._id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{resume.candidateId._id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{resume.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {resume.isOwn ? 'Đã tạo' : 'Tải lên'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 flex justify-center">
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600"
                                                onClick={() => handleView(resume)}
                                            >
                                                Xem
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4">
                                    Không có hồ sơ nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    function handleView(resume) {
        if (!resume.isOwn) {
            const fullURL = resume.uploadedCV.startsWith('http')
                ? resume.uploadedCV
                : `${apiBaseUrl}${resume.uploadedCV}`;
            window.open(fullURL, '_blank');
        } else {
            const fullURL = `http://localhost:5173/resume-preview/${resume._id}`;
            window.open(fullURL, '_blank');
        }
    }
};

export default Resumes;
