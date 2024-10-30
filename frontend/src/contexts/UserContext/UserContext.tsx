import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useBackendAPIContext } from '../BackendAPIContext/BackendAPIContext';

type UserType = {
    id: string;
    username: string;
    email: string;
    name: string;
    created_at: Date;
    udpated_at: Date;
};

type UserContextType = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    fetchUser: () => {};
};

const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserContextType['user']>(null);
    const { client } = useBackendAPIContext();
    const fetchUser = async () => {
        client
            .get('user')
            .then((res) => {
                setUser(res.data.user);
                navigate('/');
            })
            .catch((err) => {
                console.warn(err);
                // navigate('/login');
            });
    };

    return (
        <UserContext.Provider value={{ user, setUser, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export default UserProvider;
