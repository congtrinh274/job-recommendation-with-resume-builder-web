import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { useState } from 'react';

function Header() {
    const [isSignedIn] = useState(false);

    return (
        <div className="p-2 px-4 flex justify-between shadow-md">
            <Link to={'/dashboard'}>
                <img src="/logo.svg" className="cursor-pointer" width={40} height={40} />
            </Link>
            {isSignedIn ? (
                <div className="flex gap-2 items-center">
                    <Link to={'/dashboard'}>
                        <Button variant="outline">Tổng quan</Button>
                    </Link>
                    <UserButton />
                </div>
            ) : (
                <Link to={'/auth/sign-in'}>
                    <Button>Khám phá</Button>
                </Link>
            )}
        </div>
    );
}

export default Header;
