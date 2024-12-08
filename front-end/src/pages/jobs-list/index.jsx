import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const JobsList = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        const storedPdf = localStorage.getItem('pdfUrl');
        if (storedPdf) {
            setPdfUrl(storedPdf);
        }
    }, []);

    return (
        <div className="min-h-screen flex justify-center items-start p-24 text-black">
            <div className="w-3/5 border rounded-lg p-4">
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

            <div className="w-1/2 ml-4 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-center text-white">Công việc phù hợp</h2>

                <ul>
                    {['Frontend Dev - Google', 'Backend Engineer - Amazon', 'AI Specialist - OpenAI'].map(
                        (job, idx) => (
                            <li key={idx} className="mb-2 rounded-lg bg-white p-3 shadow mt-1">
                                {job}
                            </li>
                        ),
                    )}
                </ul>
            </div>
        </div>
    );
};

export default JobsList;
