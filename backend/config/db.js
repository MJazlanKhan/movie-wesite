import mongoose from "mongoose";


const URL = 'mongodb+srv://jazlankhan:<password>@cluster0.iesyobs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectToMongo = async () => {
  try {
    const res = await mongoose.connect(URL);
    if(res){
        console.log("connection sucessfull")
    }
   } catch (error) {
    console.log(error)
   }
}

export default connectToMongo
