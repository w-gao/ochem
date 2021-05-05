#!/usr/bin/env node

console.log("Running post build...");

const fs = require("fs");
const date = new Date();

const path = "build/env.json";
const data = JSON.stringify({
    BUILD_TIME: date.toLocaleString('en-US', {timeZone: 'America/Los_Angeles'}),
    BRANCH: process.env.BRANCH,
    URL: process.env.URL,
    COMMIT_REF: process.env.COMMIT_REF,
    HEAD: process.env.HEAD,
    CONTEXT: process.env.CONTEXT,
    BUILD_ID: process.env.BUILD_ID,
    PULL_REQUEST: process.env.PULL_REQUEST,
    DEPLOY_ID: process.env.DEPLOY_ID,
    // REPOSITORY_URL: process.env.REPOSITORY_URL,
});

fs.writeFile(path, data, function (err) {
    if (err) return console.log(err);

    console.log(data);
    console.log("=> " + path);
});

console.log("Complete!");
