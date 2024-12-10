import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchUser } from '@/redux/features/userSlice';

const RouteProtector = ({ allowedRoles, children }) => {
    const dispatch = useDispatch();
    const { isSignedIn } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isSignedIn && !user?.data) {
            dispatch(fetchUser());
        } else {
            setIsLoading(false);
        }
    }, [isSignedIn, dispatch, user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    const userRole = user?.role || user?.data?.role;
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

RouteProtector.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
};

export default RouteProtector;
