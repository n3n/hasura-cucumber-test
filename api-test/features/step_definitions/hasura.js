const assert = require("assert");
const { Before, Given, When, Then } = require("@cucumber/cucumber");
const fs = require("mz/fs");
const path = require("path");
const { GraphQLClient, gql } = require("graphql-request");

Before(function () {
  this.headers = {};
});

function readFile(filePath) {
  const absoluteFilePath = path.join(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absoluteFilePath).toString("utf8");
  return fileContent;
}

Given(/query by "(.*)"/, async function (filePath) {
  this.query = gql`
    ${readFile(filePath)}
  `;
});

Given(/variables by "(.*)"/, async function (filePath) {
  this.variables = JSON.parse(readFile(filePath));
});

Given(/header (.*) = "(.*)"/, async function (headerName, value) {
  this.headers[headerName] = value;
});

When("receive a response", async function () {
  const client = new GraphQLClient("http://localhost:8080/v1/graphql", {
    headers: this.headers,
  });

  this.response = await client.rawRequest(this.query, this.variables);
});

Then("status {int}", async function (status) {
  const { data, headers } = this.response;
  assert.strictEqual(this.response.status, status);
});
