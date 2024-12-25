import { Button } from '@/components/ui/button';
import PersonalDetailForm from './forms/PersonalDetailForm';
import { ArrowLeft, ArrowRight, LanguagesIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import SummeryForm from './forms/SummeryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import { useNavigate, useParams } from 'react-router-dom';
import ThemeColor from './forms/ThemColor';
import { useDispatch } from 'react-redux';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { updateCV } from '@/redux/features/candidateSlice';

const FormSection = () => {
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(true);
    const [language, setLanguage] = useState('en');
    const { cvId } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const handleToggleLanguage = async () => {
        const newLanguage = language === 'en' ? 'vi' : 'en';

        try {
            setLanguage(newLanguage);
            setResumeInfo((prevResumeInfo) => ({
                ...prevResumeInfo,
                language: newLanguage,
            }));

            const updateData = { language: newLanguage };
            dispatch(updateCV({ cvId, updateData }));
        } catch (error) {
            console.error('Error updating language:', error);
        }
    };

    useEffect(() => {
        if (activeFormIndex === 6) {
            navigate('/resume-preview/' + cvId);
        }
    }, [activeFormIndex, navigate, cvId]);
    return (
        <div id="no-print">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <ThemeColor />
                    <Button size="sm" onClick={handleToggleLanguage}>
                        <LanguagesIcon />
                        {language === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh'}
                    </Button>
                </div>
                <div className="flex gap-2">
                    {activeFormIndex > 1 && (
                        <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
                            <ArrowLeft />
                        </Button>
                    )}
                    <Button
                        className="flex gap-2"
                        size="sm"
                        disabled={!enableNext}
                        onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                    >
                        {activeFormIndex === 5 ? 'Hoàn thành' : 'Tiếp'} <ArrowRight />
                    </Button>
                </div>
            </div>
            {activeFormIndex === 1 ? (
                <PersonalDetailForm enableNext={(v) => setEnableNext(v)} />
            ) : activeFormIndex === 2 ? (
                <SummeryForm enableNext={(v) => setEnableNext(v)} />
            ) : activeFormIndex === 3 ? (
                <ExperienceForm enableNext={(v) => setEnableNext(v)} />
            ) : activeFormIndex === 4 ? (
                <EducationForm enableNext={(v) => setEnableNext(v)} />
            ) : activeFormIndex === 5 ? (
                <SkillsForm enableNext={(v) => setEnableNext(v)} />
            ) : null}
        </div>
    );
};

export default FormSection;
