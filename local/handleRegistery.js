const fs = require('fs/promises');
const path = "./local/members.json"

const load = async () => {
  
let fileContents = await fs.readFile(path, { encoding: 'utf8' });
fileContents = JSON.parse(fileContents);

return fileContents;

}


const add = async data => {

    console.log("[Handle Members Add]:", data)
    let fileContents = await fs.readFile(path, { encoding: 'utf8' });
    fileContents = JSON.parse(fileContents);
    fileContents.push(data);
    await fs.writeFile(path, JSON.stringify(fileContents, null, 2), { encoding: 'utf8' });
  };


const remove = async data => {

    let fileContents = await fs.readFile(path, { encoding: 'utf8' });
    fileContents = JSON.parse(fileContents);
    // console.log("veri:", fileContents) res: [{id: 2}, {id: 13}] vs
    let i;

    getUser = fileContents.find((object, index) => {
    i = index;
    return object.playerID == data.playerID;
    });


    if(getUser) {
        
    fileContents.splice(i, 1);
    console.log("bulundu index:", i , getUser, "deleted from logs.")
    await fs.writeFile(path, JSON.stringify(fileContents, null, 2), { encoding: 'utf8' });

    }
}





module.exports = { loadFromLog: load, addToLog: add, removeFromLog: remove}