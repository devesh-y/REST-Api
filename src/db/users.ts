import mongoose from "mongoose";

//"select" means the field should be included or excluded by default when querying documents from the MongoDB database.
//"salt" refers to a random value that is added to a user's password before hashing it.

//there is a "_id" property which is provided by mongo db schema itself even you dont declare it

const UserSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    authentication:{
        isAdmin:{type:Boolean,required:true,select:false},
        password:{type:String, required:true, select :false},
        salt:{type:String,select :false},
        sessionToken:{type:String, select:false}
    }
});

export const UserModel=mongoose.model('User',UserSchema);
//mongodb will map the name of model with the collection , 
//and name that with its plural ,=> it will be users
export const getUsers=()=>UserModel.find();
export const getUserbyEmail=(email:string)=>UserModel.findOne({email});
export const getUserbySessionToken=(sessionToken:string)=>UserModel.findOne({'authentication.sessionToken':sessionToken});

export const getUserById=(id:string)=>UserModel.findById(id);
export const createUser=(values:Record<string,any>)=> new UserModel(values).save().then((user)=>user.toObject())

//there is a "_id" property which is provided by mongo db schema itself even you dont declare it which is used by these inbuilt functions

export const deleteUserById=(id:string)=>UserModel.findOneAndDelete({_id:id});
export const updateUserbyId=(id:string,values:Record<string,any>)=>UserModel.findByIdAndUpdate(id,values);
 