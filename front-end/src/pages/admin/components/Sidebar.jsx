const Sidebar = ({ setActiveComponent }) => {
    const menuItems = [
        { label: 'Trang chủ', value: 'home' },
        { label: 'Hồ sơ', value: 'candidateProfiles', parent: 'Quản lý ứng viên' },
        { label: 'Ứng viên', value: 'candidates', parent: 'Quản lý ứng viên' },
        { label: 'NTD', value: 'employers', parent: 'Quản lý NTD' },
        { label: 'Danh sách xét duyệt', value: 'pendingApprovals', parent: 'Quản lý NTD' },
        { label: 'Danh sách công việc', value: 'jobList' },
    ];

    return (
        <div className="w-64 h-screen">
            <div className="p-4 text-lg font-bold border-b border-gray-700  text-white">Admin Panel</div>
            <nav className="mt-4 gap-4 flex flex-col pl-2">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <button
                            className="block w-full text-left py-2 px-4 bg-gray-300 hover:bg-gray-700 rounded mt-"
                            onClick={() => setActiveComponent(item.value)}
                        >
                            {item.label}
                        </button>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
