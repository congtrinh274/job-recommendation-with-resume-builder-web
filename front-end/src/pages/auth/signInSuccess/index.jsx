import { login } from '@/redux/features/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const SignInSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId, loginToken } = useParams();

    useEffect(() => {
        const loginUser = async () => {
            await dispatch(login({ id: userId, loginToken }));
            navigate('/');
        };
        loginUser();
    }, [dispatch, navigate, userId, loginToken]);

    return <div className="min-h-screen flex justify-center items-center py-10 text-white">Processing login...</div>;
};

export default SignInSuccess;
