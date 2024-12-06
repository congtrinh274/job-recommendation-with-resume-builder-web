import App from '@/App';
import ErrorPage from '@/components/custom/ErrorPage';
import SignInPage from '@/pages/auth/signIn';
import SignInSuccess from '@/pages/auth/signInSuccess';
import Dashboard from '@/pages/dashboard';
import Home from '@/pages/home';
import Resume from '@/pages/resume';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/auth/sign-in',
                element: <SignInPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/login-success/:userId/:loginToken',
                element: <SignInSuccess />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/my-resume/:resumeId/view',
                element: <Resume />,
                errorElement: <ErrorPage />,
            },
        ],
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
]);

export { router };
