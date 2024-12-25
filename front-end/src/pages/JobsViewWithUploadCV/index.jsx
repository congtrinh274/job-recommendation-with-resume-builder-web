import JobItem from '@/components/custom/JobItem';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const JobsViewWithUploadCV = () => {
    const [numPages, setNumPages] = useState(0);
    const [jobs, setJobs] = useState([]);
    const [base64Pdf, setBase64Pdf] = useState(null);
    const [title, setTitle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem('candidateRecommendedJobsData');

        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setJobs(parsedData.recommendedJobs);
                setBase64Pdf(parsedData.uploadedCVBase64);
                setTitle(parsedData.uploadedCVTitle);
            } catch (error) {
                console.error('Failed to parse jobs data from localStorage', error);
            }
        }
    }, []);

    return (
        <div className="min-h-screen p-24 text-black">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-white flex-grow text-center ml-14">{title}</h1>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                </button>
            </div>

            <div className="flex justify-between items-start mt-4">
                <div className="w-1/2 border rounded-lg p-4 mr-6">
                    <h2 className="mb-4 text-center text-xl font-bold text-white">Hồ sơ của bạn</h2>

                    {base64Pdf ? (
                        <div style={{ height: '70vh', overflowY: 'auto' }}>
                            <Document
                                file={base64Pdf}
                                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                onLoadError={(error) => console.error('PDF Loading Error:', error)}
                            >
                                {Array.from({ length: numPages }, (_, idx) => (
                                    <div key={`page_${idx + 1}`} className="pdf-page">
                                        <Page
                                            pageNumber={idx + 1}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                        />
                                    </div>
                                ))}
                            </Document>
                        </div>
                    ) : (
                        <p>Không tìm thấy file PDF nào để hiển thị.</p>
                    )}
                </div>

                {/* Công việc phù hợp */}
                <div className="w-1/2 ml-4 p-4 border rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-center text-white">Công việc phù hợp</h2>

                    <div style={{ height: '70vh', overflowY: 'auto', paddingRight: '4px' }}>
                        {jobs.length > 0 ? (
                            jobs.map((job, index) => <JobItem key={index} job={job} />)
                        ) : (
                            <p className="text-center">Không có công việc nào được đề xuất.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsViewWithUploadCV;
