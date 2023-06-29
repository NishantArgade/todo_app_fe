// import React from "react";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { Context, server_url } from "../main";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const CreateTask = () => {
  const [show, setShow] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [updateTaskCompleteStatus, setUpdateTaskCompleteStatus] = useState("");
  const [updatedTaskId, setUpdatedTaskId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const { loading, setLoading, isAuthenticated } = useContext(Context);

  const handleTaskCreate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server_url}/task/new`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };
  const getAllMyTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server_url}/task/my`, {
        withCredentials: true,
      });
      setAllTasks(data.tasks);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
      setAllTasks([]);
    }
  };
  const handleUpdateTask = async (taskId) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${server_url}/task/${taskId}`,
        {
          isCompleted: updateTaskCompleteStatus,
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };
  const handleDeleteTask = async (taskId) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${server_url}/task/${taskId}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMyTasks();
  }, []);

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-55">
        <h1 className="text-center mb-5">Create Task</h1>

        <div className="d-flex justify-content-center align-items-center">
          {!show && (
            <>
              <label className="m-2">Complated:</label>
              <MDBCheckbox
                className="me-3"
                size="lg"
                checked={updateTaskCompleteStatus}
                onChange={(e) => setUpdateTaskCompleteStatus(e.target.checked)}
              />
            </>
          )}

          <label className="m-2">Title:</label>
          <MDBInput
            label="Title"
            id="form1"
            type="textarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="m-2">Description:</label>
          <MDBInput
            label="Description"
            id="form2"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {show ? (
            <MDBBtn
              className="p-auto m-2 w-25"
              type="submit"
              disabled={loading}
              onClick={handleTaskCreate}
            >
              Add
            </MDBBtn>
          ) : (
            <MDBBtn
              className="w-25 m-2"
              onClick={() => {
                handleUpdateTask(updatedTaskId);
              }}
            >
              Update
            </MDBBtn>
          )}
        </div>

        <div style={{ textAlign: "center", fontSize: "20px" }}>
          --------------- Tasks --------------
        </div>
        <div
          style={{
            padding: "2rem 2rem",

            height: "20rem",
            overflow: "auto",
          }}
        >
          {allTasks.length > 0 &&
            allTasks.map((task, index) => {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-center align-items-center mt-3 p-3"
                >
                  <label className="p-2">Completed:</label>
                  <MDBCheckbox
                    className="me-3"
                    size="lg"
                    disabled={!task.isCompleted}
                    checked={task.isCompleted}
                  />
                  <label className="p-2">Title:</label>
                  <MDBInput
                    disabled={show}
                    id="form1"
                    type="text"
                    value={task.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="p-2">Description:</label>
                  <MDBInput
                    disabled={show}
                    id="form1"
                    type="text"
                    value={task.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <MDBBtn
                    className="w-25 m-2"
                    onClick={() => {
                      setTitle(task.title);
                      setDescription(task.description);
                      setUpdateTaskCompleteStatus(task.isCompleted);
                      setShow(false);
                      setUpdatedTaskId(task._id);
                    }}
                  >
                    Edit
                  </MDBBtn>

                  <MDBBtn
                    className="w-25"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </MDBBtn>
                </div>
              );
            })}
        </div>
      </MDBContainer>
    </div>
  );
};

export default CreateTask;
