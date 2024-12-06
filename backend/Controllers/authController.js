const User = require("../Models/userModel");
const bcrypt = require ("bcryptjs");
const generateTokenAndSetCookie =  require("../utils/generateToken.js");


const Signup = async(req, res) => {
try {
 const {username, name,  password} = req.body;
  
 

    const existingUser = await User.findOne({username});

    if (existingUser) {
       return res.status(400).json({
          error: "username is already  taken"
       })
    };

   
    if (password.length < 6)  {
       return res.status(400).json({
          error: "Password must be at least 6 characters"
       })
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({
       name,
       
       username,
       password: hashedPassword
    });

    if(newUser) {
       generateTokenAndSetCookie(newUser._id, res);
       await newUser.save();

       return res.status(201).json({
          id: newUser._id,
          name: newUser.name,
          username: newUser.username,
         
       
       })
    } else {
       res.status(400).json({
          error: "Invalid user data"
       })
    }

 }

 catch (error) {
   console.log( "Error in signup controller",error.message)
   res.status(500).json({
  error:  "Internal server error"
   })
}

} 


 const  Login = async(req, res) => {
 try {

    const {username, password} = req.body;
    
    const user = await User.findOne({username});
       
    if ( !user) {
       res.status(400).json({error: "Invalid username or password"});
    };
    const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

    if ( !isPasswordCorrect) {
       res.status(400).json({error: "Invalid username or password"})
    };
    
    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
       id: user._id,
       name: user.name,
       email: user.email,
       username: user.username,
      
      


    })


 } catch (error) {
    console.log( "Error in login controller",error.message)
   res.status(500).json({
  error:  "Internal server error"
   })
 }
};

 const Logout = async(req, res) => {
 try { 
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
       message: " successfuly logged out"
      })
 } catch (error) {
    console.log( "Error in logout controller",error.message)
    res.status(500).json({
   error:  "Internal server error"
    })
 }

  
  
};


module.exports = {Signup, Login, Logout};

