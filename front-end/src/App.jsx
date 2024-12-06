import './App.css';
import Header from './components/custom/Header';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div className="relative w-full h-screen">
            <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src="/2611250-uhd_3840_2160_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10">
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

export default App;
