import data from "../model/data.js";

const handlefunction = async (req, res) => {
  const { coin } = req.query;
  if (!coin) {
    res.status(400).json({ message: "coin is required" });
    return;
  }
  const url = `https://api.coingecko.com/api/v3/coins/${coin}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const res_data = await response.json();

    const current_price = res_data["market_data"]["current_price"]["usd"];
    const market_cap = res_data["market_data"]["market_cap"]["usd"];
    const hour_change = res_data["market_data"]["price_change_24h_in_currency"]["usd"];

    const newData = new data({
      price: current_price,
      marketCap: market_cap,
      "24hChange": hour_change,
    });

    await newData.save();

    res.status(200).json({
        price: current_price,
        marketCap: market_cap,
        "24hChange": hour_change,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default handlefunction;
