// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function generateFoodIdeas(trends) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
// These food trends are popular in India:
// ${trends.join(", ")}

// Suggest 3 viral food items restaurants can add.

// Return ONLY JSON:
// {
//   "trends": [
//     { "name": "", "reason": "", "action": "" }
//   ]
// }
// `;

//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     return JSON.parse(text);

//   } catch (err) {
//     console.error("Gemini Error:", err.message);

//     return {
//       trends: [
//         {
//           name: "Loaded Dessert",
//           reason: "Fallback",
//           action: "Add to menu"
//         }
//       ]
//     };
//   }
// }

// module.exports = { generateFoodIdeas };


async function generateFoodIdeas(trends) {
  const ideasMap = {
    "mango dessert": {
      name: "Mango Cheesecake Jar",
      reason: "Summer mango trend booming in India",
      action: "Launch as limited-time dessert"
    },
    "cold coffee": {
      name: "Loaded Cold Coffee Float",
      reason: "Cold beverages trending in heat",
      action: "Promote as combo drink"
    },
    "chicken tikka": {
      name: "Chicken Tikka Wrap",
      reason: "Street-style wraps going viral",
      action: "Add quick snack item"
    },
    "street food snacks": {
      name: "Korean Cheese Corn Dog",
      reason: "Global street food viral on Instagram",
      action: "Add trendy snack"
    }
  };

  const results = trends.map(t => ideasMap[t]).filter(Boolean);

  // fallback if no match
  if (!results.length) {
    return {
      trends: [
        {
          name: "Loaded Dessert Cups",
          reason: "Dessert layering trend rising",
          action: "Add premium dessert"
        }
      ]
    };
  }

  return { trends: results.slice(0, 3) };
}

module.exports = { generateFoodIdeas };