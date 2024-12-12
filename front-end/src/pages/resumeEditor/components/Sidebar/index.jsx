import { useState } from 'react';
import CVTemplate from './components/CVTemplate';
import AddSection from './components/AddSection';
import JobRecommender from './components/JobRecommender';
import GuideNote from './components/GuideNote';

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState(null);

    const menus = [
        { id: 1, title: 'Đổi mẫu CV', icon: '/null.png', content: <CVTemplate /> },
        { id: 2, title: 'Thêm mục', icon: '/null.png', content: <AddSection /> },
        { id: 4, title: 'Hướng dẫn viết CV', icon: '/null.png', content: <GuideNote /> },
        { id: 5, title: 'Việc làm phù hợp', icon: '/null.png', content: <JobRecommender /> },
    ];

    return (
        <div className="flex ml-6 mt-6 overflow-hidden">
            <div className="w-28 flex flex-col space-y-4 pl-2 pr-2">
                {menus.map((menu) => (
                    <button
                        key={menu.id}
                        onClick={() => setActiveMenu(menu.id === activeMenu ? null : menu.id)}
                        className={`flex flex-col items-center p-2 transition-all h-20 ${
                            activeMenu === menu.id ? 'bg-green-100 text-green-700' : 'bg-white text-gray-700'
                        } shadow hover:bg-green-50`}
                    >
                        <span className="text-xl text-center mb-1">
                            <img src={menu.icon} alt={menu.title} className="w-6 h-6 mx-auto" />
                        </span>
                        <span className="text-xs text-center">{menu.title}</span>
                    </button>
                ))}
            </div>

            {menus.map(
                (menu) =>
                    activeMenu === menu.id && (
                        <div
                            key={menu.id}
                            className="max-h-[370px] w-[320px] pl-2 pt-2 pb-2 border rounded-lg shadow bg-green-50 text-green-700 flex flex-col "
                        >
                            <h2>{menu.title}</h2>
                            {menu.content}
                        </div>
                    ),
            )}
        </div>
    );
};

export default Sidebar;
