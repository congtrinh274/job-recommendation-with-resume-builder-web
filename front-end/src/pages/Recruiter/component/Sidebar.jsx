import { useState } from 'react';
import { useSelector } from 'react-redux';

const Sidebar = ({ activeItem, setActiveItem }) => {
    const { data: recruiterData } = useSelector((state) => state.recruiter);
    return (
        <div className="w-1/5 bg-gray-800 text-white p-4 ">
            <div className="pb-6 mb-4 border-b">
                <div className="flex gap-4 items-center">
                    <div
                        className="ml-4 rounded-full cursor-pointer overflow-hidden w-12 h-12"
                        onClick={() => setActiveItem('personal')}
                    >
                        <img
                            src={recruiterData ? `${recruiterData?.userId?.imgUrl}` : '/null.png'}
                            alt="User"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-bold">{recruiterData?.fullName}</div>
                        <div className="text-xs font-medium">Nhà tuyển dụng</div>
                        <div className="text-xs ">
                            Tài khoản xác thực:
                            <span className="text-green-300 text-xs font-bold ml-2">Cấp {recruiterData?.level}/2</span>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="space-y-4">
                <li
                    className={`cursor-pointer ${activeItem === 'main' ? 'font-bold' : ''}`}
                    onClick={() => setActiveItem('main')}
                >
                    Trang chủ
                </li>
                <li
                    className={`cursor-pointer ${activeItem === 'recruitment' ? 'font-bold' : ''}`}
                    onClick={() => setActiveItem('recruitment')}
                >
                    Đăng tuyển
                </li>
                <li
                    className={`cursor-pointer ${activeItem === 'personal' ? 'font-bold' : ''}`}
                    onClick={() => setActiveItem('personal')}
                >
                    Thông tin cá nhân
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
