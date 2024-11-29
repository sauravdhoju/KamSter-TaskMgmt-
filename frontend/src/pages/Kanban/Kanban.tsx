import { useState } from 'react';
import { Box, Flex, Heading, Text} from '@chakra-ui/react';
import Icon from '../../components/Icon/Icon';
import './Kanban.scss';
import PageContainer from '../../components/PageContainer/PageContainer';

const Kanban = () => {
  const [columns, setColumns] = useState([
    { id: 'todo', name: 'To Do' },
    { id: 'doing', name: 'Doing' },
    { id: 'done', name: 'Done' },
  ]);

  // Function to add a new board
  const addBoard = () => {
    const newColumnId = `new-board-${columns.length}`;
    setColumns([...columns, { id: newColumnId, name: `New Board ${columns.length + 1}` }]);
  };

  return (
    <PageContainer>
      <Flex className="kanban-board">
        {columns.map((column) => (
          <Box key={column.id} className="column">
            <Heading size="sm" className="column-header">
              {column.name}
            </Heading>
            <Box className="add-task">
              <Text>Add a task</Text>
            </Box>
            <Box className="tasks">
              {/* Empty task list for now */}
            </Box>
          </Box>
        ))}
        {/* Add Board Button */}
        <Box
          as="button"
          onClick={addBoard}
          style={{
            border: 'none',
            background: 'none',
            padding: '0',
            cursor: 'pointer',
          }}
        >
        <Icon
          name='bx-plus-circle'
          className="add-board-icon"
        />
      </Box>
      </Flex>
    </PageContainer>
  );
};

export default Kanban;
