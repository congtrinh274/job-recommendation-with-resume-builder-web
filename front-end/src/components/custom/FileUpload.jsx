import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const FileUpload = ({ title = 'Kéo & Thả Tệp', btnName, acceptFileTypes = '.pdf', redirectPath }) => {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            setFile(selectedFile);
        }
    };

    const handleSubmit = () => {
        if (!file) {
            alert('Vui lòng chọn một tệp để tải lên.');
            return;
        }

        if (!file.name.endsWith('.pdf')) {
            alert('Tệp không đúng định dạng. Vui lòng chọn tệp PDF.');
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result;
            localStorage.setItem('pdfUrl', base64);
            console.log('File đã được lưu vào localStorage');

            navigate(redirectPath);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            {title && <h2 className="text-center text-xl font-bold mb-4">{title}</h2>}

            <div className="border-dashed border-2 border-purple-500 rounded-lg flex flex-col items-center justify-center py-2">
                <span className="text-black mb-2">Kéo & thả tệp vào đây</span>

                <label
                    htmlFor="fileUpload"
                    className="cursor-pointer bg-purple-500 text-white rounded-lg px-4 py-2 mt-4 transition hover:bg-purple-600"
                >
                    Tải lên từ máy tính
                </label>

                <input
                    id="fileUpload"
                    type="file"
                    accept={acceptFileTypes}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {fileName && <p className="mt-2 text-red-800">File: {fileName}</p>}
            </div>

            <button
                onClick={handleSubmit}
                className="w-full mt-4 bg-purple-500 text-white rounded-lg py-2 px-6 transition hover:bg-purple-600"
            >
                {btnName}
            </button>
        </div>
    );
};

export default FileUpload;
