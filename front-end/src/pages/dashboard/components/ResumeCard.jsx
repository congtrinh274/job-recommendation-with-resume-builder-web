import { useState } from 'react';
import PropTypes from 'prop-types';

const ResumeCard = ({ resumeName }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleDownload = () => alert('Download CV');
    const handleEdit = () => alert('Edit CV');
    const handleDelete = () => alert('Delete CV');
    const handleView = () => alert('View CV');

    return (
        <div
            className={`relative  w-64 h-80 rounded-lg overflow-hidden shadow-lg bg-gradient-to-tr from-green-300 to-blue-500 transform transition-all duration-300 border-t-4 border-red-500  ${
                isHovered ? 'hover-card scale-105' : 'scale-100'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src="./null.png"
                alt="User CV"
                className="absolute top-1/2 left-1/2 w-24 h-24 object-cover rounded-full transform -translate-x-1/2 -translate-y-1/2 "
            />

            {isHovered && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="grid grid-cols-2 gap-4 animate-spread">
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-blue-600"
                        >
                            Download
                        </button>
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-green-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            onClick={handleView}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-yellow-600"
                        >
                            View
                        </button>
                    </div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white py-2 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="px-2 truncate max-w-full">{resumeName}</span>
            </div>
        </div>
    );
};

ResumeCard.propTypes = {
    resumeName: PropTypes.string,
};

export default ResumeCard;
