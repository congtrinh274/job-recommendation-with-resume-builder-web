const SignInPage = () => {
    const handleLoginWithGoogle = () => {
        window.open('http://localhost:5000/api/auth/google', '_self');
    };

    return (
        <div className="min-h-screen flex justify-center items-center py-15 opacity-95 ">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden flex">
                {/* Left Panel */}
                <div className="w-1/2 bg-blue-400 p-8">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        Tạo <span className="text-red-500">Hồ sơ</span> Và Tìm Công Việc IT Phù Hợp
                    </h1>
                    <p className="text-white mb-6">Đăng nhập để bắt đầu</p>
                    <img
                        src="/vecteezy_3d-cute-astronaut-isolated_47307951.png"
                        alt="Illustration"
                        className="w-full"
                    />
                </div>

                {/* Right Panel */}
                <div className="w-1/2 bg-blue-50 p-8">
                    <h2 className="text-xl font-semibold text-blue-800 mb-6">Đăng nhập</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-2" htmlFor="username">
                                Email
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-2" htmlFor="password">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Quên mật khẩu?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Đăng nhập
                        </button>
                    </form>

                    <div className="mt-6 text-center text-gray-600">Hoặc đăng nhập với</div>
                    <div className="flex justify-between mt-4">
                        <button
                            className="w-1/3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 mx-1"
                            onClick={handleLoginWithGoogle}
                        >
                            Google
                        </button>
                        <button className="w-1/3 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200 mx-1">
                            Facebook
                        </button>
                        <button className="w-1/3 bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-200 mx-1">
                            LinkedIn
                        </button>
                    </div>
                    <div className="mt-6 text-center">
                        <span className="text-gray-600">Chưa có tài khoản? </span>
                        <a href="#" className="text-blue-600 hover:underline">
                            Đăng ký
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
