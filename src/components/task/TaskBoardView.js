import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Task 1' },
    'task-2': { id: 'task-2', content: 'Task 2' },
    'task-3': { id: 'task-3', content: 'Task 3' },
    'task-4': { id: 'task-4', content: 'Task 4' },
  },
  columns: {
    'column-todo': {
      id: 'column-todo',
      title: 'Todo',
      taskIds: ['task-1', 'task-2'],
    },
    'column-inprogress': {
      id: 'column-inprogress',
      title: 'In Progress',
      taskIds: ['task-3'],
    },
    'column-done': {
      id: 'column-done',
      title: 'Done',
      taskIds: ['task-4'],
    },
  },
  columnOrder: ['column-todo', 'column-inprogress', 'column-done'],
};

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
  background-color: #f4f4f4;
`;

const Column = styled.div`
  flex: 0 0 calc(20% - 20px);
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 5px;
  &:nth-child(5n) {
    margin-right: 20px;
  }
`;

const AddButton = styled.button`
  flex: 0 0 calc(20% - 20px);
  height: 40px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: #e9ecef;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  &:nth-child(5n) {
    margin-right: 20px;
  }
`;

const DeleteButton = styled.button`
  background-color: red;
  border: none;
  border-radius: 50%;
  color: white;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
`;

const TaskDeleteButton = styled.button`
  background-color: red;
  border: none;
  border-radius: 50%;
  color: white;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Card = styled.div`
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

function BoardView() {
  const [data, setData] = useState(initialData); // 보드의 데이터
  const [isEditing, setIsEditing] = useState(null); // 현재 편집 중인 컬럼 ID
  const [newTitle, setNewTitle] = useState(''); // 새로운 컬럼 제목

  // 드래그 앤 드롭 작업이 완료될 때의 처리 로직
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(endColumn.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEndColumn = {
      ...endColumn,
      taskIds: endTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newEndColumn.id]: newEndColumn,
      },
    };

    setData(newData);
  };

  // 컬럼 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  // 제목 입력 필드에서 포커스를 잃었을 때의 처리 로직
  const handleTitleBlur = (columnId) => {
    const updatedColumns = {
      ...data.columns,
      [columnId]: {
        ...data.columns[columnId],
        title: newTitle || data.columns[columnId].title,
      },
    };
    setData((prev) => ({ ...prev, columns: updatedColumns }));
    setIsEditing(null);
    setNewTitle('');
  };

  // 새 컬럼 추가
  const addNewColumn = () => {
    if (data.columnOrder.length >= 10) return;

    const newColumnId = `column-${Date.now()}`;

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newColumnId]: {
          id: newColumnId,
          title: 'New Column',
          taskIds: [],
        },
      },
      columnOrder: [...data.columnOrder, newColumnId],
    };

    setData(newData);
  };

  // 컬럼 삭제
  const handleDeleteColumn = (columnId) => {
    const column = data.columns[columnId];

    if (column.taskIds.length > 0) {
      alert('업무가 존재합니다');
      return;
    }

    const newColumns = { ...data.columns };
    delete newColumns[columnId];

    const newColumnOrder = data.columnOrder.filter((id) => id !== columnId);

    setData({
      ...data,
      columns: newColumns,
      columnOrder: newColumnOrder,
    });
  };

  // 태스크 삭제 핸들러
  const handleDeleteTask = (columnId, taskId) => {
    if (window.confirm('업무를 삭제하시겠습니까?')) {
      const updatedTasks = { ...data.tasks };
      delete updatedTasks[taskId];

      const updatedColumn = {
        ...data.columns[columnId],
        taskIds: data.columns[columnId].taskIds.filter((id) => id !== taskId),
      };

      const newData = {
        ...data,
        tasks: updatedTasks,
        columns: {
          ...data.columns,
          [columnId]: updatedColumn,
        },
      };

      setData(newData);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          return (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <Column {...provided.droppableProps} ref={provided.innerRef}>
                  <ColumnHeader>
                    {isEditing === columnId ? (
                      <input
                        value={newTitle}
                        onChange={handleTitleChange}
                        onBlur={() => handleTitleBlur(columnId)}
                        autoFocus
                      />
                    ) : (
                      <h3 onDoubleClick={() => setIsEditing(columnId)}>
                        {column.title}
                      </h3>
                    )}
                    <DeleteButton onClick={() => handleDeleteColumn(columnId)}>
                      X
                    </DeleteButton>
                  </ColumnHeader>
                  {column.taskIds.map((taskId, index) => {
                    const task = data.tasks[taskId];
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card>
                              {task.content}
                              <TaskDeleteButton
                                onClick={() =>
                                  handleDeleteTask(columnId, taskId)
                                }
                              >
                                X
                              </TaskDeleteButton>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Column>
              )}
            </Droppable>
          );
        })}
        {data.columnOrder.length < 10 && (
          <AddButton onClick={addNewColumn}>+</AddButton>
        )}
      </BoardContainer>
    </DragDropContext>
  );
}

export default BoardView;
