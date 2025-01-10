import data from "../model/data.js";

const deviation = async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      return res
        .status(400)
        .json({ message: "Invalid or missing coin parameter" });
    }

    const records = await data.find({ coin }).sort({ _id: -1 }).limit(100);

    if (records.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the requested coin" });
    }

    const prices = records.map((record) => record.price);

    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;
    const standardDeviation = Math.sqrt(variance);

    res.status(200).json({ standardDeviation });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default deviation;
