import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '@/redux/features/authSlice';

const Header = () => {
    const { isSignedIn } = useSelector((state) => state.auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsDropdownOpen(false);
    };

    return (
        <div className="p-4 px-6 flex justify-between items-center text-white">
            {/* Logo */}
            <Link to={'/'} className="font-bold text-2xl flex items-center text-white">
                <img src="/logo.svg" width={40} height={40} alt="Logo" />
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

            {/* Nút Sign In hoặc Free Trial */}
            {isSignedIn ? (
                <div className="relative">
                    <div
                        onClick={toggleDropdown}
                        className="ml-4 rounded-full cursor-pointer overflow-hidden w-10 h-10"
                    >
                        <img src={'/default-avatar.png'} alt="User" className="object-cover w-full h-full" />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden ">
                            <Link to="/dashboard" className="text-white">
                                <div
                                    className="p-2 hover:bg-blue-500 hover:text-yellow-300 cursor-pointer transition-all rounded"
                                    onClick={() => console.log('Dashboard')}
                                >
                                    Dashboard
                                </div>
                            </Link>
                            <div
                                className="p-2 hover:bg-blue-500 hover:text-yellow-300 cursor-pointer transition-all rounded"
                                onClick={() => console.log('Profile')}
                            >
                                My Profile
                            </div>
                            <div
                                className="p-2 hover:bg-blue-500 hover:text-yellow-300 cursor-pointer transition-all rounded"
                                onClick={handleLogout}
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/auth/sign-in">
                    <Button className="rounded bg-red-500 text-white px-4 py-2 transition-transform hover:scale-105">
                        Khám phá
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default Header;
