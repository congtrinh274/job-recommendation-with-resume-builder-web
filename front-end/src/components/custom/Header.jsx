import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '@/redux/features/authSlice';
import { clearUserData } from '@/redux/features/userSlice';

// eslint-disable-next-line react/prop-types
const Header = ({ setIsLoading }) => {
    const { isSignedIn } = useSelector((state) => state.auth);
    const { data: userData } = useSelector((state) => state.user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
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
                <img src="/logo.svg" width={32} height={32} alt="Logo" />
                <span className="ml-2">AI CLERK</span>
            </Link>

            <div className="hidden md:flex gap-8 font-semibold">
                <Link to="/plans" className="hover:text-yellow-300 transition-all text-white">
                    Plans
                </Link>
                <Link to="/library" className="hover:text-yellow-300 transition-all text-white">
                    Library
                </Link>
                <Link to="/techdegree" className="hover:text-yellow-300 transition-all text-white">
                    Techdegree
                </Link>
                <Link to="/business" className="hover:text-yellow-300 transition-all text-white">
                    For Business
                </Link>
                <Link to="/schools" className="hover:text-yellow-300 transition-all text-white">
                    For Schools
                </Link>
            </div>

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
                            <span className="ml-3 text-white font-medium cursor-pointer select-none">
                                {userData.username}
                            </span>
                        )}
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden bg-black text-white">
                            {userData?.role === 'ADMIN' && (
                                <Link to="/admin" className="block p-2 hover:bg-blue-200 hover:text-black text-white">
                                    Quản lý
                                </Link>
                            )}
                            <Link to="/dashboard" className="block p-2 hover:bg-blue-200 hover:text-black text-white">
                                Tổng quan
                            </Link>
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
    );
};

export default Header;
