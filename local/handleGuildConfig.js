const fs = require('fs/promises');
const path = "./local/guild.json"


/* 
Burada guild configleri ve notification channel confingi halledilir. 
new infoChannel veya delete infoChannel vs.
*/


const deleteFromGuildLog = async (data, application) => {

  let fileContents = await fs.readFile(path, { encoding: 'utf8' });
  fileContents = JSON.parse(fileContents);
  // console.log("veri:", fileContents) res: [{id: 2}, {id: 13}] vs
  let i;

  guild = fileContents.find((object, index) => {
  i = index;
  return object.id == data.id;
  });


  if(guild) {
      
  fileContents.splice(i, 1);
  console.log("bulundu index:", i , guild, "başarılı bir şekilde silindi.")
  await fs.writeFile(path, JSON.stringify(fileContents, null, 2), { encoding: 'utf8' });

  }

  // cacheden kaldir
  if(application) application.delete(data.id)
  


}

const addToGuildLog = async (data, application, update) => {

    let fileContents = await fs.readFile(path, { encoding: 'utf8' });
    fileContents = JSON.parse(fileContents);

    if(update) {

    await deleteFromGuildLog(data.id);
    console.log(data.id, "Başarılı bir şekilde silindi. Yeniden ekleniyor.")

    }
    
    fileContents.push(data);
    await fs.writeFile(path, JSON.stringify(fileContents, null, 2), { encoding: 'utf8' });

    application.set(data.id, { infoChannel: data.infoChannel });

  }




const getFromGuildLog = async (id) => {
    
    let fileContents = await fs.readFile(path, { encoding: 'utf8' });
    fileContents = JSON.parse(fileContents);
    
    if (id) return fileContents.find(g => g.id == id);
    else return fileContents;

  }



  module.exports = { 
    
    addToGuildLog: addToGuildLog, 
    deleteFromGuildLog: deleteFromGuildLog, 
    getFromGuildLog: getFromGuildLog
  
  }