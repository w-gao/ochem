#!/usr/bin/env node

console.log("Running post build...");

const fs = require("fs");
const date = new Date();

const path = "build/env.json";
const data = JSON.stringify({
    BUILD_DATE: date.toLocaleDateString(),
    BUILD_TIME: date.toLocaleTimeString(),
    SITE_ID: process.env.SITE_ID,
    LANGUAGE: process.env.LANGUAGE,
    BRANCH: process.env.BRANCH,
    URL: process.env.URL,
    CACHED_COMMIT_REF: process.env.CACHED_COMMIT_REF,
    COMMIT_REF: process.env.COMMIT_REF,
    DEPLOY_URL: process.env.DEPLOY_URL,
    HEAD: process.env.HEAD,
    CONTEXT: process.env.CONTEXT,
    BUILD_ID: process.env.BUILD_ID,
    PULL_REQUEST: process.env.PULL_REQUEST,
    DEPLOY_PRIME_URL: process.env.DEPLOY_PRIME_URL,
    DEPLOY_ID: process.env.DEPLOY_ID,
    REPOSITORY_URL: process.env.REPOSITORY_URL,
    SITE_NAME: process.env.SITE_NAME
});

fs.writeFile(path, data, function (err) {
    if (err) return console.log(err);

    console.log(data);
    console.log("=> " + path);
});

console.log("Complete!");
