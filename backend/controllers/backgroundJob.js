import cron from "node-cron";
import data from "../model/data.js";

const fetchCryptoData = async () => {
  const coins = ["bitcoin", "ethereum", "matic-network"];
  try {
    for (const coin of coins) {
      const url = `https://api.coingecko.com/api/v3/coins/${coin}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const res_data = await response.json();

      const current_price = res_data.market_data.current_price.usd;
      const market_cap = res_data.market_data.market_cap.usd;
      const hour_change = res_data.market_data.price_change_24h_in_currency.usd;

      const newData = new data({
        coin: coin,
        price: current_price,
        marketCap: market_cap,
        "24hChange": hour_change,
      });

      await newData.save();
    }
  } catch (error) {
    console.error("Error in fetching cryptocurrency data:", error.message);
  }
};

cron.schedule("0 */2 * * *", fetchCryptoData);

