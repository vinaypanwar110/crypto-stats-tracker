import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  coin: {
    type: String,
    enum: ["bitcoin", "ethereum", "matic-network"],
  },
  price: Number,
  marketCap: Number,
  "24hChange": Number,
});

const data = mongoose.model("data", dataSchema);

export default data;
