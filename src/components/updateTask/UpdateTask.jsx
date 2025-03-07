import React, { useEffect, useState } from "react";
import "./UpdateTask.scss";
import { IoMdClose } from "react-icons/io";
import { notification } from "antd";
import "@ant-design/v5-patch-for-react-19";
import AOS from "aos";
import "aos/dist/aos.css";

const UpdateTask = ({ isOpen, onClose, updateTask, task, tasks }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const now = new Date();
  const formattedTimestamp =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) +
    " - " +
    now.toLocaleDateString();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (isOpen) {
      AOS.refreshHard();
    }
  }, [isOpen]);

  // 🆕 Cập nhật giá trị title và status khi task thay đổi
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      notification.error({
        message: "Please enter a title.",
        description: "",
        placement: "bottomRight",
        duration: 3,
      });
      return;
    }

    if (typeof updateTask !== "function") {
      console.error("❌ updateTask is not a function!");
      return;
    }

    // Tìm task cũ trong danh sách
    const existingTask = tasks.find((task) => task.id === task.id);

    // Kiểm tra xem có thay đổi không
    if (
      existingTask &&
      existingTask.title === title &&
      existingTask.status === status
    ) {
      notification.error({
        message: "No change made.",
        description: "",
        placement: "bottomRight",
        duration: 3,
      });
      return; // ❌ Không đóng modal
    }

    // Hiển thị thông báo thành công với Ant Design
    notification.success({
      message: "Task updated successfully.",
      description: "",
      placement: "bottomRight",
      duration: 3,
    });

    // 🆕 Gửi task đã cập nhật về App.jsx
    updateTask({ id: task.id, title, status, timestamp: formattedTimestamp });

    onClose(); // ✅ Chỉ đóng modal khi cập nhật thành công
  };

  return (
    <div className={`updateTask ${isOpen ? "show" : ""}`}>
      <div
        className="updateTask__modal"
        data-aos="zoom-in"
        data-aos-duration="300"
      >
        <div className="updateTask__close">
          <button data-aos={isOpen ? "fade-up" : ""} onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className="updateTask__title">Update TODO</h2>
          <label className="updateTask__label">Title</label>
          <input
            type="text"
            className="updateTask__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="updateTask__label">Status</label>
          <select
            className="updateTask__select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
          <div className="updateTask__buttons">
            <button type="submit" className="updateTask__add btn--primary">
              Update Task
            </button>
            <button
              type="button"
              className="updateTask__cancel btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
