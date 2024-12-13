import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFCVPreview from './PDFCVPreview';

const Header = ({ resumeTitle, setResumeTitle, sections, themeColor, font, spacing }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(resumeTitle);
    const navigate = useNavigate();

    const handleSaveTitle = () => {
        setIsEditing(false);
        setResumeTitle(tempTitle);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveTitle();
        }
    };

    return (
        <header className="flex justify-between items-center border-b rounded-lg p-4 ml-4 mr-4 mt-4">
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
                <button className="flex items-center text-white bg-green-400 px-4 py-1 rounded-lg hover:bg-red-600 mr-4">
                    Xem trước
                </button>
                <PDFDownloadLink
                    document={
                        <PDFCVPreview sections={sections} themeColor={themeColor} font={font} spacing={spacing} />
                    }
                    fileName="cv-preview.pdf"
                    className="flex items-center text-white bg-green-400 px-4 py-1 rounded-lg hover:bg-red-600 mr-4"
                >
                    Lưu và tải
                </PDFDownloadLink>

                <button className="flex items-center text-white bg-purple-400 px-4 py-1 rounded-lg hover:bg-red-600 mr-4">
                    Lưu
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white bg-red-500 px-2 py-2 rounded-lg hover:bg-red-600"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="ml-1 mr-1" />
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    resumeTitle: PropTypes.string,
    setResumeTitle: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default Header;
