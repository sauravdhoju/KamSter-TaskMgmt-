import React, { useContext } from 'react';
import axios, { AxiosInstance } from 'axios';

type BackendAPIContextType = {
    client: AxiosInstance;
};

const BackendAPIContext = React.createContext<BackendAPIContextType | null>(
    null
);

const BackendAPIProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const client = axios.create({
        baseURL: 'http://localhost:6969/api',
        withCredentials: true,
    });
    return (
        <BackendAPIContext.Provider value={{ client }}>
            {children}
        </BackendAPIContext.Provider>
    );
};

export const useBackendAPIContext = () => {
    const client = useContext(BackendAPIContext);
    if (!client) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return client;
};

export default BackendAPIProvider;
