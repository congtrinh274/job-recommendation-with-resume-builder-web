import { useDispatch, useSelector } from 'react-redux';
import ResumeCard from './components/ResumeCard';
import { useEffect } from 'react';
import { fetCandidate } from '@/redux/features/candidateSlice';
import CreateResume from './components/CreateResumes';
import UploadResume from './components/UploadResume';

function Dashboard() {
    const dispatch = useDispatch();
    const { isSignedIn } = useSelector((state) => state.auth);
    const { data: candidateData } = useSelector((state) => state.candidate);
    console.log(candidateData);

    useEffect(() => {
        if (isSignedIn && !candidateData) {
            dispatch(fetCandidate());
        }
    }, [dispatch, isSignedIn, candidateData]);

    const ownCVs = candidateData?.cvs?.filter((cv) => cv.isOwn) || [];
    const uploadedCVs = candidateData?.cvs?.filter((cv) => !cv.isOwn) || [];

    return (
        <div className="min-h-screen pt-24 md:px-20 lg:px-32 pb-20">
            <h2 className="font-bold text-3xl text-white">Hồ Sơ Cá Nhân</h2>
            <p className="text-gray-300">Tạo hồ sơ và nhận danh sách công việc phù hợp!</p>

            <div className="mt-12">
                <h3 className="font-semibold text-2xl text-gray-200">Hồ Sơ Đã Tạo</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-4">
                    {ownCVs.map((cv, index) => (
                        <ResumeCard key={index} cvData={cv} img="./resume-icon1.png" />
                    ))}
                    <CreateResume />
                </div>
            </div>

            <div className="mt-12 ">
                <h3 className="font-semibold text-2xl text-gray-200">Hồ Sơ Đã Tải Lên</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-4">
                    {uploadedCVs.map((cv, index) => (
                        <ResumeCard key={index} cvData={cv} img="./resume-icon2.png" />
                    ))}
                    <UploadResume />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
