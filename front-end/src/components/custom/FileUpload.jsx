import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const FileUpload = ({ title = 'Kéo & Thả Tệp', btnName, acceptFileTypes = '.pdf', redirectPath }) => {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setIsLoading } = useOutletContext();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            setFile(selectedFile);
            setErrorMessage('');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFileName(droppedFile.name);
            setFile(droppedFile);
            setErrorMessage('');
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            setErrorMessage('Vui lòng chọn một tệp để tải lên.');
            return;
        }

        if (!file.name.endsWith('.pdf')) {
            setFile(null);
            setErrorMessage('Tệp không đúng định dạng. Vui lòng chọn tệp PDF.');
            return;
        }

        setIsLoading(true);

        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result;
            localStorage.setItem('pdfUrl', base64);
            console.log('File đã được lưu vào localStorage');
        };

        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('file', file);
        console.log(file);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload_cv', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('recommendedJobs', JSON.stringify(data.recommended_jobs));
                navigate(redirectPath);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Có lỗi xảy ra khi tải lên.');
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Không thể kết nối tới server.');
        } finally {
            setIsLoading(false);
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

                {fileName && <p className="mt-2 text-red-500">File: {fileName}</p>}
            </div>

            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

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
