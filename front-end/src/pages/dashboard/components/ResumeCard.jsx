import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

const ResumeCard = ({ cvData, img }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const { setIsLoading } = useOutletContext();

    const handleGetRecommended = async (uploadedCV, title) => {
        try {
            // Lấy file từ đường link
            const fileResponse = await axios.get(`${apiBaseUrl}${uploadedCV}`, {
                responseType: 'blob',
            });

            const file = new File([fileResponse.data], 'uploadedCV.pdf', {
                type: 'application/pdf',
            });

            const convertToBase64 = (file) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(file);
                });

            const base64File = await convertToBase64(file);

            setIsLoading(true);

            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://127.0.0.1:5000/upload_cv', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();

                const localStorageData = {
                    recommendedJobs: data.recommended_jobs,
                    uploadedCVBase64: base64File,
                    uploadedCVTitle: title,
                };

                localStorage.setItem('candidateRecommendedJobsData', JSON.stringify(localStorageData));

                navigate('/candidate-jobs-page', { state: { file, title } });
            } else {
                const errorData = await response.json();
                console.error(errorData.error || 'Có lỗi xảy ra khi tải lên.');
            }
        } catch (error) {
            console.error('Lỗi khi xử lý file:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/resume-editor/${cvData._id}`, { state: { data: cvData } });
    };
    const handleDelete = () => alert('Delete CV');
    const handleView = (isOwn, uploadedCV, cvId) => {
        if (!isOwn) {
            const fullURL = uploadedCV.startsWith('http') ? uploadedCV : `${apiBaseUrl}${uploadedCV}`;
            window.open(fullURL, '_blank');
        } else {
            navigate('/resume-preview/' + cvId);
        }
    };

    return (
        <div
            className={`relative w-46 h-60 rounded-lg overflow-hidden shadow-md bg-gradient-to-tr from-purple-300 to-white-300 transform transition-all duration-300 border-t-4 border-red-500 ${
                isHovered ? 'hover-card scale-105' : 'scale-100'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={img}
                alt="User CV"
                className="absolute top-1/2 left-1/2 w-16 h-16 object-cover rounded-full transform -translate-x-1/2 -translate-y-1/2"
            />

            {isHovered && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="grid grid-cols-2 gap-2 animate-spread">
                        <button
                            onClick={() => handleGetRecommended(cvData.uploadedCV, cvData.title)}
                            className="px-2 py-1 text-sm bg-blue-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-blue-600"
                        >
                            Xem đề xuất
                        </button>
                        {cvData.isOwn && (
                            <button
                                onClick={handleEdit}
                                className="px-2 py-1 text-sm bg-green-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-green-600"
                            >
                                Cập nhật
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            className="px-2 py-1 text-sm bg-red-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-red-600"
                        >
                            Xóa
                        </button>
                        <button
                            onClick={() => handleView(cvData.isOwn, cvData.uploadedCV, cvData._id)}
                            className="px-2 py-1 text-sm bg-yellow-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-yellow-600"
                        >
                            Xem & Tải
                        </button>
                    </div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white py-2 flex items-center justify-center text-xs">
                <span className="px-2 truncate max-w-full">{cvData.title}</span>
            </div>
        </div>
    );
};

ResumeCard.propTypes = {
    title: PropTypes.string,
    uploadedCV: PropTypes.string,
    img: PropTypes.string,
    isOwn: PropTypes.bool,
};

export default ResumeCard;
