import Property from "../Models/Property.model.js";
import User from "../Models/User.model.js";

const listProperty = async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    return res.status(400).json({ message: "Unauthorized Access" });
  }

  try {
    const {
      title,
      propType,
      listingType,
      address,
      neighborhood,
      city,
      state,
      zip,
      area,
      bedrooms,
      floor,
      parkingAvailable,
      furnishingStatus,
      propAge,
      description,
      media,
      paymentTerms,
      amount,
      securityDeposit,
      negotiability,
      currency,
      msgThroughApp,
      msgThroughPhone,
      msgThroughEmail,
      phone,
      email,
    } = req.body;

    const newProperty = await Property.create({
      title,
      propType,
      listingType,
      address,
      neighborhood,
      city,
      state,
      zip,
      area,
      bedrooms,
      floor,
      parkingAvailable,
      furnishingStatus,
      propAge,
      description,
      media, 
      paymentTerms,
      amount,
      securityDeposit,
      negotiability,
      currency,
      msgThroughApp,
      msgThroughPhone,
      msgThroughEmail,
      phone,
      email,
      owner : userId
    });

    if (!newProperty) {
      return res.status(400).json({ message: "Failed to create property" });
    }
    if(listingType.toLowerCase()==="sale") {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: { listedPropertyForSale: newProperty._id },
        },
        { new: true } 
      );
    }
    else {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: { listedPropertyForRent: newProperty._id },
        },
        { new: true } 
      );
    }
    

    return res.status(201).json({
      message: "Property listed successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const listAllProperty = async (req, res) => {
  try {
    const properties = await Property.
                      find().
                      select("-zip -msgThroughPhone -msgThroughEmail -msgThroughApp -email -phone -description -createdAt -updatedAt -__v").
                      populate({
                        path : "owner",
                        select : "avatar fullName userName"
                      })

    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }

    return res.status(200).json({
      message: "Properties fetched successfully",
      properties
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const listSingleProperty = async (req,res) => {
  const propertyId = req.params.propertyId
  if(!propertyId){
    return res.status(400).json({message : "CourseId not Provided"})
  }
  try {
    const property = await Property.findById(propertyId).select("-__v -updatedAt -createdAt ").populate({
      path : "owner",
      select : "avatar fullName userName"
    })
    if(!property){
      return res.status(404).json({message : "Property Not Found"})
    }
    return res.status(200).json({
      message : "Property Data Fetched Successfully",
      property
    })
  } catch (error) {
    console.error("Internal Server Error in Fetching Single Property data",error)
  }
};

const listRentedProperty = async (req,res) => {
  const userId = req?.user?._id
  if(!userId){
    return res.status(401).json({message : "Unathorized Access"})
  }
  try {
    const userRentedProperty = await User.findById(userId)
    .select("listedPropertyForRent")
    .populate({
      path: "listedPropertyForRent",
      select: "title listingType currency amount media paymentTerms"
    });

    if(!userRentedProperty){
      return res.status(404).json({message : "No Rented Property Found"})
    }
    return res.status(200).json(
      {
        message : "User Rented Property Fetched Successfully",
        rentedProperties : userRentedProperty.listedPropertyForRent
      }
    )
  } catch (error) {
    console.error("Error in fetching rentedProperty Data",error)
    return res.status(500).json({message : "Internal Server Error in Fetcing Rented Property Data"})
  }
};

const listSaleProperty = async (req,res) => {
  const userId = req?.user?._id
  if(!userId){
    return res.status(401).json({message : "Unathorized Access"})
  }
  try {
    const userSaleProperty = await User.findById(userId)
    .select("listedPropertyForSale")
    .populate({
      path: "listedPropertyForSale",
      select: "title listingType currency amount media" 
    });

    if(!userSaleProperty){
      return res.status(404).json({message : "No sale Property Found"})
    }
    return res.status(200).json(
      {
        message : "User Sale Property Fetched Successfully",
        saleProperties : userSaleProperty.listedPropertyForSale
      }
    )
  } catch (error) {
    console.error("Error in fetching saleProperty Data",error)
    return res.status(500).json({message : "Internal Server Error in Fetcing Sale Property Data"})
  }
};

export {
  listProperty,
  listAllProperty,
  listRentedProperty,
  listSaleProperty,
  listSingleProperty
}