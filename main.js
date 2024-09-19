#!/usr/bin/env node

// Task Tracking CLI

import {
  addTasks,
  listTask,
  markingStatus,
  removeTask,
  updateTask,
} from "./task_manipulation.js";

let command = process.argv[2];
let arg = process.argv[3];
let id = Number(process.argv[3]);
let update_message = process.argv[4];

if (
  command !== "add" &&
  command !== "delete" &&
  command !== "update" &&
  command !== "mark-done" &&
  command !== "mark-in-progress" &&
  command !== "list"
) {
  console.error("No command found");
}

if (command === "add")
  // // ADD TASKS
  addTasks(process.argv[3]); // takes cmd and new tasks

// // DELETE TASKS
if (command === "delete") removeTask(arg); // takses cmd and id of task

// UPDATE TASKS
if (command === "update") updateTask(id, update_message);

// MARKING STATUS OF TASKS: markInProgress + markDone
if (command === "mark-done" || command === "mark-in-progress")
  markingStatus(id);

// LISTING ALL ITEMS
if (command === "list") listTask(arg);
