import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Flex, Text, Button, Input, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image } from '@chakra-ui/react';
import profilePhoto from '../../pages/MyAccount/profile.jpg'; // Make sure the path is correct
import Icon from '../../components/Icon/Icon';
import './MyAccount.scss';


const MyAccount = () => {
    // Modal controls for Edit Profile and Change Password
    const { isOpen: isEditProfileOpen, onOpen: onOpenEditProfile, onClose: onCloseEditProfile } = useDisclosure();
    const { isOpen: isChangePasswordOpen, onOpen: onOpenChangePassword, onClose: onCloseChangePassword } = useDisclosure();

    return (
        <Box className='my-account-page'>
            <Box className='account-container'>
                <Flex className='heading-row'>
                    <Icon name='bx-chevron-left' className='icon' />
                    <Text className='profile-heading'>My Account</Text>
                </Flex>

                <Box className='profile-picture'>
                    <Image
                        src={profilePhoto}
                        alt='profile-photo'
                        className='profile-photo'
                    />
                </Box>
                <Box className='profile-info'>
                    <Text className='profile-name'>Saurav Dhoju</Text>
                    <Text className='profile-user-name'>@sauravdhoju</Text>
                </Box>
            </Box>

            <Box className='profile-container'>
                <Text className='profile-heading'>PROFILE</Text>
                <Flex direction="column" mt={2} gap={0} className='profile-details'>
                    <Flex className='detail-row'>
                        <Text className='profile-name'>Name:</Text>
                        <Text>Saurav Dhoju</Text>
                    </Flex>
                    <Flex className='detail-row'>
                        <Text className='profile-username'>Username:</Text>
                        <Text>@sauravdhoju</Text>
                    </Flex>
                    <Flex className='detail-row'>
                        <Text className='profile-phone'>Phone:</Text>
                        <Text>9808827451</Text>
                    </Flex>
                    <Flex className='detail-row'>
                        <Text className='profile-email'>Email:</Text>
                        <Text>sauravdhoju12@gmail.com</Text>
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
                </Flex>
            </Box>

            <Box className='logout-container'>
                <Button className='logout-heading'>Logout</Button>
            </Box>

            {/* Edit Profile Modal */}
            <Modal isOpen={isEditProfileOpen} onClose={onCloseEditProfile}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder='Enter new name' />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='Enter new username' />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Upload Photo</FormLabel>
                            <Input type='file' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onCloseEditProfile}>
                            Save
                        </Button>
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
    );
};

export default MyAccount;
