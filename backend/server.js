const express = require('express')
const openAI = require('openai');
const app = express()
const port = 3001
const cors = require('cors');
require("dotenv").config();

const openai = new openAI({
    apiKey: process.env.API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/callAPI', async (req, res) => {
    let body = req.body;
    console.log(req.body);
    let prompt = `Provide valid JSON output. Generate a ${body.cuisine} recipe based on the following ingredients: ${body.ingridients}. Make sure to include additional ingredients and spices that may be needed to complete this recipe.
Provide the columns 'name', 'difficulty', 'prep_time', 'cook_time', 'total_time', 'servings', 'ingredients', 'instructions', and 'notes'. 'ingredients' should be an array of JSON objects with the name of the ingredient in column 'name', and 'quantity'. 'instructions' should be an array of steps to prepare and cook the recipe. 'notes' should also be an array. 'notes' can have zero or more elements.
`;
    const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
        messages: [
            {
            role: "system",
            content:
                // "Provide output in valid JSON. The data schema should be like this: ",
                "Provide output in valid JSON.",
            },
            { role: "user", content: prompt },
        ],
        // temperature: 1,
        // max_tokens: 256,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
        });
        res.send(JSON.parse(result.choices[0].message.content));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// const example = {
// name: "Spaghetti Carbonara",
// difficulty: "Medium",
// prep_time: "10 minutes",
// cook_time: "15 minutes",
// total_time: "25 minutes",
// servings: 4,
// ingredients: [
//     {
//     name: "Spaghetti pasta",
//     quantity: "400g",
//     },
//     {
//     name: "Bacon",
//     quantity: "200g",
//     notes: "diced",
//     },
//     {
//     name: "Eggs",
//     quantity: "4",
//     },
//     {
//     name: "Parmesan cheese",
//     quantity: "150g",
//     notes: "grated",
//     },
//     {
//     name: "Black pepper",
//     quantity: "to taste",
//     },
//     {
//     name: "Salt",
//     quantity: "to taste",
//     },
// ],
// instructions: [
//     "Cook the spaghetti pasta according to package instructions until al dente. Drain and set aside.",
//     "In a large skillet, cook the diced bacon over medium heat until crispy. Remove from skillet and drain on paper towels.",
//     "In a bowl, whisk together the eggs and grated Parmesan cheese.",
//     "Add the cooked spaghetti to the skillet with the bacon fat, and toss to coat the spaghetti with the fat.",
//     "Remove the skillet from heat.",
//     "Quickly pour the egg and cheese mixture over the spaghetti, stirring quickly to coat the spaghetti evenly and create a creamy sauce. The residual heat from the spaghetti will cook the eggs.",
//     "Season with black pepper and salt to taste.",
//     "Serve immediately, garnished with additional grated Parmesan cheese and chopped parsley if desired.",
// ],
// notes: [
//     "Be sure to toss the spaghetti quickly with the egg and cheese mixture to prevent the eggs from scrambling.",
//     "You can add a clove of minced garlic to the bacon while cooking for extra flavor, if desired.",
// ],
// };

