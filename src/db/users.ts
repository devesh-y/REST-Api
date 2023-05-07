import mongoose from "mongoose";

//"select" means the field should be included or excluded by default when querying documents from the MongoDB database.
//"salt" refers to a random value that is added to a user's password before hashing it.

const UserSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    authentication:{
        password:{type:String, required:true, select :false},
        salt:{type:String,select :false},
        sessionToken:{type:String, select:false}
    }
});
export const UserModel=mongoose.model('User',UserSchema);
export const getUsers=()=>UserModel.find();
export const getUserbyEmail=(email:string)=>UserModel.findOne({email});
export const getUserbySessionToken=(sessionToken:string)=>UserModel.findOne({
    'authentication.sessionToken':sessionToken,

});

export const getUserById=(id:string)=>UserModel.findById(id);
export const createUser=(values:Record<string,any>)=> new UserModel(values).save().then((user)=>user.toObject())
export const deleteUserById=(id:string)=>UserModel.findOneAndDelete({_id:id});
export const updateUserbyId=(id:string,values:Record<string,any>)=>UserModel.findByIdAndUpdate(id,values);
 