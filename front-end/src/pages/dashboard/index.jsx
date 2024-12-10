import AddResumes from './components/AddResumes';
import ResumeCard from './components/ResumeCard';

function Dashboard() {
    return (
        <div className="min-h-screen pt-24 md:px-20 lg:px-32">
            <h2 className="font-bold text-3xl text-white">Hồ Sơ Cá Nhân</h2>
            <p className="text-gray-300">Tạo hồ sơ và nhận danh sách công việc phù hợp!</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 mt-8">
                <ResumeCard resumeName="Full Stack Developer" />
                <ResumeCard resumeName="Full Stack Developer" />
                <AddResumes />
            </div>
        </div>
    );
}

export default Dashboard;
