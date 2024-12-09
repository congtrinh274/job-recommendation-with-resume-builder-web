import { useState } from 'react';
import './App.css';
import Header from './components/custom/Header';
import { Outlet } from 'react-router-dom';

function App() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="relative">
            <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src="/2611250-uhd_3840_2160_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10">
                {isLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-300"></div>
                    </div>
                )}
                <Header setIsLoading={setIsLoading} />
                <Outlet context={{ isLoading, setIsLoading }} />
            </div>
        </div>
    );
}

export default App;
