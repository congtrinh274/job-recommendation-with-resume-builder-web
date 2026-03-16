import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { logout } from '@/redux/features/authSlice';
import { clearUserData } from '@/redux/features/userSlice';
import { Button } from '@/components/ui/button';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import { fetRecruiter } from '@/redux/features/recruiterSlice';
const Header = ({ setIsLoading }) => {
    const { isSignedIn } = useSelector((state) => state.auth);
    const { data: userData } = useSelector((state) => state.user);
    const { data: recruiterData } = useSelector((state) => state.recruiter);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState(recruiterData?.notifications || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(notifications);
    // console.log(recruiterData);

    useEffect(() => {
        if (recruiterData?.notifications) {
            dispatch(fetRecruiter);
            setNotifications(recruiterData.notifications);
        }
    }, [recruiterData]);

    useEffect(() => {
        if (userData?._id) {
            const socket = io(`${import.meta.env.VITE_API_URL}`);

            socket.emit('register', userData._id);

            socket.on('notification', (data) => {
                console.log(data);
                setNotifications((prev) => [data?.notificationItem, ...prev]);
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [userData]);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    const toggleModal = () => setIsModalOpen((prev) => !prev);

    const handleLogout = async () => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(logout());
            dispatch(clearUserData());
            setIsLoading(false);
        }, 1000);
        navigate('/');
    };

    const getColorByType = (type) => {
        switch (type) {
            case 'POST_APPROVAL':
                return 'bg-green-100 text-green-800';
            case 'RESUME_APPROVAL':
                return 'bg-blue-100 text-blue-800';
            case 'APPLICATION':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div
            id="no-print"
            className="fixed top-0 left-0 w-full p-4 px-6 flex justify-between items-center z-50 shadow-md"
        >
            <Link to={'/'} className="font-bold text-2xl flex items-center text-white">
                <img src="/logo.svg" width={32} height={32} alt="Logo" />
                <span className="ml-2">SMART CV</span>
            </Link>

            <h2 className="font-medium text-white text-lg">Trang nhà tuyển dụng</h2>

            <div className="flex gap-3">
                {isSignedIn ? (
                    <div onClick={toggleDropdown} className="relative">
                        <div className="flex items-center">
                            <div className="ml-4 rounded-full cursor-pointer overflow-hidden w-8 h-8 relative">
                                <img
                                    src={userData ? `${userData.imgUrl}` : '/null.png'}
                                    alt="User"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            {userData?.username && (
                                <span className="ml-3 text-white font-medium cursor-pointer select-none relative">
                                    {userData.username}
                                    {notifications.length > 0 && (
                                        <div className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {notifications.length}
                                        </div>
                                    )}
                                </span>
                            )}
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden bg-black text-white">
                                {userData?.role === 'ADMIN' && (
                                    <Link
                                        to="/admin"
                                        className="block p-2 hover:bg-blue-200 hover:text-black text-white"
                                    >
                                        Quản lý
                                    </Link>
                                )}
                                <div
                                    className="block p-2 hover:bg-blue-200 hover:text-black cursor-pointer"
                                    onClick={toggleModal}
                                >
                                    Thông báo ({notifications.length})
                                </div>
                                <Link
                                    to="/recruiter-register"
                                    className="block p-2 hover:bg-blue-200 hover:text-black text-white"
                                >
                                    Tài khoản
                                </Link>
                                <div
                                    className="block p-2 hover:bg-blue-200 hover:text-black cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/auth/sign-in">
                        <Button className="rounded bg-red-500 text-white px-4 py-2 transition-transform hover:scale-105">
                            Bắt đầu
                        </Button>
                    </Link>
                )}
            </div>

            {isModalOpen &&
                ReactDOM.createPortal(
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-120 max-h-[80vh] overflow-hidden flex flex-col">
                            <h2 className="text-lg font-bold mb-4">Thông báo</h2>
                            <div className="flex-1 overflow-y-auto">
                                <ul className="space-y-2 list-none">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className={`p-4 rounded shadow ${getColorByType(
                                                        notification?.type,
                                                    )}`}
                                                >
                                                    <h3 className="font-bold">{notification?.title}</h3>
                                                    <p>{notification?.message}</p>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li>Không có thông báo nào.</li>
                                    )}
                                </ul>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={toggleModal}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
};

export default Header;
