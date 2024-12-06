import { login } from '@/redux/features/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const SignInSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        const loginUser = async () => {
            await dispatch(login({ id: userId }));
            navigate('/');
        };
        loginUser();
    }, [dispatch, navigate, userId]);

    return <div className="flex justify-center items-center py-10">Processing login...</div>;
};

export default SignInSuccess;
