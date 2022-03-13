//parse REAL4
function parseREAL4(stringVL1, stringVL2){
    const value1=parseInt(stringVL1,10);
    var binaryVl1=value1.toString(2);
    while (binaryVl1.length < 16) {
        binaryVl1 = '0'+binaryVl1;
    }  
    const value2=parseInt(stringVL2,10);
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
    const strRBValue=(view.getFloat32(0, false)).toString();
    return(strRBValue);
}

//Parse LONG
function parseLONG(stringVL1, stringVL2){
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
    const value1=parseInt(stringVL1,10);
    var binaryVl1=value1.toString(2);
    while (binaryVl1.length < 16) {
        binaryVl1 = '0'+binaryVl1;
      }
    const value2=parseInt(stringVL2,10);
    var binaryVl2=value2.toString(2);
    while (binaryVl2.length < 16) {
        binaryVl2 = '0'+binaryVl2;
      }
    const combine=binaryVl2+binaryVl1;
    const strRBValue=getSignedInteger(combine).toString();
    
    return(strRBValue);
}

//Parse BCD
function parseBCD(stringVL1, stringVL2, stringVL3){
    const value1=parseInt(stringVL1,10);
    const binaryVl1=value1.toString(16);
    const value2=parseInt(stringVL2,10);
    const binaryVl2=value2.toString(16);
    const value3=parseInt(stringVL3,10);
    const binaryVl3=value3.toString(16);
    const rbvalue=binaryVl3.substring(0,2)+'-'+binaryVl3.substring(2)+'-'+binaryVl2.substring(0,2)+' '+binaryVl2.substring(2)+':'+binaryVl1.substring(0,2)+':'+binaryVl1.substring(2);    
    const strRBValue='Date Time:'+ rbvalue;
    
    return(strRBValue);
}

//Parse BIT
function parseBIT(stringVL1){
    const value=parseInt(stringVL1,10);    
    var binaryVl=value.toString(2);
    while (binaryVl.length < 16) {
        binaryVl = '0'+binaryVl;
    }
    const bit=(binaryVl.length-1)-binaryVl.indexOf('1');    
    return(bit);
}

//Parse INTEGER
function parseINTEGER(stringVL1){
    const value=parseInt(stringVL1,10);

  var binaryVl=value.toString(2);
  while (binaryVl.length < 16) {
      binaryVl = '0'+binaryVl;
    }
  const lowbit=binaryVl.substring(8);

  const rbValue=parseInt(lowbit,2);
  const strRBValue=rbValue.toString();
    return(strRBValue);
}

module.exports={parseINTEGER, parseLONG, parseREAL4, parseBCD, parseBIT};