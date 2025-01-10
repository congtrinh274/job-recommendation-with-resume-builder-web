import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { logout } from '@/redux/features/authSlice';
import { clearUserData } from '@/redux/features/userSlice';
import { fetchCandidate } from '@/redux/features/candidateSlice';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';

// eslint-disable-next-line react/prop-types
const Header = ({ setIsLoading }) => {
    const { isSignedIn } = useSelector((state) => state.auth);
    const { data: userData } = useSelector((state) => state.user);
    const { data: candidateData } = useSelector((state) => state.candidate);
    const [notifications, setNotifications] = useState(candidateData?.notifications || []);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleViewDetail = (notification) => {
        setSelectedNotification(notification);
        setIsDetailModalOpen(true);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
    const toggleModal = () => setIsModalOpen((prev) => !prev);

    useEffect(() => {
        if (candidateData?.notifications) {
            dispatch(fetchCandidate);
            setNotifications(candidateData.notifications);
        }
    }, [candidateData]);

    useEffect(() => {
        if (userData?._id) {
            const socket = io('http://localhost:5000');

            socket.on('connect', () => {
                console.log('WebSocket connected with ID:', socket.id);
            });

            socket.on('connect_error', (error) => {
                console.log('WebSocket connection error:', error);
            });

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

    const handleClickBtn = () => {
        if (isSignedIn) {
            if (userData.role === 'RECRUITER') {
                window.open('/recruiter/dashboard', '_blank');
            } else {
                window.open('/recruiter/register', '_blank');
            }
        } else {
            navigate('/auth/sign-in');
        }
    };

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
            case 'SUCCESS':
                return 'bg-green-100 text-green-800';
            case 'FAILURE':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div
            id="no-print"
            className="fixed top-0 left-0 w-full p-4 px-6 flex justify-between items-center z-50 shadow-md"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            }}
        >
            <Link to={'/'} className="font-bold text-2xl flex items-center text-white">
                <img src="/logo.svg" width={24} height={24} alt="Logo" />
                <span className="ml-2">SMART CV</span>
            </Link>

            <div className="hidden md:flex gap-8 font-semibold">
                <Link to="/plans" className="hover:text-yellow-300 transition-all text-white">
                    Trang chủ
                </Link>
                <Link to="/library" className="hover:text-yellow-300 transition-all text-white">
                    Thông tin
                </Link>
                <Link to="/techdegree" className="hover:text-yellow-300 transition-all text-white">
                    Việc làm mới
                </Link>
            </div>

            <div className="flex gap-3">
                <Button
                    onClick={handleClickBtn}
                    variant="outline"
                    className="rounded bg-blue-500 text-white px-2 py-1 transition-transform hover:scale-105 text-xs"
                >
                    Dành cho nhà tuyển dụng
                </Button>
                {isSignedIn ? (
                    <div onClick={toggleDropdown} className="relative">
                        <div className="flex items-center">
                            <div className="ml-4 rounded-full cursor-pointer overflow-hidden w-8 h-8">
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
                                <Link
                                    to="/dashboard"
                                    className="block p-2 hover:bg-blue-200 hover:text-black text-white"
                                >
                                    Tổng quan
                                </Link>
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
                                        notifications.map((notification, index) => (
                                            <li
                                                key={index}
                                                className={`p-4 rounded shadow ${getColorByType(notification.type)}`}
                                            >
                                                <h3 className="font-bold">{notification.title}</h3>
                                                <p>{notification.message}</p>
                                                {notification.type === 'SUCCESS' && (
                                                    <span
                                                        className="text-sm cursor-pointer underline hover:text-red-500"
                                                        onClick={() => handleViewDetail(notification)}
                                                    >
                                                        Xem chi tiết
                                                    </span>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <li>Không có thông báo nào.</li>
                                    )}
                                </ul>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}

            {isDetailModalOpen &&
                ReactDOM.createPortal(
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-[40%] max-h-[80vh] overflow-hidden flex flex-col">
                            <div className="flex-1 overflow-y-auto">
                                {selectedNotification ? (
                                    <div>
                                        <h3 className="font-bold">{selectedNotification.title}</h3>
                                        <p>{selectedNotification.message}</p>
                                        <div
                                            className="text-sm "
                                            dangerouslySetInnerHTML={{ __html: selectedNotification?.responseLetter }}
                                        />
                                    </div>
                                ) : (
                                    <p>Không có thông tin chi tiết.</p>
                                )}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => setIsDetailModalOpen(false)}
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
