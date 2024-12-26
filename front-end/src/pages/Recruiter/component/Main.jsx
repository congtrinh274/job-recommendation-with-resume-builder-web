import { useSelector } from 'react-redux';

const Main = ({ activeItem, setActiveItem }) => {
    const { data: recruiterData } = useSelector((state) => state.recruiter);

    return (
        <div>
            {recruiterData?.level === 1 && (
                <div
                    className="text-red-500 font-medium underline cursor-pointer"
                    onClick={() => setActiveItem('personal')}
                >
                    Cần hoàn thành thông tin Nhà Tuyển Dụng trước khi được phép đăng tin tuyển dụng!
                </div>
            )}
        </div>
    );
};

export default Main;
