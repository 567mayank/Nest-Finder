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

export {
  listProperty
}