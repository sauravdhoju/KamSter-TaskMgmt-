import { Link } from 'react-router-dom';
import { Box, Heading, Button, Textarea, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';

const ProjectList = () => {
    // Start with an empty list of projects
    const [projects, setProjects] = useState([]);

    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const addProject = () => {
        if (newProjectName.trim()) {
            const newProject = {
                id: (projects.length + 1).toString(),
                name: newProjectName,
                description: newProjectDescription,
            };
            setProjects([...projects, newProject]);
            setNewProjectName('');
            setNewProjectDescription('');
            onClose(); // Close the modal after adding the project
        }
    };

    return (
        <PageContainer>
            <Box>
                <Heading as="h1" size="lg" mb={4}>Project List</Heading>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <Box key={project.id} mb={4} borderWidth="1px" borderRadius="md" p={3}>
                            <Link to={`/kanban/${project.id}`}>
                                <Heading as="h2" size="md">{project.name}</Heading>
                            </Link>
                            <Box fontSize="sm" mt={1}>{project.description}</Box>
                        </Box>
                    ))
                ) : (
                    <Box mt={4} fontSize="md" color="gray.500">
                        No projects added yet. Click "Add New Project" to get started.
                    </Box>
                )}

                {/* Button to open the modal */}
                <Box mt={6}>
                    <Button colorScheme="blue" onClick={onOpen}>Add New Project</Button>
                </Box>

                {/* Modal for adding a new project */}
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add New Project</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                placeholder="Project Name"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                mb={4}
                            />
                            <Textarea
                                placeholder="Project Description"
                                value={newProjectDescription}
                                onChange={(e) => setNewProjectDescription(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={addProject}>Add Project</Button>
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </PageContainer>
    );
};

export default ProjectList;
