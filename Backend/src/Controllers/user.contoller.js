import User from "../Models/User.model.js"

const login = async(req,res) => {
  const {email,userName,password} = req.body
  if(!password || (!email && !userName) ) {
    return res.status(400).json({
      message : "All Credentials are required"
    })
  } 

  if(typeof password === String) password = String(password)
  try {
    let user = await User.findOne({
      $or : [{ userName },{ email }]
    })
    .select(" -__v")

    if(!user) {
      return res.status(400).json({
        message : "Credentials Wrong"
      })
    }
    const verification = await user.isPasswordCorrect(password)

    if(!verification){
      return res.status(400).json({
        message : "Credentials Wrong"
      })
    }

    const token = await user.generateToken()

    if(!token){
      return res.status(500).json({
        message : "Internal Server error in generating Token"
      })
    }


    user = user.toObject();  
    delete user.password;


    const options = {
      httpOnly : true,
      secure: false, 
    }


    return res
    .status(200)
    .cookie("token",token,options)
    .json({
      message : "Successfully Loggedin",
      user ,
      token
    })

  } catch (error) {
    console.error("Error in login",error)
    return res.status(500).json({
      message : "Internal Server error"
    })
  }
}

const registerUser = async(req,res) => {
  const {userName,fullName,email,password} = req.body
  if(!userName || !fullName || !email || !password) {
    return res.
      status(400).
      json({
        message : "All Credentials are required"
      })
  }
  try {
    const existingUser = await User.findOne({
      $or : [{userName},{email}]
    })
    if(existingUser){
      return res.status(400).json({
        message : "User with same username/Email already Exist"
      })
    } 
    const user = await User.create({
      userName,
      fullName,
      email,
      password
    })

    if(!user) {
      return res.
      status(500).
      json({
        message : "Internal Server Error in creating user"
      })
    }

    res.
    status(200).
    json({
      message : "Registeration Successfull"
    })
  } catch (error) {
    console.error("Error in registering user",error)
    return res.status(500).json({
      message : "Internal Server Error"
    })
  }
}

const logout = async(req,res) => {
  return res.status(200).clearCookie("token").json({message:"Succeffully logout"})
}

export {
  login,
  registerUser,
  logout
}