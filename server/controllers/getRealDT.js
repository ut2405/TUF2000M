const Tuf2000m =require('../models/TUF2000Minf.js');
const getRealDT = async (req, res) => {
    try {
     const dt = await Tuf2000m.find({ 'Format' : { $exists: true, $ne: null } });
     res.status(200).json(dt);
    } catch (error) {
     res.status(400).json({ success: false, error });
    }
   }
module.exports={getRealDT}