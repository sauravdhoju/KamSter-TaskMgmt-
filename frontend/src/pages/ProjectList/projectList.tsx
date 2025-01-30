import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Heading,
    Button,
    Textarea,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Text,
    Flex,
} from '@chakra-ui/react';

import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';
import PageContainer from '../../components/PageContainer/PageContainer';
import Icon from '../../components/Icon/Icon';
import './projectList.scss';

type Project = {
    _id: string;
    name: string;
    description?: string; // optional
    created_at: Date;
    udpated_at: Date;
    admin_id: string;
};

const ProjectList = () => {
    const { client } = useBackendAPIContext();
    const [projects, setProjects] = useState<Project[]>([]);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onClose: onEditClose,
    } = useDisclosure();
    const navigate = useNavigate();

    const addProject = async () => {
        try {
            const newProject = {
                id: (projects.length + 1).toString(),
                name: newProjectName,
                description: newProjectDescription,
            };
            const response = await client.post('/project/create', newProject);
            const data = await response.data;
            if (data) {
                fetchProjects();
                setNewProjectName('');
                setNewProjectDescription('');
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const editProject = () => {
        if (editingProject && editingProject.name.trim()) {
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === editingProject.id ? editingProject : project
                )
            );
            setEditingProject(null);
            onEditClose();
        }
    };

    const deleteProject = (id: string) => {
        setProjects((prevProjects) =>
            prevProjects.filter((project) => project.id !== id)
        );
    };

    const handleDoubleClick = (projectName: string) => {
        navigate(`/kanban/${projectName}`);
    };

    const fetchProjects = async () => {
        try {
            const response = await client.get('/project/get');
            const data = await response.data;
            if (data) setProjects(data.projects);
            else throw new Error('Projects not found!');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <PageContainer>
            <Box>
                <Heading as='h1' size='lg' mb={5} textAlign='center'>
                    Your Projects
                </Heading>

                {/* Display projects */}
                <Box
                    display='grid'
                    gridTemplateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    }}
                    gap={6}
                >
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <Box
                                key={project.id}
                                p={4}
                                bg='white'
                                borderRadius='lg'
                                boxShadow='md'
                                onDoubleClick={() =>
                                    handleDoubleClick(project.name)
                                } // Navigate on double-click
                            >
                                <Flex
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Heading
                                        as='h2'
                                        size='md'
                                        color='black.600'
                                        mb={2}
                                    >
                                        {project.name}
                                    </Heading>
                                    <Flex gap={2}>
                                        <Box
                                            as='button'
                                            className='edit-board'
                                            onClick={() => {
                                                setEditingProject(project);
                                                onEditOpen();
                                            }}
                                        >
                                            <Box fontSize='30px'>
                                                <Icon name='bx-edit' />
                                            </Box>
                                        </Box>
                                        <Box
                                            as='button'
                                            className='delete-board'
                                            onClick={() =>
                                                deleteProject(project.id)
                                            } // Delete project */}
                                        >
                                            <Icon name='bx-trash' />
                                        </Box>
                                    </Flex>
                                </Flex>
                                <Text fontSize='sm' color='gray.700'>
                                    {project.description ||
                                        'No description provided.'}
                                </Text>
                            </Box>
                        ))
                    ) : (
                        <Box
                            gridColumn='span 4'
                            textAlign='center'
                            color='gray.500'
                            fontSize='lg'
                        >
                            No projects yet! Click "Add New Project" to get
                            started.
                        </Box>
                    )}
                </Box>

                {/* Button to open the modal */}
                <Box mt={8} textAlign='center'>
                    <Button
                        colorScheme='white'
                        size='lg'
                        bg='black'
                        onClick={onOpen}
                    >
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
                                placeholder='Project Name'
                                value={newProjectName}
                                onChange={(e) =>
                                    setNewProjectName(e.target.value)
                                }
                                mb={4}
                                size='lg'
                            />
                            <Textarea
                                placeholder='Project Description (optional)'
                                value={newProjectDescription}
                                onChange={(e) =>
                                    setNewProjectDescription(e.target.value)
                                }
                                size='lg'
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme='white'
                                bg='black'
                                mr={3}
                                onClick={addProject}
                            >
                                Add Project
                            </Button>
                            <Button variant='ghost' onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Modal for editing a project */}
                {editingProject && (
                    <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit Project</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Input
                                    placeholder='Project Name'
                                    value={editingProject.name}
                                    onChange={(e) =>
                                        setEditingProject({
                                            ...editingProject,
                                            name: e.target.value,
                                        })
                                    }
                                    mb={4}
                                    size='lg'
                                />
                                <Textarea
                                    placeholder='Project Description (optional)'
                                    value={editingProject.description || ''}
                                    onChange={(e) =>
                                        setEditingProject({
                                            ...editingProject,
                                            description: e.target.value,
                                        })
                                    }
                                    size='lg'
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    colorScheme='white'
                                    bg='black'
                                    mr={3}
                                    onClick={editProject}
                                >
                                    Save Changes
                                </Button>
                                <Button variant='ghost' onClick={onEditClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Box>
        </PageContainer>
    );
};

export default ProjectList;
