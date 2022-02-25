const Tuf2000m =require('../models/TUF2000Minf.js');
const updateRawDT = async (req, res) => {    
   try {
     const regVL = (req.params.vl).split(":");
     //console.log('linh '+regVL[0]);
     const reg=parseInt( regVL[0],10);
     var RegInf = await Tuf2000m.updateOne({ Register:reg},{$set:{value:regVL[1]}})     
     res.status(200).json({message:"Successfully"});
    } catch (error) {
     res.status(404).json({success: false, error }); 
    }
   }

   const clearRawDT = async (req, res) => {    
    try {        
      await Tuf2000m.updateMany({},{$set:{value:"",rbvalue:""}})  
      res.status(200).json({success : true});
     } catch (error) {
      res.status(404).json({ success: false, error }); 
     }
    }

    module.exports={updateRawDT,clearRawDT}