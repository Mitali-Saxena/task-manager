import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, updateTaskOrder } from "../features/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    console.log("New task order after drag:", reorderedTasks);
    dispatch(updateTaskOrder(reorderedTasks));
  };

  const handleAddTask = () => {
    if (taskTitle.trim() === "") return;
    dispatch(addTask({ title: taskTitle }));
    setTaskTitle("");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "18px",
          marginBottom: "15px",
          color: "#333",
        }}
      >
        Task List
      </h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {loading && (
        <p style={{ textAlign: "center", color: "#777" }}>Loading tasks...</p>
      )}
      {error && (
        <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>
      )}
      {tasks.length === 0 && !loading && !error && (
        <p style={{ textAlign: "center", color: "#777" }}>
          No tasks found. Add some tasks!
        </p>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList" isDropDisabled={false} isCombineEnabled={false}>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: "none", padding: 0 }}
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={`task-${task.id}`} 
                  index={index}
                  isCombineEnabled={true}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: "10px",
                        margin: "5px 0",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "5px",
                        cursor: "grab",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {task.title}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
