import JobItem from '@/components/custom/JobItem';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const JobsList = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [jobs, setJobs] = useState([]);
    console.log(jobs);

    const getJobsFromLocalStorage = () => {
        try {
            const jobsData = JSON.parse(localStorage.getItem('recommendedJobs'));
            if (jobsData) {
                setJobs(jobsData);
            }
        } catch (err) {
            console.error(err + 'Failed to parse jobs data from localStorage');
        }
    };

    useEffect(() => {
        const storedPdf = localStorage.getItem('pdfUrl');
        if (storedPdf) {
            setPdfUrl(storedPdf);
            getJobsFromLocalStorage();
        }
    }, []);

    return (
        <div className="min-h-screen flex justify-center items-start p-24 text-black">
            <div className="w-1/2 border rounded-lg p-4">
                <h2 className="mb-4 text-center text-xl font-bold text-white">Hồ sơ của bạn</h2>

                {pdfUrl ? (
                    <div style={{ height: '70vh', overflowY: 'auto' }}>
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                            onLoadError={(error) => console.error('PDF Loading Error:', error)}
                        >
                            {Array.from({ length: numPages }, (_, idx) => (
                                <div key={`page_${idx + 1}`} className="pdf-page">
                                    <Page pageNumber={idx + 1} renderTextLayer={false} renderAnnotationLayer={false} />
                                </div>
                            ))}
                        </Document>
                    </div>
                ) : (
                    <p>Không tìm thấy file PDF nào để hiển thị.</p>
                )}
            </div>

            <div className="w-1/2 ml-4 p-4 xs border rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-center text-white">Công việc phù hợp</h2>
                <div style={{ height: '70vh', overflowY: 'auto', paddingRight: '4px' }}>
                    {jobs.map((job, index) => (
                        <JobItem key={index} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobsList;
