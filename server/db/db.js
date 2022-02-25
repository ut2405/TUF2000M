const mongoose =require('mongoose');

mongoose.connect('mongodb+srv://linh:vanlinh2492@plantmonitor.od70i.mongodb.net/GAMBIT?retryWrites=true&w=majority',{
    useNewUrlParser: true})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))