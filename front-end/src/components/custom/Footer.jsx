import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer
            className="text-white py-8 border-t border-gray-500"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            }}
        >
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center">
                    {/* Logo and Brand Name */}
                    <Link to={'/'} className="font-bold text-2xl flex items-center text-white">
                        <img src="/logo.svg" width={24} height={24} alt="Logo" />
                        <span className="ml-2">SMART CV</span>
                    </Link>

                    {/* Links Section */}
                    <div className="flex space-x-8">
                        <a href="#" className="hover:text-green-500">
                            Home
                        </a>
                        <a href="#" className="hover:text-green-500">
                            About Us
                        </a>
                        <a href="#" className="hover:text-green-500">
                            Services
                        </a>
                        <a href="#" className="hover:text-green-500">
                            Contact
                        </a>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-6">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-500"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-500"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-500"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-500"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-4 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
