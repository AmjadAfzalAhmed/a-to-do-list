#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r,ms));

async function welcome() {
    let multiColors = chalkAnimation.rainbow(
        `\n----- WELCOME to A To-Do List, Created by Amjad Afzal Ahmed -----\n
        \n----- The list contains adding to-dos and updating an existing to-do list -----\n`
    );

    await sleep();
    multiColors.stop();
}

await welcome();

async function createToDoList() {
  let todos: string[] = [];


  let addMore = true;
  while (addMore) {
    let addTask = await inquirer.prompt([
      {
        type: "input",
        name: "todo",
        message: chalk.blue.bold("Enter a new todo:")
      },
      {
        type: "confirm",
        name: "addMore",
        message: chalk.yellow.bold("Do you want to add more todos?"),
        default: true
      }
    ]);

    todos.push(addTask.todo);
    addMore = addTask.addMore;
  }

  // Create a copy of primary todos
  let primTodos = [...todos];

  // Display the primary todos
  console.log(chalk.cyanBright.bold("\nPrimary To-Do List:"));
  console.log("\n",primTodos,"\n");

  // ask for deletion of any todo
  let delTask = true;
  while (delTask) {
    let deleteTask = await inquirer.prompt({
      type: "list",
      name: "taskToDelete",
      message: chalk.red.bold("Select a task to delete:"),
      choices: todos.concat("continue without deletion")
    });

    if (deleteTask.taskToDelete === "continue without deletion") {
      delTask = false;
    } else {
      todos = todos.filter(task => task !== deleteTask.taskToDelete);
    }
  }

  // displays the list after deletion
  console.log(chalk.blueBright.bold("\nUpdated To-Do List after deletion:"));
  console.log(todos);

  // create a new todos
  let addNewMore = true;
  while (addNewMore) {
    let addNewTask = await inquirer.prompt({
      type: "input",
      name: "newTodo",
      message: "Enter a new todo to add:"
    });

    todos.push(addNewTask.newTodo);

    let addMore = await inquirer.prompt({
      type: "confirm",
      name: "addMore",
      message: "Do you want to add more todos?",
      default: true
    });

    addNewMore = addMore.addMore;
  }

  // Final todos
  console.log(chalk.yellowBright.bold("\nFinal To-Do List:"));
  console.log("\n", todos);
}

//invoke the program to run and create a todo list with multi choices
createToDoList();
