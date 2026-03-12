import { useState } from 'react';

const SignUpPage = () => {
    const [image, setImage] = useState(null);

    const handleLoginWithGoogle = () => {
        window.open(`${import.meta.env.VITE_API_URL}/api/auth/google`, '_self');
    };

    const handleLoginWithGithub = () => {
        window.open(`${import.meta.env.VITE_API_URL}/api/auth/github`, '_self');
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Đặt ảnh đã tải lên vào state
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Ngăn cản hành động mặc định
    };

    const handleDrop = (event) => {
        event.preventDefault(); // Ngăn cản hành động mặc định
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Đặt ảnh đã tải lên vào state
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center opacity-95 ">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden flex mt-10">
                {/* Left Panel */}
                <div className="w-1/2 bg-blue-400 p-8">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        Tạo <span className="text-blue-800">Hồ sơ</span> Và Tìm Công Việc IT Phù Hợp
                    </h1>
                    <p className="text-white mb-6 font-bold">Đăng ký tài khoản</p>
                    <img
                        src="/vecteezy_3d-cute-astronaut-isolated_47307951.png"
                        alt="Illustration"
                        className="w-full"
                    />
                </div>

                {/* Right Panel */}
                <div className="w-1/2 bg-blue-50 p-8">
                    <h2 className="text-xl font-semibold text-blue-800 mb-4">Đăng Ký</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-1" htmlFor="username">
                                Email
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full border border-gray-300 px-4 py-1 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm mb-1" htmlFor="password">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full border border-gray-300 px-4 py-1 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm mb-1" htmlFor="password">
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full border border-gray-300 px-4 py-1 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-1" htmlFor="avatar">
                                Ảnh đại diện
                            </label>
                            <div className="flex justify-center">
                                <div
                                    className="w-[50%] h-32 border border-gray-300 border-dashed rounded-lg relative flex justify-center items-center cursor-pointer overflow-hidden group"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    {image ? (
                                        <img
                                            src={image}
                                            alt="Avatar"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <span className="text-gray-400">Kéo và thả ảnh hoặc chọn từ máy tính</span>
                                    )}

                                    <div
                                        className="absolute inset-0 bg-white opacity-50 flex justify-center items-center transition-opacity duration-300 group-hover:opacity-70"
                                        style={{ opacity: image ? 0 : 1 }}
                                    >
                                        <span className="text-black text-3xl">+</span>
                                    </div>

                                    <input
                                        type="file"
                                        id="avatar"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleFileUpload}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className=" text-sm w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Đăng ký
                        </button>
                    </form>

                    <div className="mt-6 text-center text-gray-600">Hoặc đăng nhập với</div>
                    <div className="flex justify-between mt-4">
                        <button
                            className="text-sm w-1/2 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 transition duration-200 mx-1"
                            onClick={handleLoginWithGoogle}
                        >
                            Google
                        </button>
                        <button
                            onClick={handleLoginWithGithub}
                            className="text-sm w-1/2 bg-blue-700 text-white py-1 rounded-lg hover:bg-blue-800 transition duration-200 mx-1"
                        >
                            Github
                        </button>
                    </div>
                    <div className="mt-6 text-center">
                        <span className="text-gray-600">Đã có tài khoản? </span>
                        <a href="#" className="text-blue-600 hover:underline">
                            Đăng nhập
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
