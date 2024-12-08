// FileUpload.js
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const FileUpload = ({ title = 'Kéo & Thả Tệp', btnName, btnHandle, acceptFileTypes = '.pdf', onFileUpload }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            if (onFileUpload) {
                onFileUpload(file);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
            if (onFileUpload) {
                onFileUpload(file);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6" onDragOver={handleDragOver} onDrop={handleDrop}>
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
                onClick={btnHandle}
                className="w-full mt-4 bg-purple-500 text-white rounded-lg py-2 px-6 transition hover:bg-purple-600"
            >
                {btnName}
            </button>
        </div>
    );
};

export default FileUpload;
