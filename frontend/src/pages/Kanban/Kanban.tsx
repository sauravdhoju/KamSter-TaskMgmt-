import { useState } from 'react';
import { Box, Flex, Heading, Input } from '@chakra-ui/react';
import Icon from '../../components/Icon/Icon';
import './Kanban.scss';
import PageContainer from '../../components/PageContainer/PageContainer';

type Column = {
  id: string;
  name: string;
  tasks: string[];
};

const Kanban = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', name: 'To Do', tasks: [] },
    { id: 'doing', name: 'Doing', tasks: [] },
    { id: 'done', name: 'Done', tasks: [] },
  ]);

  const [taskInputs, setTaskInputs] = useState<Record<string, string>>({});
  const [editingColumn, setEditingColumn] = useState<string | null>(null); // Track column being renamed
  const [renameInput, setRenameInput] = useState<string>(''); // Input for renaming

  // Add a new task to the specified column
  const addTask = (columnId: string) => {
    const taskName = taskInputs[columnId]?.trim();
    if (taskName) {
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === columnId
            ? { ...column, tasks: [...column.tasks, taskName] }
            : column
        )
      );
      setTaskInputs((prev) => ({ ...prev, [columnId]: '' }));
    }
  };

  // Handle input change
  const handleInputChange = (columnId: string, value: string) => {
    setTaskInputs((prev) => ({ ...prev, [columnId]: value }));
  };

  // Add a new column (board)
  const addBoard = () => {
    const newColumnId = `board-${columns.length}`;
    setColumns([
      ...columns,
      { id: newColumnId, name: `New Board ${columns.length + 1}`, tasks: [] },
    ]);
  };

  // Enable renaming for a column
  const startRenaming = (columnId: string, currentName: string) => {
    setEditingColumn(columnId);
    setRenameInput(currentName);
  };

  // Confirm renaming
  const renameBoard = (columnId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId ? { ...column, name: renameInput.trim() || column.name } : column
      )
    );
    setEditingColumn(null);
    setRenameInput('');
  };

  return (
    <PageContainer>
      <Flex className="kanban-board">
        {columns.map((column) => (
          <Box key={column.id} className="column">
            <Box className="column-header">
              {editingColumn === column.id ? (
                <Input
                  value={renameInput}
                  onChange={(e) => setRenameInput(e.target.value)}
                  onBlur={() => renameBoard(column.id)} // Rename on blur
                  onKeyDown={(e) => e.key === 'Enter' && renameBoard(column.id)} // Rename on Enter key
                  autoFocus
                />
              ) : (
                <Heading
                  size="sm"
                  className="column-header-text"
                  onDoubleClick={() => startRenaming(column.id, column.name)} // Enable renaming on double-click
                >
                  {column.name}
                </Heading>
              )}
            </Box>
            <Box className="task-input">
              <Box as="button" onClick={() => addTask(column.id)}>
                <Icon name="bx-layer-plus" />
              </Box>
              <Input
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
                sx={{
                  '::placeholder': {
                    fontWeight: '500',
                    color: 'black',
                  },
                }}
                placeholder="Add a task"
                value={taskInputs[column.id] || ''}
                onChange={(e) => handleInputChange(column.id, e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask(column.id)} // Add task on Enter key press
              />
            </Box>
            <Box className="tasks">
              {column.tasks.map((task, index) => (
                <Box key={index} className="task">
                  {task}
                </Box>
              ))}
            </Box>
          </Box>
        ))}

        {/* Add Board Button */}
        <Box className="add-board">
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
            <Icon name="bx-plus-circle" className="add-board-icon" />
          </Box>
        </Box>
      </Flex>
    </PageContainer>
  );
};

export default Kanban;
