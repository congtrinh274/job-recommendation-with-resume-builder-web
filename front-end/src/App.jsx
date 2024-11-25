import { Navigate, Outlet } from 'react-router-dom';
import './App.css';
import { useUser } from '@clerk/clerk-react';

function App() {
    const { user, isLoading, isSignedIn } = useUser();

    if (!isSignedIn && isLoading) {
        return <Navigate to={'/auth/sign-in'} />;
    }
    return (
        <>
            <Outlet />
        </>
    );
}

export default App;
