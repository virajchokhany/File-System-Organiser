function help(){
    console.log(`Available commands :
                1. organize - To organize the contents of a folder into an organized files folder
                2. tree - To generate a tree view of a directory
                3. help - Lists down available commands`);
}

module.exports = {
    helpKey : help
}