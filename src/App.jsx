import React, { useState, useEffect } from "react";
// import Header from "./components/header/Header";
import Header from "./components/header/header";
import AddTask from "./components/addTask/AddTask";
import Content from "./components/content/content";
import UpdateTask from "./components/updateTask/UpdateTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  // ✅ Hàm thêm task
  const addTask = (title, status) => {
    const now = new Date();
    const formattedTimestamp =
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) +
      " - " +
      now.toLocaleDateString();
    console.log("✅ addTask function is called with:", title, status);
    const newTask = {
      id: Date.now(),
      title,
      status,
      timestamp: formattedTimestamp,
    };

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];

      // Lưu vào localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };

  // ✅ Hàm xóa task
  const deleteTask = (taskId) => {
    console.log("🗑 Deleting task with ID:", taskId);

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);

      // Cập nhật localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };

  // ✅ Hàm cập nhật task
  const updateTask = (updatedTask) => {
    console.log("✏️ Updating task:", updatedTask);

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );

      // Cập nhật vào localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });

    setEditingTask(null); // Đóng modal sau khi cập nhật xong
  };

  // ✅ Khi ứng dụng khởi động, đọc từ localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // ✅ Hàm mở modal cập nhật
  const handleEditTask = (task) => {
    setEditingTask(task); // Lưu task cần chỉnh sửa
    setIsModalOpen(true); // Mở modal
  };

  return (
    <>
      <Header addTask={addTask} setFilterStatus={setFilterStatus} />{" "}
      <Content
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={handleEditTask}
        filterStatus={filterStatus}
      />
      <AddTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addTask={addTask}
      />
      {/* 🆕 Chỉ hiển thị UpdateTask khi có editingTask */}
      <UpdateTask
        isOpen={isModalOpen} // Sử dụng state quản lý modal
        onClose={() => {
          setEditingTask(null);
          setIsModalOpen(false); // Đóng modal
        }}
        updateTask={updateTask}
        task={editingTask} // Truyền task đang chỉnh sửa
      />
    </>
  );
}

export default App;
