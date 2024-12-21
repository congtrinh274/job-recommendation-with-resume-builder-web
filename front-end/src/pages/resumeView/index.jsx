import { Button } from '@/components/ui/button';
import ResumePreview from '../resumeEditor/components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCVById } from '@/redux/features/candidateSlice';
import Header from '@/components/custom/Header';

const ResumeView = () => {
    const [resumeInfo, setResumeInfo] = useState();
    const { currentCV } = useSelector((state) => state.candidate);
    console.log(currentCV);

    const dispatch = useDispatch();
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

    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print" className="pt-12">
                <div className="my-10 mx-10 md:mx-20 lg:mx-36 ">
                    <h2 className="text-center font-medium text-xl">CV đã sẵn sàng để tải xuống!</h2>
                    <div className="flex justify-center mt-5 mb-10">
                        <Button onClick={handleDownloadPDF}>Tải PDF</Button>
                    </div>
                </div>
            </div>
            <div id="print-area">
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    );
};

export default ResumeView;
