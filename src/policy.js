const fetch = require('node-fetch');

policy = async (url, settings) => {
    try {
        const response = await fetch(url, settings);
        const json = await response.json();
        return json
    } catch (error) {
        console.log(error);
    }
};

module.exports.getPolicy = (url, settings) => {
    return policy(url, settings);
};