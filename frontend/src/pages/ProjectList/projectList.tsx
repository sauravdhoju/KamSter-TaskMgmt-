import { Link } from 'react-router-dom';
import { 
    Box, Heading, Button, Textarea, Input, Modal, ModalOverlay, ModalContent, 
    ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Text 
} from '@chakra-ui/react';
import { useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import './projectList.scss';

type Project = {
    id: string;
    name: string;
    description?: string; // optional
  };

const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
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
            onClose();
        }
    };

    return (
        <PageContainer>
            <Box>
                <Heading as="h1" size="lg" mb={5} textAlign="center">
                    Your Projects
                </Heading>

                {/* Display projects */}
                <Box  display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <Box
                                key={project.id} 
                                p={4} 
                                bg="white" 
                                borderRadius="lg" 
                                boxShadow="md"                             
                            >
                                <Link to={`/kanban/${project.name}`}>
                                    <Heading as="h2" size="md" color="black.600" mb={2}>
                                        {project.name}
                                    </Heading>
                                </Link>
                                <Text fontSize="sm" color="gray.700">
                                    {project.description || "No description provided."}
                                </Text>
                            </Box>
                        ))
                    ) : (
                        <Box gridColumn="span 4" textAlign="center" color="gray.500" fontSize="lg">
                            No projects yet! Click "Add New Project" to get started.
                        </Box>
                    )}
                </Box>

                {/* Button to open the modal */}
                <Box mt={8} textAlign="center">
                    <Button colorScheme="white" size="lg" bg="black"onClick={onOpen}>
                        Add New Project
                    </Button>
                </Box>

                {/* Modal for adding a project */}
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add a New Project</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                placeholder="Project Name"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                mb={4}
                                size="lg"
                            />
                            <Textarea
                                placeholder="Project Description (optional)"
                                value={newProjectDescription}
                                onChange={(e) => setNewProjectDescription(e.target.value)}
                                size="lg"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="white"  bg="black" mr={3} onClick={addProject}>
                                Add Project
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </PageContainer>
    );
};

export default ProjectList;
