const Tuf2000m =require('../models/TUF2000Minf');
const Tuf2000ma =require('../models/TUF2000Minf');
const ErrInf =require('../models/ErrorInf');
const parseValue=async (req, res)=>{
try{
var RegInf= await Tuf2000m.find().sort({Register:1});
var index=-1;
RegInf.forEach(async (element) =>{
index++;
//CASE INTEGER
if(element.Format==="INTEGER"){
const value=parseInt(element.value,10);

var binaryVl=value.toString(2);
while (binaryVl.length < 16) {
    binaryVl = '0'+binaryVl;
  }
const lowbit=binaryVl.substring(8);

const rbValue=parseInt(lowbit,2);
const strRBValue=rbValue.toString();

//RegInf[index].rbvalue=strRBValue;
await Tuf2000ma.updateOne({Register:element.Register},{$set:{rbvalue:strRBValue}});
//res.status(200).json({success : true});
}
//CASE REAL4
if(element.Format==="REAL4"){  
const value1=parseInt(element.value,10);

var binaryVl1=value1.toString(2);

while (binaryVl1.length < 16) {
    binaryVl1 = '0'+binaryVl1;
  }
  
const value2=parseInt(RegInf[index+1].value,10);

var binaryVl2=value2.toString(2);
while (binaryVl2.length < 16) {
    binaryVl2 = '0'+binaryVl2;
  }
  
const combine=binaryVl2+binaryVl1;
const cb16x=(parseInt(combine, 2)).toString(16);

const buffer = new ArrayBuffer(4);
const bytes = new Uint8Array(buffer);
bytes[0] = '0x'+cb16x.substring(0,2);
bytes[1] = '0x'+cb16x.substring(2,4);
bytes[2] = '0x'+cb16x.substring(4,6);
bytes[3] = '0x'+cb16x.substring(6);

var view = new DataView(buffer);
//RegInf[index].rbvalue=(view.getFloat32(0, false)).toString();
const strRBValue=(view.getFloat32(0, false)).toString();     
await Tuf2000ma.updateOne({Register:element.Register},{$set:{rbvalue:strRBValue}});
}
//CASE LONG
if(element.Format==="LONG"){    
    function getSignedInteger(bits) {
        let negative = (bits[0] === '1');
        if (negative) {
            let inverse = '';
            for (let i = 0; i < bits.length; i++) {
                inverse += (bits[i] === '0' ? '1' : '0');
            }
            return (parseInt(inverse, 2) + 1) * -1;
        } else {
            return parseInt(bits, 2);
        }
    }
    const value1=parseInt(element.value,10);
    var binaryVl1=value1.toString(2);
    while (binaryVl1.length < 16) {
        binaryVl1 = '0'+binaryVl1;
      }
    const value2=parseInt(RegInf[index+1].value,10);
    var binaryVl2=value2.toString(2);
    while (binaryVl2.length < 16) {
        binaryVl2 = '0'+binaryVl2;
      }
    const combine=binaryVl2+binaryVl1;
    //RegInf[index].rbvalue=getSignedInteger(combine).toString();
    const strRBValue=getSignedInteger(combine).toString();
    
    await Tuf2000ma.updateOne({Register:element.Register},{$set:{rbvalue:strRBValue}});

}
//CASE BIT
if(element.Format==="BIT"){
//console.log('linh'+element);
const value=parseInt(element.value,10);
var ErrorInf = await ErrInf.find();
var binaryVl=value.toString(2);
while (binaryVl.length < 16) {
    binaryVl = '0'+binaryVl;
  }
const bit=(binaryVl.length-1)-binaryVl.indexOf('1');

ErrorInf.forEach(async (element1) =>{
    if(element1.Bit===bit){
        //RegInf[index].rbvalue='Error Bit'+bit+': '+element.Error;
        const strRBValue='Error Bit'+bit+': '+element1.Error;
        
        await Tuf2000ma.updateOne({Register:element.Register},{$set:{rbvalue:strRBValue}});
    }
});
} 
//CASE BCD
if(element.Format==="BCD"){
    const value1=parseInt(element.value,10);
    const binaryVl1=value1.toString(16);
    const value2=parseInt(RegInf[index+1].value,10);
    const binaryVl2=value2.toString(16);
    const value3=parseInt(RegInf[index+2].value,10);
    const binaryVl3=value3.toString(16);
    const rbvalue=binaryVl3.substring(0,2)+'-'+binaryVl3.substring(2)+'-'+binaryVl2.substring(0,2)+' '+binaryVl2.substring(2)+':'+binaryVl1.substring(0,2)+':'+binaryVl1.substring(2);
    //RegInf[index].rbvalue='Date Time:'+ rbvalue;
    const strRBValue='Date Time:'+ rbvalue;
await Tuf2000ma.updateOne({Register:element.Register},{$set:{rbvalue:strRBValue}});
//res.status(200).json({success : true});
}
});
await RegInf.save()
     res.status(200).json({message:"Successfully"});
}catch (error) {
  res.status(400).json({ success: false, error });
 }
}
module.exports={parseValue}