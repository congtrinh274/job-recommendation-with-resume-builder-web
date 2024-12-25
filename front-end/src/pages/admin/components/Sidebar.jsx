import { useState } from 'react';

const Sidebar = ({ activeItem, setActiveItem }) => {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [isJobSubmenuOpen, setIsJobSubmenuOpen] = useState(false);

    return (
        <div className="w-1/5 bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold mb-6 border-b pb-2">Admin Panel</h1>
            <ul className="space-y-4">
                <li
                    className={`cursor-pointer ${activeItem === 'Trang chủ' ? 'font-bold' : ''}`}
                    onClick={() => setActiveItem('Trang chủ')}
                >
                    Trang chủ
                </li>
                <li>
                    <div className="cursor-pointer" onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}>
                        Quản lý Ứng viên
                    </div>
                    {isSubmenuOpen && (
                        <ul className="ml-4 mt-2 space-y-2">
                            <li
                                className={`cursor-pointer ${activeItem === 'Ứng viên' ? 'font-bold' : ''}`}
                                onClick={() => setActiveItem('Ứng viên')}
                            >
                                Ứng viên
                            </li>
                            <li
                                className={`cursor-pointer ${activeItem === 'Hồ sơ' ? 'font-bold' : ''}`}
                                onClick={() => setActiveItem('Hồ sơ')}
                            >
                                Hồ sơ
                            </li>
                        </ul>
                    )}
                </li>
                <li
                    className={`cursor-pointer ${activeItem === 'Quản lý NTD' ? 'font-bold' : ''}`}
                    onClick={() => setActiveItem('Quản lý NTD')}
                >
                    Quản lý NTD
                </li>
                <li>
                    <div className="cursor-pointer" onClick={() => setIsJobSubmenuOpen(!isJobSubmenuOpen)}>
                        Công Việc
                    </div>
                    {isJobSubmenuOpen && (
                        <ul className="ml-4 mt-2 space-y-2">
                            <li
                                className={`cursor-pointer ${activeItem === 'Danh sách công việc' ? 'font-bold' : ''}`}
                                onClick={() => setActiveItem('Danh sách công việc')}
                            >
                                Danh sách công việc
                            </li>
                            <li
                                className={`cursor-pointer ${
                                    activeItem === 'Công việc chờ xét duyệt' ? 'font-bold' : ''
                                }`}
                                onClick={() => setActiveItem('Công việc chờ xét duyệt')}
                            >
                                Công việc chờ xét duyệt
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
