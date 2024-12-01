let fs = require('fs');
let path = require('path');

function isFile(dirPath){
    return fs.lstatSync(dirPath).isFile();
}

function tree(dirPath){
    if (fs.existsSync(dirPath)==false) {
        treeHelper(process.cwd(),"");
    }else{
        treeHelper(dirPath,"");
    }
}

function treeHelper(dirPath, indent){

    let children = fs.readdirSync(dirPath);
    for(let i =0;i<children.length;i++){

        let childAddress = path.join(dirPath,children[i]);
        if(isFile(childAddress)){
            console.log(indent+"├──"+path.basename(childAddress));
        }else{
            console.log(indent+"└──"+path.basename(childAddress))
            treeHelper(childAddress,indent+"\t");
        }
    }
}

module.exports = {
    treeFn : tree
}