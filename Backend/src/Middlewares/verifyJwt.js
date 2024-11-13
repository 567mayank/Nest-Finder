import User from "../Models/User.model.js";

const verifyJwt = async(req,res,next) => {
  const token =  req.cookies?.token
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }
    try {
      const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await User.findById(decodedValue._id).select("-password")
      if (admin) {
        req.admin = admin;  
        next();  
      } else {
        return res.status(403).json({ message: "You are not authenticated!" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid Token" });
    }
}

export default verifyJwt