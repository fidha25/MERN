const User = require('../models/Student.js');

 const Create= async (req,res)=>{
    try{
    const userData=new User(req.body)
    const {email}=userData;
    const userExist=await User.findOne({email})
    if(userExist){
        return res.status(401).json({message:'user already exist'})
    }
    const savedData=await userData.save()
    res.status(200).json({ message: "User created successfully." });
} catch (error) {
  res.status(500).json({ errorMessage: error.message });
}
};

  const getAllStudents= async (req,res)=>{
    try{
      const userData=await User.find();
      if(!userData || userData===0){
        return res.status(404).json({message:"user not found"});
      }
      res.status(200).json(userData);
      console.log(userData)
    }catch(error){
      res.status(500).json({ errorMessage: error.message });
    }  
    }
  const deleteStudent= async (req,res)=>{
    try{
      const id=req.params.id
      const userExist=await User.findById(id);
      if(!userExist){
        return res.status(401).json({message:'user doesnt exist'})
      }
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully." });
    }
    catch(error){
        res.status(500).json({ errorMessage: error.message });
    }
  }
  const getStudentById=async (req,res)=>{
    try{
      const id=req.params.id
      const userExist=await User.findById(id);
      if(!userExist){
        return res.status(401).json({message:'user doesnt exist'})
      }
      res.status(200).json(userExist);}
      catch(error){
        res.status(500).json({ errorMessage: error.message });
    }
  }

  const updateStudent=async (req,res)=>{
    try{
      const id=req.params.id
      const userExist=await User.findById(id);
      if(!userExist){
        return res.status(401).json({message:'user doesnt exist'})
      }
      const UpdatedData= await User.findByIdAndUpdate(id, req.body, {new:true,});
      res.status(200).json({ message: "User Updated successfully." });
    }
    catch(error){
      res.status(500).json({ errorMessage: error.message });
    }
  }

    module.exports = { Create, getAllStudents, deleteStudent, updateStudent, getStudentById };
