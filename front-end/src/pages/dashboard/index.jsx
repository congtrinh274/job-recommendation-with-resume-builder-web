import AddResumes from './components/AddResumes';

function Dashboard() {
    return (
        <div className="p-10 md:px-20 lg:px-32">
            <h2 className="font-bold text-3xl">My Resume</h2>
            <p>Start Creating Your Resume</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5mt-10">
                <AddResumes />
            </div>
        </div>
    );
}

export default Dashboard;
