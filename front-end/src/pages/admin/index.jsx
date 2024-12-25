import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Candidates from './components/Candidates';
import Resumes from './components/Resumes';
import Recruiters from './components/Recruiters';
import JobList from './components/JobList';
import PendingApprovals from './components/PendingApprovals';

const AdminHome = () => {
    const [activeItem, setActiveItem] = useState('Trang chủ');

    const renderContent = () => {
        switch (activeItem) {
            case 'Trang chủ':
                return <Home />;
            case 'Ứng viên':
                return <Candidates />;
            case 'Hồ sơ':
                return <Resumes />;
            case 'Quản lý NTD':
                return <Recruiters />;
            case 'Danh sách công việc':
                return <JobList />;
            default:
                return <PendingApprovals />;
        }
    };

    return (
        <div className="flex min-h-screen pt-16">
            {/* Sidebar */}
            <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

            {/* Main Content */}
            <div className="w-4/5 bg-gray-100 p-6">{renderContent()}</div>
        </div>
    );
};

export default AdminHome;
