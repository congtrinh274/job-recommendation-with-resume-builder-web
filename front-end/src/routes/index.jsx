'use client';
import App from '@/App';
import ErrorPage from '@/components/custom/ErrorPage';
import SignInPage from '@/pages/auth/signIn';
import SignInSuccess from '@/pages/auth/signInSuccess';
import Dashboard from '@/pages/dashboard';
import Home from '@/pages/home';
import { createBrowserRouter } from 'react-router-dom';
import RouteProtector from '@/utils/RouteProtector';
import GuestsJobsPage from '@/pages/guestsJobs';
import ResumeEditor from '@/pages/resumeEditor';
import ResumeDownloadPDF from '@/pages/resumeDownloadPDF';
import ResumeView from '@/pages/ResumeView';
import JobsViewWithUploadCV from '@/pages/JobsViewWithUploadCV';
import JobViewWithCVData from '@/pages/JobsViewWithCVData';

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
                element: (
                    <RouteProtector allowedRoles={['CANDIDATE']}>
                        <Dashboard />
                    </RouteProtector>
                ),
                errorElement: <ErrorPage />,
            },
            {
                path: '/guests-jobs-page',
                element: <GuestsJobsPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/candidate-jobs-page',
                element: <JobsViewWithUploadCV />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/candidate-jobs-own-page/:cvId',
                element: <JobViewWithCVData />,
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
                path: '/resume-editor/:cvId',
                element: <ResumeEditor />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/resume-preview/:cvId',
                element: <ResumeView />,
                errorElement: <ErrorPage />,
            },
        ],
    },
    {
        path: '/resume-download-pdf/:cvId',
        element: <ResumeDownloadPDF />,
        errorElement: <ErrorPage />,
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
]);

export { router };
