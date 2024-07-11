import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 
  socketId: { type: String }  // Add the socketId field here
 
  
});

const User = mongoose.model('User', userSchema);
export default User;
