import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCV } from '@/redux/features/candidateSlice';
import { toast } from 'react-toastify';

const Header = ({ resumeTitle, setResumeTitle, cvId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(resumeTitle);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSaveTitle = async () => {
        try {
            setResumeTitle(tempTitle);

            if (!cvId) {
                toast.warning('Không tìm thấy ID của CV!');
                return;
            }

            const updateData = { title: tempTitle };
            await dispatch(updateCV({ cvId, updateData, file: null })).unwrap();

            setIsEditing(false);
        } catch (error) {
            console.error('Lỗi khi cập nhật tiêu đề CV:', error);
            toast.error(error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveTitle();
        }
    };

    const handleDownloadPDF = async () => {
        const resumeUrl = `http://localhost:5173/resume-download-pdf/${cvId}`;

        const printWindow = window.open(resumeUrl, '_blank', 'width=800,height=600');

        setTimeout(
            (printWindow.onload = () => {
                printWindow.print();
                printWindow.onafterprint = () => {
                    printWindow.close();
                };
            }),
            1000,
        );
    };

    const handleGetCVPreview = async () => {
        navigate('/resume-preview/' + cvId);
    };

    return (
        <>
            <header id="no-print" className="flex justify-between items-center border-b rounded-lg p-4 ml-4 mr-4 mt-4">
                <div>
                    {isEditing ? (
                        <input
                            type="text"
                            value={tempTitle}
                            onChange={(e) => setTempTitle(e.target.value)}
                            onBlur={handleSaveTitle}
                            onKeyDown={handleKeyPress}
                            className="text-xl font-bold text-black border rounded px-2 py-1"
                            autoFocus
                        />
                    ) : (
                        <h1 onClick={() => setIsEditing(true)} className="text-xl font-bold text-white cursor-pointer">
                            {resumeTitle || 'Nhập tên hồ sơ'}
                        </h1>
                    )}
                </div>
                <div className="flex justify-between items-center rounded-lg">
                    <button
                        onClick={handleGetCVPreview}
                        className="flex items-center text-white bg-blue-400 px-4 py-1 rounded-lg hover:bg-red-600 mr-4"
                    >
                        Xem trước
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center text-white bg-green-400 px-4 py-1 rounded-lg hover:bg-red-600 mr-4"
                    >
                        Tải PDF
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-white bg-red-500 px-2 py-2 rounded-lg hover:bg-red-600"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="ml-1 mr-1" />
                    </button>
                </div>
            </header>
        </>
    );
};

Header.propTypes = {
    resumeTitle: PropTypes.string,
    setResumeTitle: PropTypes.func.isRequired,
    cvId: PropTypes.string,
};

export default Header;
