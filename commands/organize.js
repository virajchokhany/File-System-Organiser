let fs = require('fs');
let path = require('path');
let utility = require('../utility');
let organizedFolderName = "Organized Folder";

function isFile(dirPath){
    return fs.lstatSync(dirPath).isFile();
}

function createFolderOrFileIfNotExist(dirPath, name){
    name = path.join(dirPath,name);
    if (!fs.existsSync(name)){
        fs.mkdirSync(name);
    }
}
function organize(dirPath){
    if (fs.existsSync(dirPath)==false) {
        organizeFiles(process.cwd());
    }else{
        if(isFile(dirPath)){
            console.log("File path provided. Kindly provide a folder path to organize files.");
        }else{
            organizeFiles(dirPath);
        }
    }
}
function organizeFiles(dirPath){
    let organizedFolder = path.join(dirPath,organizedFolderName);
    createFolderOrFileIfNotExist(dirPath, organizedFolderName);
    organizeHelper(dirPath,organizedFolder);
}
function getFileCategory(dirPath){
    let baseName = path.basename(dirPath).split(".")[1];
    for(let key in utility.types){
        let arr = utility.types[key];
        for(let i =0;i<arr.length;i++){
            if(arr[i] == baseName){
                return key;
            }
        }
    }
    return "Other";
}
function organizeHelper(dirPath, organizedFolder){
    
    let children = fs.readdirSync(dirPath);
    for(let i=0;i<children.length;i++){
        let childPath = path.join(dirPath,children[i]);
        if(path.basename(childPath)!=organizedFolderName){
            if(isFile(childPath)){
                // iterate over files and check if they exist or not
                // if already exist in org folder do not copy , just cut
                // if does not exist create and copy and cut
                let fileCategory = getFileCategory(childPath);
                createFolderOrFileIfNotExist(organizedFolder,fileCategory);
                if(!fs.existsSync(path.join(organizedFolder,fileCategory,path.basename(childPath)))){
                    fs.copyFileSync(childPath, path.join(organizedFolder,fileCategory,path.basename(childPath)) );
                    fs.unlinkSync(childPath);
                }
            }else{
                organizeHelper(childPath, organizedFolder);
                fs.rmdirSync(childPath);
            }
        }
    }
}

module.exports = {
    organizeFolder : organize
}