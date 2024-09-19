import { readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
const file_path = "./data/data.json";

const readFileFunction = (file_path) => {
  let task_data;

  try {
    task_data = readFileSync(file_path, "utf-8");
    if (!task_data.trim()) {
      console.warn("The file is empty. Initializing with an empty array.");
      task_data = "[]";
      writeFile(file_path, task_data);
    }

    task_data = JSON.parse(task_data);
    return task_data;
  } catch (err) {
    // If JSON is invalid or an unexpected issue occurs, fix the file with an empty array
    console.error(
      "The data file is corrupted or empty. Resetting with an empty array."
    );
    task_data = [];
    writeFile(file_path, JSON.stringify(task_data, null, 2)); // Reset the file with an empty array
    return task_data;
  }
};

// Method: add new task
export const addTasks = (tasks) => {
  const new_task = {
    id: "",
    description: tasks,
    status: "todo",
    createdAt: new Date().toISOString().split("T"),
    updatedAt: new Date().toISOString().split("T"),
  };

  let data = readFileFunction(file_path);
  let id = data.length;
  new_task.id = id;
  data.push(new_task);
  // console.log("new", data);
  writeFile(file_path, JSON.stringify(data))
    .then(() => console.log("Tasks Added"))
    .catch((er) => console.log(er));
};

// Method: delete prev task
export const removeTask = (id_no) => {
  let tasks = readFileFunction(file_path);
  const current_length = tasks.length;
  let delete_index = parseInt(id_no);
  // console.log(delete_index);
  let filtered_tasks = tasks.filter((tasks) => tasks.id !== delete_index);
  const changed_length = filtered_tasks.length;
  console.log(filtered_tasks);
  writeFile(file_path, JSON.stringify(filtered_tasks))
    .then(() => {
      // console.log(changed_length === current_length);
      if (changed_length === current_length) {
        console.log("Already deleted");
      } else console.log("Task Deleted");
    })
    .catch((er) => console.log(er));
};

// Method: update task
export const updateTask = (id_no, msg) => {
  // search in data
  let task_data = readFileFunction(task_data);
  for (let i = 0; i < task_data.length; i++) {
    let task_obj = task_data[i];
    if (task_obj.id === id_no) {
      task_data[i].description = msg;
      task_data[i].updatedAt = new Date().toISOString().split("T");
      break;
    }
  }
  console.log(task_data);
  writeFile(file_path, JSON.stringify(task_data))
    .then(() => console.log(`Updated task Id ${id}`))
    .catch((err) => console.log("Error in Updating Task"));
};

// Method: marking the status
export const markingStatus = (cmd, id) => {
  let status_upt = "";
  if (cmd !== "mark-in-progress" && cmd !== "mark-done") {
    throw new Error("marking command not found");
  } else if (cmd === "mark-done") {
    status_upt = "done";
  } else if (cmd === "todo") {
    status_upt = "todo";
  } else {
    status_upt = "in-progress";
  }

  let data = readFileFunction(file_path);

  for (let obj = 0; obj < data.length; obj++) {
    if (data[obj].id === id) {
      data[obj].status = status_upt;
      data[obj].updatedAt = new Date().toISOString().split("T");
      break;
    }
  }
  writeFile(file_path, JSON.stringify(data))
    .then(() => console.log("marked"))
    .catch((er) => console.log("Error in marking the data"));
};

// Method: listing all the tasks
export const listTask = (arg = null) => {
  let task_data = readFileFunction(file_path);
  if (arg === null) {
    task_data?.map((item) => console.log(item.description));
  } else if (arg === "done" || arg === "todo" || arg === "in-progress") {
    task_data.filter((items) => {
      if (items.status === arg) console.log(items.description);
    });
  } else {
    throw new Error("Wrong List Command");
  }
};
