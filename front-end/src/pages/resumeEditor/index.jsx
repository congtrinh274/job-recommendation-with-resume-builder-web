import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './components/Header';
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';

const ResumeEditor = () => {
    const location = useLocation();
    const [resumeTitle, setResumeTitle] = useState(location.state?.data?.title);
    const [resumeInfo, setResumeInfo] = useState();

    useEffect(() => {
        setResumeInfo(dummy);
    }, []);

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className="min-h-screen pt-12 pb-20 ">
                <Header resumeTitle={resumeTitle} setResumeTitle={setResumeTitle} />
                <div className="grid grid-col-1 md:grid-cols-2 p-10 gap-10">
                    <FormSection />

                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
};

export default ResumeEditor;
