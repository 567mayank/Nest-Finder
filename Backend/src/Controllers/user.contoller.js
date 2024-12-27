import Property from "../Models/Property.model.js"
import User from "../Models/User.model.js"
import jwt from "jsonwebtoken"
import {uploadOnCloudinary, destroy} from '../Utils/cloudinary.utils.js'
import mongoose from "mongoose"

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
    // delete user.


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

const userInfo = async(req,res) => {
  return res.status(200).json(
    {
      message : "User Info Fetched Successfully",
      user : req.user
    }
  )
}

const isLoggedin = async(req,res) => {
  const token = req?.cookies.token
  if(!token) {
    return res.status(200).json(
      {
        message : "User is not Logged In",
        isLoggedin : false,
      }
    ) 
  }
  try {
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken._id).select("-password -__v -listedPropertyForSale -listedPropertyForRent")
    if(!user){
      return res.status(200).json(
        {
          message : "User is not Logged In",
          isLoggedin : false,
        }
      ) 
    }
    return res.status(200).json(
      {
        message : "User is Logged In",
        isLoggedin : true,
        user
      }
    )
  } catch (error) {
    return res.status(200).json(
      {
        message : "User is not Logged In",
        isLoggedin : false,
      }
    ) 
  }
}

const updatePersonalInfo = async(req,res) => {
  const userId = req.user?._id
  if(!userId){
    return res.status(400).json({message:"Unathorized Access"})
  }
  try {
    const {phone,email,dob,fullName} = req.body
    if(!phone || !email || !dob || !fullName){
      return res.status(400).json({message:"All Field/Data Required"})
    }
    const user = await User.findOneAndUpdate(
      {
        _id : userId
      },
      {
        $set : {
          phone,
          email,
          dob,
          fullName
        }
      },
      {
        new : true
      }
    ).select("-password -__v -listedPropertyForSale -listedPropertyForRent")

    if(!user){
      return res.status(404).json({message:"Internal Server Error in Updating User Personal Info"})
    }
    return res.status(200).json(
      {
        message : "User Personal Info Updated Successfully",
        user
      }
    )
  } catch (error) {
    console.error("Error in Updating personalInfo",error)
    return res.status(500).json({message:"Internal Server Error"})
  }
}

const upadteUserAvatar = async(req, res) => {
  const userId = req?.user?._id 
  if (!userId) {
    return res.status(401).json({message : "Unauthorized Access"})
  }
  try {
    const {prevImage} = req.body
    const avatarPath = req?.file?.path
    if (!avatarPath) {
      return res.status(400).json({message : "No Image provided"})
    }
    const avatar = await uploadOnCloudinary(avatarPath)
    if(!avatar) {
      return res.status(500).json({message : "Internal Server error in uploading image in cloudinary"})
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set : {
          avatar : avatar.url
        }
      },
      {new : true}
    )

    if (prevImage) {
      const publicId = prevImage.split('/').pop().split('.')[0]; 
      await destroy(publicId); 
    }


    return res.status(200).json({
      message : "Avatar Updated Successfully",
      avatar : user.avatar
    })
  } catch (error) {
    console.log("Internal Server Error in updating avatar", error)
    return res.status(500).json({message : "Ineternal Server Error in updating avatar of User"})
  }
}

const updateSocketId = async(req,res) => {
}

const removeSocketId = async(req,res) => {
}

const sendRequest = async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const { message, propertyId } = req?.body;
    const ownerId = req?.params.ownerId;

    if (!message || !propertyId) {
      return res.status(400).json({ message: "Message and Property ID are required" });
    }
    if (!ownerId) {
      return res.status(400).json({ message: "Owner ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(propertyId) || !mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ message: "Invalid ObjectId provided" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.requestSent.length >= 5) {
      return res.status(400).json({ message: "You cannot send more than 5 requests" });
    }

    const isPropertyAlreadyRequested = user.requestSent.some(request => request.property.toString() === propertyId.toString());
    if (isPropertyAlreadyRequested) {
      return res.status(400).json({ message: "You have already sent a request for this property" });
    }

    const requests = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          requestSent: {
            owner: ownerId,
            property: propertyId,
            message, 
          },
        },
      },
      { new: true, upsert: true } 
    );

    if (!requests) {
      return res.status(404).json({ message: "Failed to update requestSent" });
    }

    await User.findByIdAndUpdate(
      ownerId,
      {
        $push: {
          requestReceived: {
            sender: userId,
            property: propertyId,
            message, 
          },
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: "Request sent successfully",
      requests: requests.requestSent, 
    });
  } catch (error) {
    console.error("Sending Request Error", error);
    return res.status(500).json({ message: "Internal Server Error in Send Request" });
  }
};

const getRequest = async (req, res) => {
  const userId = req?.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const user = await User.findById(userId)
      .populate({
        path: 'requestSent',
        populate: [
          { path: 'owner', select: 'fullName email avatar' },  
          { path: 'property', select: 'title description media' }, 
        ]
      })
      .populate({
        path: 'requestReceived',
        populate: [
          { path: 'sender', select: 'fullName email avatar' }, 
          { path: 'property', select: 'title description media' },  
        ]
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Requests fetched successfully",
      requestSent: user.requestSent,
      requestReceived: user.requestReceived
    });

  } catch (error) {
    console.error("Error in fetching Requests", error);
    return res.status(500).json({ message: "Internal Server Error in fetching message request" });
  }
};


export {
  login,
  registerUser,
  logout,
  userInfo,
  isLoggedin,
  updatePersonalInfo,
  upadteUserAvatar,
  updateSocketId,
  removeSocketId,
  sendRequest,
  getRequest
}