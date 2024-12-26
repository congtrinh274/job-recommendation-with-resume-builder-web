import { fetRecruiter } from '@/redux/features/recruiterSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './component/Sidebar';
import Main from './component/Main';
import Recruitment from './component/Recruitment';
import PersonalInfo from './component/PersonalInfo';

const RecruiterDashboard = () => {
    const { isSignedIn } = useSelector((state) => state.auth);
    const { data: recruiterData } = useSelector((state) => state.recruiter);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isSignedIn && !recruiterData) {
            dispatch(fetRecruiter());
        }
    });
    const [activeItem, setActiveItem] = useState('Trang chủ');

    const renderContent = () => {
        switch (activeItem) {
            case 'main':
                return <Main activeItem={activeItem} setActiveItem={setActiveItem} />;
            case 'recruitment':
                return <Recruitment />;
            case 'personal':
                return <PersonalInfo />;
            default:
                return <Main />;
        }
    };

    return (
        <div className="flex min-h-screen pt-20">
            <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

            <div className="w-4/5 bg-gray-100 p-6">{renderContent()}</div>
        </div>
    );
};

export default RecruiterDashboard;
