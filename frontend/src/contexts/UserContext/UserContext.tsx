import React, { useContext, useState } from 'react';

type UserContextType = {
    user: {
        id: string;
        username: string;
        email: string;
        name: string;
        created_at: Date;
        udpated_at: Date;
    } | null;
    setUser: React.Dispatch<
        React.SetStateAction<{
            id: string;
            username: string;
            email: string;
            name: string;
            created_at: Date;
            udpated_at: Date;
        } | null>
    >;
};

const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<UserContextType['user']>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
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
