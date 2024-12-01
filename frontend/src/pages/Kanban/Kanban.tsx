import { useState } from 'react';
import { Box, Flex, Heading, Input, Grid } from '@chakra-ui/react';
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
    const [draggedTask, setDraggedTask] = useState<string | null>(null); //for drag and drop

    const handleDragStart = (task: string) => {
        setDraggedTask(task);
    };
    
    const handleDrop = (columnId: string) => {
        if (draggedTask) {
            setColumns((prevColumns) =>
                prevColumns.map((column) => {
                    if (column.id === columnId) {
                        // Handle dropping within the same column
                        const taskIndex = column.tasks.indexOf(draggedTask);
                        if (taskIndex > -1) {
                            // Remove task from the current position
                            const updatedTasks = [...column.tasks];
                            updatedTasks.splice(taskIndex, 1);
    
                            // Add the task to the new position
                            // In this example, we are appending the task to the end of the column
                            // You can modify this logic to insert the task in the correct position
                            updatedTasks.push(draggedTask);
    
                            return {
                                ...column,
                                tasks: updatedTasks,
                            };
                        }
                    }
    
                    // Handle moving the task to a different column
                    if (column.tasks.includes(draggedTask)) {
                        return {
                            ...column,
                            tasks: column.tasks.filter((task) => task !== draggedTask),
                        };
                    }
    
                    if (column.id === columnId) {
                        return {
                            ...column,
                            tasks: [...column.tasks, draggedTask],
                        };
                    }
    
                    return column;
                })
            );
            setDraggedTask(null);
        }
    };
    

    
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
            {
                id: newColumnId,
                name: `New Board ${columns.length + 1}`,
                tasks: [],
            },
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
                column.id === columnId
                    ? { ...column, name: renameInput.trim() || column.name }
                    : column
            )
        );
        setEditingColumn(null);
        setRenameInput('');
    };

    return (
        <PageContainer>
            <Flex className='kanban-board'>
                {columns.map((column) => (
                    <Grid
                        key={column.id}
                        className='column'
                        gridTemplateRows={'min-content min-content 1fr'}
                        gridTemplateColumns={'1fr'}
                    >
                        <Box className='column-header'>
                            {editingColumn === column.id ? (
                                <Input
                                    value={renameInput}
                                    onChange={(e) =>
                                        setRenameInput(e.target.value)
                                    }
                                    onBlur={() => renameBoard(column.id)} // Rename on blur
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' &&
                                        renameBoard(column.id)
                                    } // Rename on Enter key
                                    autoFocus
                                />
                            ) : (
                                <Heading
                                    size='sm'
                                    className='column-header-text'
                                    onDoubleClick={() =>
                                        startRenaming(column.id, column.name)
                                    } // Enable renaming on double-click
                                >
                                    {column.name}
                                </Heading>
                            )}
                        </Box>
                        <Box className='task-input'>
                            <Box as='button' onClick={() => addTask(column.id)}>
                                <Icon name='bx-layer-plus' />
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
                                placeholder='Add a task'
                                value={taskInputs[column.id] || ''}
                                onChange={(e) =>
                                    handleInputChange(column.id, e.target.value)
                                }
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && addTask(column.id)
                                } // Add task on Enter key press
                            />
                        </Box>

                        {/* Cards Container */}
                        <Box className='cards-container'
                         minHeight={5}
                          bg="F5F5F5"
                          borderRadius="md"
                          border={column.tasks.length === 0 ? "1px dashed #F5F5F5F5" : "none"} // Dashed border for empty columns
                             onDragOver={(e) => e.preventDefault()} // Allow dropping
                             onDrop={() => handleDrop(column.id)} // Handle dropping
                        >
                            <Box className="tasks">
                            {column.tasks.length > 0 ? (
                            column.tasks.map((task, index) => (
                            <Box
                                key={index}
                                className="task"
                                draggable
                                onDragStart={() => handleDragStart(task)} // Dragging starts
                            >
                                {task}
                            </Box>
                            ))
                    ) : null}
                </Box>
                        </Box>
                    </Grid>
                ))}

                {/* Add Board Button */}
                <Box className='add-board'>
                    <Box
                        as='button'
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
                            className='add-board-icon'
                        />
                    </Box>
                </Box>
            </Flex>
        </PageContainer>
    );
};

export default Kanban;
