import { useEffect, useState } from 'react';

import HeaderGreet from '../HeaderGreet/HeaderGreet';
import NavBar from '../NavBar/NavBar';
type HeaderRendererType = {
    isSideBarOpen: boolean;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderRenderer = ({
    isSideBarOpen,
    setIsSideBarOpen,
}: HeaderRendererType) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {width > 512 ? (
                <HeaderGreet />
            ) : (
                <NavBar
                    isSideBarOpen={isSideBarOpen}
                    setIsSideBarOpen={setIsSideBarOpen}
                />
            )}
        </>
    );
};

export default HeaderRenderer;
