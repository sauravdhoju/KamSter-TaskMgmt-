import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import './Kanban.scss';
import PageContainer from '../../components/PageContainer/PageContainer';

const Kanban = () => {
  const columns = {
    todo: 'To Do',
    doing: 'Doing',
    complete: 'Complete',
  };

  return (
    <PageContainer>
    <Flex className="kanban-board" gap="2" p="4">
      {Object.entries(columns).map(([columnId, columnName]) => (
        <Box key={columnId} className="column">
          <Flex >
            <Heading size="sm">{columnName}</Heading>
          </Flex>
          <Box className="add-task" mb="4">
            <Text as="span">Add a task</Text>
          </Box>
          <Box className="tasks">
            {/* Task list*/}
          </Box>
        </Box>
      ))}
    </Flex>
    </PageContainer>
  );
};

export default Kanban;
