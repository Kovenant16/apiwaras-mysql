import axios from "axios";

export const getTasksRequest = async () =>
     await axios.get("https://nodejs-mysql-railway-production-07cd.up.railway.app/tasks");

export const createTaskRequest = async (task) =>
     await axios.post("https://nodejs-mysql-railway-production-07cd.up.railway.app/tasks", task);

export const deleteTaskRequest = async (id) =>
     await axios.delete(`https://nodejs-mysql-railway-production-07cd.up.railway.app/tasks/${id}`);

export const getTaskRequest = async (id) =>
     await axios.get(`https://nodejs-mysql-railway-production-07cd.up.railway.app/tasks/${id}`);

export const updateTaskRequest = async (id, newFields) =>
     await axios.put(`https://nodejs-mysql-railway-production-07cd.up.railway.app/tasks/${id}`, newFields);

export const toggleDoneRequest = async (id, done) =>
     await axios.put(`https://nodejs-mysql-railway-production-07cd.up.railway.app/tasks/${id}`,{
          done,
     });