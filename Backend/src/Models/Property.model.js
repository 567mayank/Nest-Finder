import mongoose,{Schema} from "mongoose";

const PropertySchema = new Schema({
  title : {
    type : String,
    required : true
  },
  PropertyType : {
    type : String,
  },
  Status : {
    type : String,
    required : true,
    enum: ["Rent","Buy","Sell"]
  },
  Price : {
    type : Number,
    required : true
  }

},{timestamps : true})

const Property = mongoose.model("Property",PropertySchema)

export default Property