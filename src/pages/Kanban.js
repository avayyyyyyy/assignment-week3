import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Paper, Grid, Typography, Box } from "@mui/material";

const initialTasks = {
  todo: [
    { id: "task-1", content: "Task 1" },
    { id: "task-2", content: "Task 2" },
    { id: "task-3", content: "Task 3" },
  ],
  inProgress: [{ id: "task-4", content: "Task 4" }],
  done: [{ id: "task-5", content: "Task 5" }],
};

const Kanban = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the list
    if (!destination) {
      return;
    }

    // Reorder the tasks
    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [removed] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removed);

    // Update state with the new order
    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2}>
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <Grid item xs={4} key={columnId}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {columnId.charAt(0).toUpperCase() + columnId.slice(1)}
              </Typography>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minHeight: 300,
                      backgroundColor: "#f0f0f0",
                      padding: 2,
                    }}
                  >
                    {columnTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: 2,
                              marginBottom: 2,
                              backgroundColor: "#fff",
                              cursor: "grab", // Ensure cursor is set to grab
                            }}
                          >
                            {task.content}
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </DragDropContext>
  );
};

export default Kanban;
