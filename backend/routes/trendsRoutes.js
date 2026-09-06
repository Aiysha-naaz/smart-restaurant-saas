const express = require("express");
const router = express.Router();

const { fetchIndianTrends, filterFoodTrends } = require("../utils/trends");
const { generateFoodIdeas } = require("../utils/ai");

// router.get("/test-trends", async (req, res) => {
//   const trends = await fetchIndianTrends();

//   let foodTrends = filterFoodTrends(trends);

//   // 🔥 Fallback if nothing found
//   if (!foodTrends.length) {
//     foodTrends = [
//       "mango dessert",
//       "cold coffee",
//       "chicken tikka",
//       "street food snacks"
//     ];
//   }

//   res.json(foodTrends);
// });



router.get("/market-trends", async (req, res) => {
  const trends = await fetchIndianTrends();

  let foodTrends = filterFoodTrends(trends);

  // fallback
  if (!foodTrends.length) {
    foodTrends = [
      "mango dessert",
      "cold coffee",
      "chicken tikka",
      "street food snacks"
    ];
  }

  // 🔥 AI step
  const aiResult = await generateFoodIdeas(foodTrends);

  res.json(aiResult);
});


module.exports = router;