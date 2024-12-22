import ResumePreview from '../resumeEditor/components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getCVById } from '@/redux/features/candidateSlice';

const ResumeView = () => {
    const [resumeInfo, setResumeInfo] = useState();
    const { currentCV } = useSelector((state) => state.candidate);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cvId } = useParams();

    useEffect(() => {
        if (cvId) {
            dispatch(getCVById({ cvId }));
        }
    }, [cvId, dispatch]);

    useEffect(() => {
        if (currentCV) {
            setResumeInfo({
                title: currentCV.title,
                skills: currentCV.skills,
                experience: currentCV.experience,
                education: currentCV.education,
                ...currentCV,
            });
        }
    }, [currentCV]);

    const handleDownloadPDF = async () => {
        const resumeUrl = `http://localhost:5173/resume-download-pdf/${cvId}`;

        const printWindow = window.open(resumeUrl, '_blank', 'width=800,height=600');

        setTimeout(
            (printWindow.onload = () => {
                printWindow.print();
                printWindow.onafterprint = () => {};
            }),
            100,
        );
    };
    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className="flex flex-col items-center justify-center min-h-screen pt-20 ">
                <div className="flex justify-between mt-2 w-3/4 max-w-3xl mb-4">
                    <h2 className="text-2xl font-bold mb-2 text-white">Xem và Tải CV</h2>
                    <div>
                        <button
                            className="bg-blue-500 text-white text-sm py-2 px-3 rounded-lg hover:bg-blue-600 mr-4"
                            onClick={handleDownloadPDF}
                        >
                            Tải PDF
                        </button>
                        <button
                            className="bg-gray-200 text-gray-800 text-sm py-2 px-3 rounded-lg hover:bg-gray-300"
                            onClick={() => navigate(-1)}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
                <div className=" w-3/4 max-w-3xl">
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
};

export default ResumeView;
