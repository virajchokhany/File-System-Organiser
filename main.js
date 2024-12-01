#!/usr/bin/env node
let input = process.argv.slice(2);
let helpObj = require("./commands/help");
let orgObj = require('./commands/organize');
let treeObj = require('./commands/tree');
switch(input[0]){
    case "organize":
        orgObj.organizeFolder(input[1]);
        break;
    case "tree":
        treeObj.treeFn(input[1]);
        break;

    case "help":
        helpObj.helpKey();
        break;

    default:
        console.log("Please enter a valid command");
        break;
}