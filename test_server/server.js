const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // or any other port you prefer

app.use(bodyParser.json());

app.post('/sendRequest', async (req, res) => {
    const data = req.body;
    const username = data.username;
    const query = data.query;
    const variables = data.vars;
    

    if (!username) {
        return res.status(400).json({"error": "Username is required"});
    }

    // GraphQL query and variables
    const graphqlQuery = {
        "query": query,
        "variables": variables
    };

    // Headers for the POST request to LeetCode
    const headers = {
        "referer": `https://leetcode.com/${username}/`,
        "Content-Type": "application/json"
    };

    // URL for LeetCode GraphQL API
    const url = "https://leetcode.com/graphql/";

    try {
        // Making the POST request to LeetCode
        const response = await axios.post(url, graphqlQuery, { headers: headers });

        // Debug

        // const log = {}
        // log[`${username}`] = response.data.data;
        // console.log(log);
        // console.log("\n" + "--------------------------------------------------------------------------------------" + "\n")

        
        return res.send(response.data);
    } catch (error) {
        console.error("Error making POST request:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});