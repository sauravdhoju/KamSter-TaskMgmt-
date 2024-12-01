import React, {useState, useEffect} from 'react';
import {Box, Text, Button, CloseButton, useDisclosure} from '@chakra-ui/react';

const Notification = ( {message, isOpen, onClose, type='info'}) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    const bgColors = {
        info: 'blue.500',
        success: 'green.500',
        warning: 'yellow.500',
        error: 'red.500',
    };

    return (
        isOpen && (
            <Box
                position="fixed"
                bottom="20px"
                right="20px"
                p={4}
                bg={bgColors}
                borderRadius="md"
                boxShadow="md"
                color="white"
                maxWidth="300px"
                zIndex="9999"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box>
                    <Text fontWeight="bold">{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                    <Text>{message}</Text>
                </Box>
                <CloseButton onClick={onClose} />
            </Box>
        )
    );
};

export default Notification;