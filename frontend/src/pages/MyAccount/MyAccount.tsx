import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
    Box, Flex, Text, Button, Input, FormControl, FormLabel, Modal, 
    ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, 
    useDisclosure, Image
} from '@chakra-ui/react';
import profilePhoto from '../../pages/MyAccount/pp.jpg';
import Icon from '../../components/Icon/Icon';
import './MyAccount.scss';
import PageContainer from '../../components/PageContainer/PageContainer';
import { useUserContext } from '../../contexts/UserContext/UserContext';
import { useToast } from '@chakra-ui/react';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';

const MyAccount = () => {
    const navigate = useNavigate(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        profilePhoto: profilePhoto, // Default profile photo
    });
    
    // Modal hooks
    const { isOpen: isEditProfileOpen, onOpen: onOpenEditProfile, onClose: onCloseEditProfile } = useDisclosure();
    const { isOpen: isChangePasswordOpen, onOpen: onOpenChangePassword, onClose: onCloseChangePassword } = useDisclosure();
    const { user } = useUserContext();
    const toast = useToast();
    const { client } = useBackendAPIContext();

    const handleDeleteAccount = async () => {
    
        if (!user?.id) {
            toast({
                title: "Error",
                description: "User ID not found. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
    
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
        if (!confirmDelete) return;
    
        try {
            const response = await client.delete(`/user/${user.id}`);

            if (response.status !== 200 && response.status !== 204) {
                throw new Error("Failed to delete account.");
            }
    
            toast({
                title: "Account Deleted",
                description: "Your account has been deleted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
    
            window.location.href = "/login";
        } catch (error) {
            toast({
                title: "Error",
                description: "Error deleting account. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error(error);
        }
    };

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
            console.log('User:', user);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!isLoggedIn) {
        return null; // Show nothing if not logged in
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogout = () => {
        //handle logout request here
        navigate('/login');
    };

    return (
        <PageContainer>
            <Box className='my-account-page' maxW='600px' mx='auto'>    
                <Box className='account-container'>
                    <Flex className='heading-row'>
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
                        <Text className='profile-name'>{user?.name}</Text>
                        <Text className='profile-user-name'>{user?.username}</Text>
                    </Box>
                </Box>

                <Box className='profile-container'>
                    <Text className='profile-heading'>PROFILE</Text>
                    <Flex direction="column" mt={2} gap={0} className='profile-details'>
                        <Flex className='detail-row'>
                            <Text className='profile-name'>Name:</Text>
                            <Text>{user?.name}</Text>
                        </Flex>
                        <Flex className='detail-row'>
                            <Text className='profile-username'>Username:</Text>
                            <Text>{user?.username}</Text>
                        </Flex>
                        <Flex className='detail-row'>
                            <Text className='profile-email'>Email:</Text>
                            <Text>{user?.email}</Text>
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
                        <Flex className='setting-row' onClick={handleDeleteAccount}>
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
                                <Input name="name" value={user?.name} onChange={handleInputChange} placeholder='Enter new name' />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Username</FormLabel>
                                <Input name="username" value={user?.username} onChange={handleInputChange} placeholder='Enter new username' />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Email</FormLabel>
                                <Input name="email" value={user?.email} onChange={handleInputChange} placeholder='Enter new email' />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onCloseEditProfile}>Save</Button>
                            <Button variant='ghost' onClick={onCloseEditProfile}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

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
