import App from '@/App';
import SignInPage from '@/pages/auth/signIn';
import Dashboard from '@/pages/dashboard';
import Home from '@/pages/home';
import Resume from '@/pages/resume';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        element: <App />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ],
    },
    {
        path: '/auth/sign-in',
        element: <SignInPage />,
    },
    {
        path: '/my-resume/:resumeId/view',
        element: <Resume />,
    },
]);

export { router };
