import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Sidebar from './components/Sidebar';
import CVPreview from './components/CVPreview';

const ResumeEditor = () => {
    const location = useLocation();
    const [resumeTitle, setResumeTitle] = useState(location.state?.resumeTitle);
    const [language, setLanguage] = useState('🇻🇳');
    const [font, setFont] = useState('Roboto');
    const [themeColor, setThemeColor] = useState('#ff0000');
    const [spacing, setSpacing] = useState('1');
    const [currentView, setCurrentView] = useState('Đổi mẫu CV');

    const mockSections = [
        { title: 'Education', content: 'University of Example, Bachelor of IT (2015-2019)', height: 100 },
        { title: 'Skills', content: 'JavaScript, React, Node.js, Python', height: 100 },
        { title: 'Experience', content: 'Software Engineer at ExampleCorp (2020-2023)', height: 100 },
        { title: 'Projects', content: 'Developed AI-based CV recommendation system.', height: 100 },
        { title: 'Education', content: 'University of Example, Bachelor of IT (2015-2019)', height: 100 },
        { title: 'Skills', content: 'JavaScript, React, Node.js, Python', height: 100 },
        { title: 'Experience', content: 'Software Engineer at ExampleCorp (2020-2023)', height: 100 },
        { title: 'Projects', content: 'Developed AI-based CV recommendation system.', height: 100 },
        { title: 'Education', content: 'University of Example, Bachelor of IT (2015-2019)', height: 100 },
        { title: 'Experience', content: 'Software Engineer at ExampleCorp (2020-2023)', height: 100 },
        { title: 'Experience', content: 'Software Engineer at ExampleCorp (2020-2023)', height: 100 },
        { title: 'Education', content: 'University of Example, Bachelor of IT (2015-2019)', height: 100 },
        { title: 'Skills', content: 'JavaScript, React, Node.js, Python', height: 100 },
        { title: 'Experience', content: 'Software Engineer at ExampleCorp (2020-2023)', height: 100 },
        { title: 'Projects', content: 'Developed AI-based CV recommendation system.', height: 100 },
        { title: 'Education', content: 'University of Example, Bachelor of IT (2015-2019)', height: 100 },
        { title: 'Skills', content: 'JavaScript, React, Node.js, Python', height: 100 },
        { title: 'Experience', content: 'Software Engineer at ExampleCorp (2020-2023)', height: 100 },
        { title: 'Projects', content: 'Developed AI-based CV recommendation system.', height: 100 },
        { title: 'Education', content: 'University of Example, Bachelor of IT (2015-2019)', height: 100 },
        { title: 'Experience', content: 'Software Engineer at ExampleCorp (2020-2023)', height: 100 },
        { title: 'Experience', content: 'Software Engineer at ExampleCorp (2020-2023)', height: 100 },
    ];

    const handleSaveAsPDF = () => {
        console.log(123);
        const resumeContent = document.getElementById('cv-preview');
        const opt = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'LETTER' },
        };

        // Tạo file PDF từ nội dung render trên website
        html2pdf().from(resumeContent).set(opt).save();
    };

    const handleThemeColorChange = (colorHex) => {
        setThemeColor(colorHex);
    };

    const handleViewChange = (view) => {
        console.log('Chọn chế độ:', currentView);
        setCurrentView(view);
    };

    return (
        <div className="min-h-screen pt-12 pb-20">
            <Header resumeTitle={resumeTitle} setResumeTitle={setResumeTitle} onSave={handleSaveAsPDF} />
            <SubHeader
                currentLanguage={language}
                onLanguageChange={setLanguage}
                currentFont={font}
                onFontChange={setFont}
                themeColor={themeColor}
                onThemeColorChange={handleThemeColorChange}
                lineSpacing={spacing}
                onLineSpacingChange={setSpacing}
                onUploadBackground={() => alert('Upload background!')}
                onCustomizeLayout={() => alert('Customize layout!')}
            />
            <div className="flex">
                <Sidebar onChangeView={handleViewChange} />
                <div className="flex-grow flex justify-center">
                    <CVPreview sections={mockSections} />
                </div>
            </div>
        </div>
    );
};

export default ResumeEditor;
