const axios = require("axios");

async function fetchIndianTrends() {
  try {
    const res = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_trends_trending_now",
        geo: "IN",
        api_key: process.env.SERPAPI_KEY
      }
    });

    const raw = res.data.trending_searches || [];

    const queries = raw
      .map(item => item.query || item.title)
      .filter(Boolean);

    return queries;

  } catch (err) {
    console.error("SerpAPI Error:", err.message);

    return [
      "mango dessert",
      "cold coffee",
      "chicken tikka",
      "street food snacks"
    ];
  }
}
function filterFoodTrends(trends) {
  const foodKeywords = [
    "food", "recipe", "chicken", "biryani", "pizza", "burger",
    "cake", "dessert", "coffee", "tea", "juice", "shake",
    "mango", "chocolate", "paneer", "roll", "fries",
    "street food", "snack", "ice cream", "drink"
  ];

  return trends.filter(trend =>
    foodKeywords.some(keyword =>
      trend.toLowerCase().includes(keyword)
    )
  );
}

module.exports = { 
  fetchIndianTrends,
  filterFoodTrends
};