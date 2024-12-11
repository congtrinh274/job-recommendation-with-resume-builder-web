import { useState } from 'react';
import PropTypes from 'prop-types';

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

const ResumeCard = ({ title, uploadedCV }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleDownload = () => alert('Download CV');
    const handleEdit = () => alert('Edit CV');
    const handleDelete = () => alert('Delete CV');
    const handleView = (uploadedCV) => {
        if (uploadedCV) {
            const fullURL = uploadedCV.startsWith('http') ? uploadedCV : `${apiBaseUrl}${uploadedCV}`;
            window.open(fullURL, '_blank');
        } else {
            alert('Link không tồn tại');
        }
    };

    return (
        <div
            className={`relative w-46 h-60 rounded-lg overflow-hidden shadow-md bg-gradient-to-tr from-green-300 to-blue-500 transform transition-all duration-300 border-t-4 border-red-500 ${
                isHovered ? 'hover-card scale-105' : 'scale-100'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src="./null.png"
                alt="User CV"
                className="absolute top-1/2 left-1/2 w-16 h-16 object-cover rounded-full transform -translate-x-1/2 -translate-y-1/2"
            />

            {isHovered && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="grid grid-cols-2 gap-2 animate-spread">
                        <button
                            onClick={handleDownload}
                            className="px-2 py-1 text-sm bg-blue-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-blue-600"
                        >
                            Xem đề xuất
                        </button>
                        <button
                            onClick={handleEdit}
                            className="px-2 py-1 text-sm bg-green-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-green-600"
                        >
                            Cập nhật
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-2 py-1 text-sm bg-red-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-red-600"
                        >
                            Xóa
                        </button>
                        <button
                            onClick={() => handleView(uploadedCV)}
                            className="px-2 py-1 text-sm bg-yellow-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-yellow-600"
                        >
                            Xem & Tải
                        </button>
                    </div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white py-2 flex items-center justify-center text-xs">
                <span className="px-2 truncate max-w-full">{title}</span>
            </div>
        </div>
    );
};

ResumeCard.propTypes = {
    title: PropTypes.string,
    uploadedCV: PropTypes.string,
};

export default ResumeCard;
