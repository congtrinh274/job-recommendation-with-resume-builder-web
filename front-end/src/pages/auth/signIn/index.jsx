const SignInPage = () => {
    return (
        <div className="flex justify-center items-center  py-10">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden flex">
                {/* Left Panel */}
                <div className="w-1/2 bg-blue-400 p-8">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        Your <span className="text-yellow-600">Learning</span> Journey Starts Here
                    </h1>
                    <p className="text-white mb-6">Login to access</p>
                    <img
                        src="/vecteezy_3d-cute-astronaut-isolated_47307951.png"
                        alt="Illustration"
                        className="w-full"
                    />
                </div>

                {/* Right Panel */}
                <div className="w-1/2 bg-blue-50 p-8">
                    <h2 className="text-xl font-semibold text-blue-800 mb-6">Login</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center text-gray-600">Or login with</div>
                    <div className="flex justify-between mt-4">
                        <button className="w-1/3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 mx-1">
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
                        <span className="text-gray-600">Don’t have an account? </span>
                        <a href="#" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
