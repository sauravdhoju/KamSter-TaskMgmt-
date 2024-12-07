import { Link } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
import PageContainer from '../../components/PageContainer/PageContainer';

const ProjectList = () => {
    const projects = [
        { id: '1', name: 'Project One' },
        { id: '2', name: 'Project Two' },
        { id: '3', name: 'Project Three' },
    ];

    return (
        <PageContainer>
        <Box>
            <Heading as="h1" size="lg" mb={4}>Project List</Heading>
            {projects.map((project) => (
                <Box key={project.id} mb={2}>
                    <Link to={`/kanban/${project.id}`}>
                        {project.name}
                    </Link>
                </Box>
            ))}
        </Box>
        </PageContainer>
    );
};

export default ProjectList;

