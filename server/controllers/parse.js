const Tuf2000m =require('../models/TUF2000Minf');
const Tuf2000ma =require('../models/TUF2000Minf');
const ErrInf =require('../models/ErrorInf');
const dtparser =require('./functions')
const parseValue=async (req, res)=>{
  try{
      var RegInf= await Tuf2000m.find().sort({Register:1});
      var index=-1;
      RegInf.forEach(async (element) =>{
      index++;
      //CASE INTEGER
      switch(element.Format){
        case "INTEGER":
          {
            const strRBValue=dtparser.parseINTEGER(element.value);
            await Tuf2000ma.updateOne({Register:element.Register},{$set:{rbvalue:strRBValue}});
          }
          break;
      //CASE REAL4
        case "REAL4":
          {
            const strRBValue=dtparser.parseREAL4(element.value,RegInf[index+1].value);
            await Tuf2000ma.updateOne({Register:element.Register},{$set:{rbvalue:strRBValue}});
          }
          break;
      //CASE LONG      
        case "LONG":
          {
            const strRBValue=dtparser.parseLONG(element.value,RegInf[index+1].value);      
            await Tuf2000ma.updateOne({Register:element.Register},{$set:{rbvalue:strRBValue}});
          }
          break;
      //CASE BIT
        case "BIT":
          {
            var ErrorInf = await ErrInf.find();
            const bit=dtparser.parseBIT(element.value);
            ErrorInf.forEach(async (element1) =>{
                if(element1.Bit===bit){
                    const strRBValue='Error Bit'+bit+': '+element1.Error;
                    
                    await Tuf2000ma.updateOne({Register:element.Register},{$set:{rbvalue:strRBValue}});
                }
            });
          }
          break;
      //CASE BCD
        case "BCD":
          {
            const strRBValue=dtparser.parseBCD(element.value,RegInf[index+1].value,RegInf[index+2].value);
            await Tuf2000ma.updateOne({Register:element.Register},{$set:{rbvalue:strRBValue}});
          }
          break;
        default:
          {}
      }
    });
    await RegInf.save()
            res.status(200).json({message:"Successfully"});
  }catch (error) {
    res.status(400).json({ success: false, error });
  }
}
module.exports={parseValue}