import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Sidebar from './components/Sidebar';
import CVPreview from './components/CVPreview';
import { Font } from '@react-pdf/renderer';

import RobotoFont from '../../assets/fonts/Roboto/Roboto-Regular.ttf';

Font.register({
    family: 'Roboto',
    src: RobotoFont,
});

const ResumeEditor = () => {
    const location = useLocation();
    const [resumeTitle, setResumeTitle] = useState(location.state?.resumeTitle);
    const [language, setLanguage] = useState('🇻🇳');
    const [font, setFont] = useState('Roboto');
    const [themeColor, setThemeColor] = useState('#ff0000');
    const [spacing, setSpacing] = useState('1');
    const [currentView, setCurrentView] = useState('Đổi mẫu CV');

    const sections = [
        { title: 'Kinh nghiệm làm việc', onEdit: () => alert('Edit Kinh nghiệm làm việc') },
        { title: 'Học vấn', onEdit: () => alert('Edit Học vấn') },
        { title: 'Kỹ năng', onEdit: () => alert('Edit Kỹ năng') },
        { title: 'Kinh nghiệm', onEdit: () => alert('Edit Kinh nghiệm làm việc') },
        { title: 'ABCvấn', onEdit: () => alert('Edit Học vấn') },
        { title: 'Kỹaksjajkdnăng', onEdit: () => alert('Edit Kỹ năng') },
        { title: 'Kinh nghiệm làm việc', onEdit: () => alert('Edit Kinh nghiệm làm việc') },
        { title: 'Học vấn', onEdit: () => alert('Edit Học vấn') },
        { title: 'Kỹ năng', onEdit: () => alert('Edit Kỹ năng') },
        { title: 'Kinh nghiệm', onEdit: () => alert('Edit Kinh nghiệm làm việc') },
        { title: 'ABCvấn', onEdit: () => alert('Edit Học vấn') },
        { title: 'Kỹaksjajkdnăng', onEdit: () => alert('Edit Kỹ năng') },
    ];

    const handleThemeColorChange = (colorHex) => {
        setThemeColor(colorHex);
    };

    const handleViewChange = (view) => {
        console.log('Chọn chế độ:', currentView);
        setCurrentView(view);
    };

    return (
        <div className="min-h-screen pt-12 pb-20">
            <Header
                resumeTitle={resumeTitle}
                setResumeTitle={setResumeTitle}
                sections={sections}
                font={font}
                themeColor={themeColor}
                spacing={spacing}
            />
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
                    <CVPreview sections={sections} />
                </div>
            </div>
        </div>
    );
};

export default ResumeEditor;
