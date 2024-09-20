## Task Tracker Simple CLI

Helps in tracking the task by updateing the status, completion , editing and deletion of task

### Features

- Add, Update, and Delete tasks
- Mark a task as in progress or done
- List all tasks
- List all tasks that are done
- List all tasks that are not done
- List all tasks that are in progress
- All data stored in the JSON file present in the data folder.

### Installing

Fork and clone this github. Open the terminal, go to the saved folder(clone of gitreopo)

Write in the CLI

```
npm install -g
```

This installs the task-tracker package globally

Note: Access the commands using 'tt'

### Commands

- add tasks: `tt add 'Make Coffee'`

- Update Tasks: `tt update 1 "Buy a Coffee in Evening`
- Delete Tasks: `tt delete 0 `
- Mark Tasks: `tt mark-done 1` or `tt mark-in-progress 1`
- Show all Task: `tt list `
- Show all Task marked in-progress: `tt list in-progress`
- Show all Task marked done: `tt list done `
