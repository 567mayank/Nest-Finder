import Favourite from '../Models/Favourite.model.js' 
import Property from '../Models/Property.model.js';

const updateFav = async (req, res) => {
  const userId = req?.user?._id;
  
  if (!userId) {
    return res.status(400).json({ message: "Unauthorized Access" });
  }
  
  const propertyId = req.params.propertyId;
  
  if (!propertyId) {
    return res.status(400).json({ message: "Property Id Not Provided" });
  }
  
  try {
    const existingFavorite = await Favourite.findOne({ user: userId, property: propertyId });

    if (existingFavorite) {
      // Deleting Old Fav
      await existingFavorite.deleteOne();
      await Property.findByIdAndUpdate(
        {
          _id : propertyId
        },
        {
          $inc : {
            favourite : -1
          }
        }
      )
      return res.status(200).json({ message: "Favorite removed successfully" });
    } 

    // creating new one if old doesn't exist
    const newFavorite = new Favourite({ user: userId, property: propertyId });
    await newFavorite.save();
    await Property.findByIdAndUpdate(
      {
        _id : propertyId
      },
      {
        $inc : {
          favourite : 1
        }
      }
    )
    return res.status(201).json({ message: "Favorite added successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error in Updating Favourite Info" });
  }
}

const userFavourite = async(req,res) => {
  const userId = req?.user?._id;
  if(!userId) {
    return res.status(401).json({message : "Unautorized Access"})
  }
  try {
    const favProperty = await Favourite.find(
      {
        user : userId
      }
    )
    return res.status(200).json(
      {
        message : "Fetched SuccesFully",
        favProperty
      }
    )
  } catch (error) {
    return res.status(500).json({message : "Internal Server Error in Fetching User Favourite Properties"})
  }
}

export { 
  updateFav,
  userFavourite
};
