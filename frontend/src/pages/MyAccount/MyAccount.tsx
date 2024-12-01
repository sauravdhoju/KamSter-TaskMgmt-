import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
    Box, Flex, Text, Button, Input, FormControl, FormLabel, Modal, 
    ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, 
    useDisclosure, Image
} from '@chakra-ui/react';
import profilePhoto from '../../pages/MyAccount/profile.jpg';
import Icon from '../../components/Icon/Icon';
import './MyAccount.scss';
import PageContainer from '../../components/PageContainer/PageContainer';

const MyAccount = () => {
    const navigate = useNavigate(); // Navigation hook
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
    const [userData, setUserData] = useState({
        name: "Saurav Dhoju",
        username: "@sauravdhoju",
        phone: "9808827451",
        email: "sauravdhoju12@gmail.com",
        profilePhoto: profilePhoto,
    }); 

    // Modal controls
    const { isOpen: isEditProfileOpen, onOpen: onOpenEditProfile, onClose: onCloseEditProfile } = useDisclosure();
    const { isOpen: isChangePasswordOpen, onOpen: onOpenChangePassword, onClose: onCloseChangePassword } = useDisclosure();

    //Profile Photo
    const [profileImage, setProfileImage] = useState(profilePhoto);

    // Check login status
    useEffect(() => {
        // Placeholder for actual login logic
        const checkLoginStatus = () => {
            const loggedIn = true; // Set login status
            setIsLoggedIn(loggedIn);
            if (!loggedIn) navigate('/login'); // Redirect if not logged in
        };

        checkLoginStatus();
    }, [navigate]);

    if (!isLoggedIn) {
        return null; // Show nothing if not logged in
    }

    // Handle input changes for editing user data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            setUserData((prevData) => ({ ...prevData, profilePhoto: imageUrl }));
        }
    };
    

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <PageContainer>
            <Box className='my-account-page'>
                <Box className='account-container'>
                    <Flex className='heading-row'>
                        {/* <Icon name='bx-chevron-left' className='icon' /> */}
                        <Text className='profile-heading'>My Account</Text>
                    </Flex>

                    <Box className='profile-picture'>
                        <Image
                            src={userData.profilePhoto} 
                            alt='profile-photo' 
                            className='profile-photo' 
                        />
                    </Box>

                    <Box className='profile-info'>
                        <Text className='profile-name'>{userData.name}</Text>
                        <Text className='profile-user-name'>{userData.username}</Text>
                    </Box>
                </Box>

                <Box className='profile-container'>
                    <Text className='profile-heading'>PROFILE</Text>
                    <Flex direction="column" mt={2} gap={0} className='profile-details'>
                        <Flex className='detail-row'>
                            <Text className='profile-name'>Name:</Text>
                            <Text>{userData.name}</Text>
                        </Flex>
                        <Flex className='detail-row'>
                            <Text className='profile-username'>Username:</Text>
                            <Text>{userData.username}</Text>
                        </Flex>
                        <Flex className='detail-row'>
                            <Text className='profile-phone'>Phone:</Text>
                            <Text>{userData.phone}</Text>
                        </Flex>
                        <Flex className='detail-row'>
                            <Text className='profile-email'>Email:</Text>
                            <Text>{userData.email}</Text>
                        </Flex>
                    </Flex>
                </Box>

                <Box className='setting-container'>
                    <Text className='setting-heading'>SETTINGS</Text>
                    <Flex direction="column" mt={2} gap={0} className='setting-details'>
                        <Flex className='setting-row' onClick={onOpenEditProfile}>
                            <Text className='setting-change-password'>Edit Profile</Text>
                            <Icon name='bx-chevron-right'/>
                        </Flex>
                        <Flex className='setting-row' onClick={onOpenChangePassword}>
                            <Text className='setting-change-password'>Change Password</Text>
                            <Icon name='bx-chevron-right'/>
                        </Flex>
                        <Flex className='setting-row'>
                            <Text className='setting-change-password'>Delete Account</Text>
                            <Icon name='bxs-trash' />
                        </Flex>
                    </Flex>
                </Box>

                <Box className='logout-container'>
                    <Button className='logout-heading' onClick={handleLogout}>Logout</Button>
                </Box>

                {/* Edit Profile Modal */}
                <Modal isOpen={isEditProfileOpen} onClose={onCloseEditProfile}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Profile</ModalHeader>
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Name</FormLabel>
                                <Input name="name" value={userData.name} onChange={handleInputChange} placeholder='Enter new name' />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Username</FormLabel>
                                <Input name="username" value={userData.username} onChange={handleInputChange} placeholder='Enter new username' />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Phone</FormLabel>
                                <Input name="phone" value={userData.phone} onChange={handleInputChange} placeholder='Enter new phone' />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Email</FormLabel>
                                <Input name="email" value={userData.email} onChange={handleInputChange} placeholder='Enter new email' />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Upload Photo</FormLabel>
                                <Input type="file" onChange={handleFileChange} />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onCloseEditProfile}>Save</Button>
                            <Button variant='ghost' onClick={onCloseEditProfile}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Change Password Modal */}
                <Modal isOpen={isChangePasswordOpen} onClose={onCloseChangePassword}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Change Password</ModalHeader>
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Current Password</FormLabel>
                                <Input type='password' placeholder='Enter current password' />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>New Password</FormLabel>
                                <Input type='password' placeholder='Enter new password' />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input type='password' placeholder='Confirm new password' />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onCloseChangePassword}>
                                Save
                                </Button>
                            <Button variant='ghost' onClick={onCloseChangePassword}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </PageContainer>
    );
};

export default MyAccount;
