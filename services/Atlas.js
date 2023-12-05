const axios = require('axios');
const {response} = require("express");

module.exports = {

    insertOne: async (collection, postData)=>{
        var options = {
            method: 'POST',
            url: process.env.DB_API_URL + 'action/insertOne',
            headers:
                {
                    apiKey: process.env.DB_API_KEY,
                    'Content-Type': 'application/json'
                },
            data:
                {
                    "dataSource": "Cluster0",
                    "database": process.env.DB_DATABASE,
                    "collection": collection,
                    ...postData
                },
            json: true
        };
        // console.log(options);
        return await axios(options);

    },

    findOne:  async (collection,postData) => {
        var options = {
            method: 'POST',
            url: process.env.DB_API_URL + 'action/findOne',
            headers:
                {
                    apiKey: process.env.DB_API_KEY,
                    'Content-Type': 'application/json'
                },
            data:
                {
                    "dataSource": "Cluster0",
                    "database": process.env.DB_DATABASE,
                    "collection": collection,
                    ...postData
                },
            json: true
        };
        // console.log(options);
        return await axios(options);
    },

    updateOne: async (collection, postData)=>{
        var options = {
            method: 'POST',
            url: process.env.DB_API_URL + 'action/updateOne',
            headers:
                {
                    apiKey: process.env.DB_API_KEY,
                    'Content-Type': 'application/json'
                },
            data:
                {
                    "dataSource": "Cluster0",
                    "database": process.env.DB_DATABASE,
                    "collection": collection,
                    ...postData
                },
            json: true
        };
        console.log(options);
        return await axios(options);

    },

};