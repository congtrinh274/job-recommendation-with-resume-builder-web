import { useState } from 'react';
import Home from './components/Home';
import CandidateProfiles from './components/CandidateProfiles';
import Candidates from './components/Candidates';
import Employers from './components/Employers';
import PendingApprovals from './components/PendingApprovals';
import JobList from './components/JobList';
import Sidebar from './components/SideBar';

function AdminHome() {
    const [activeComponent, setActiveComponent] = useState('home');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'home':
                return <Home />;
            case 'candidateProfiles':
                return <CandidateProfiles />;
            case 'candidates':
                return <Candidates />;
            case 'employers':
                return <Employers />;
            case 'pendingApprovals':
                return <PendingApprovals />;
            case 'jobList':
                return <JobList />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="min-h-screen flex pt-24 p-8">
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="flex-1 p-6 bg-gray-100 ">{renderComponent()}</div>
        </div>
    );
}

export default AdminHome;
