import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useContext } from 'react';
import PersonalDetailPreview from './sectionsPreview/PersonalDetailPreview';
import SummaryPreview from './sectionsPreview/SummaryPreview';
import ExperiencePreview from './sectionsPreview/ExperiencePreview';
import EducationPreview from './sectionsPreview/EducationPreview';
import SkillPreview from './sectionsPreview/SkillPreview';

const ResumePreview = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    return (
        <div
            className="shadow-lg h-full bg-white p-14 border-t-[20px] bg-gray-500"
            style={{ borderColor: resumeInfo?.themeColor }}
        >
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            <SummaryPreview resumeInfo={resumeInfo} />
            <ExperiencePreview resumeInfo={resumeInfo} />
            <EducationPreview resumeInfo={resumeInfo} />
            <SkillPreview resumeInfo={resumeInfo} />
        </div>
    );
};

export default ResumePreview;
