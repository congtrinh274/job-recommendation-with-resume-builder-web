import { Button } from '@/components/ui/button';
import PersonalDetailForm from './forms/PersonalDetailForm';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';
import SummeryForm from './forms/SummeryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import { useNavigate, useParams } from 'react-router-dom';

const FormSection = () => {
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(true);
    const { cvId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (activeFormIndex === 6) {
            navigate('/resume-preview/' + cvId);
        }
    }, [activeFormIndex, navigate, cvId]);
    return (
        <div id="no-print">
            <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" className="flex gap-2">
                    <LayoutGrid /> Màu chủ đề
                </Button>
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
                        Tiếp <ArrowRight />
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
