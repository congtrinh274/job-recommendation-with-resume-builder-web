import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <img src="/404-error-3060993_1280.png" alt="Error illustration" className="w-80 h-auto mb-8" />
            <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-600 mb-6">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500">
                <i>{error?.statusText || error?.message}</i>
            </p>
            <a
                href="/"
                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
                Go Back to Home
            </a>
        </div>
    );
};

export default ErrorPage;
