//const archiver=require('archiver')
const express = require('express');
const app = express();
const fs = require('fs').promises;
const path=require('path')
//var AdmZip = require("adm-zip");
exports.createFolder=async(req,res)=>{

    try {
        const { createrootfolder,createchildfolder } = req.body;

const folderPath = path.join('uploads',createrootfolder,createchildfolder)

        //const folderPath = `./uploads/${createrootfolder}/${createchildfolder}`;
    console.log('folderPathgfg',folderPath)
    const folders = await fs.readdir('./uploads');



        // Create the folder
        await fs.mkdir(folderPath,{recursive:true});
    
        // Respond with a list of existing folders
        res.status(200).json(folders);




      } catch (error) {
        console.error('Error creating folder:', error);
        res.status(500).json({ error: 'Could not create folder' });
      }
    };
    


    exports.readfolder=async(req,res)=>{

try {
  const folder =await fs.readdir('./uploads')

  res.status(200).json(folder)


} catch (error) {
  res.status(500).joson({success:false,message:'error fetching folder!'})
}


    }






exports.readchildFolder=async(req,res)=>{

try {
  const rootfolder=req.params.rootfolder;
  console.log('rootfolder',rootfolder)
  const folderPath = path.join('uploads',rootfolder); 
  //const folderPath=`./uploads/${rootfolder}`
  console.log('folderpath',folderPath)
const childfolder=await fs.readdir(folderPath)
if(childfolder.length>0){
  res.status(200).json( childfolder );

  
}
else{
  
  res.status(200).json(['empty folder...']);

}
console.log(childfolder)

} catch (error) {
  console.log(error)
  res.status(500).json({success:false,messsage:'something went wrong ',error:error})


}




}





exports.readfile=async(req,res)=>{
                                   
  try {
  const {rootfolder,childfolder}=req.params;
  
  const folderPath=path.join('uploads',rootfolder,childfolder)

const element=await fs.readdir(folderPath)

  res.status(200).json(element)
} catch (error) {
  res.status(500).json('error finding file');
}

}


















//exports.download = async(req,res)=>{
//  try {
//    const {rootfolder,item}=req.body;
//    const folderPath = path.join('uploads',rootfolder,item);
//    const uploadDir = await fs.readdir(folderPath);
//    //console.log('folderPath',rootfolder)

//    const zip = new AdmZip();

//    for (let i = 0; i < uploadDir.length; i++) {
//      const filePath = path.join(folderPath, uploadDir[i]);
//      const isDirectory = (await fs.stat(filePath)).isDirectory(); // Check if it's a directory
    
//      if (!isDirectory) {
//        zip.addLocalFile(filePath);
//      }
//    }
    

//    const downloadName = `download.zip`;
//    const data = zip.toBuffer();

//    res.setHeader('Content-Type', 'application/zip');
//    res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
//    res.send(data);
//  } catch (err) {
//    console.error(err);
//    res.status(500).send('Error sending download');
//  }
//}





    

    
   
    
    
    
    
    
    



