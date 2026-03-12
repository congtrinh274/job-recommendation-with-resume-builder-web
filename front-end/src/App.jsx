import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/custom/Header';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUser } from './redux/features/userSlice';
import Footer from './components/custom/Footer';

function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { isSignedIn } = useSelector((state) => state.auth);
    const { data: userData } = useSelector((state) => state.user);

    useEffect(() => {
        if (isSignedIn && !userData) {
            dispatch(fetchUser());
        }
    }, [dispatch, isSignedIn, userData]);

    return (
        <>
            <div className="relative">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
                    style={{
                        backgroundImage: 'url(/10016491_27230.jpg)',
                    }}
                ></div>

                <div className="relative z-10">
                    {isLoading && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-300"></div>
                        </div>
                    )}
                    <Header setIsLoading={setIsLoading} />
                    <Outlet context={{ isLoading, setIsLoading }} />
                    <Footer />
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default App;
