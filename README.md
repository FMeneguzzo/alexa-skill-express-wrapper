# Alexa Skill Express Wrapper
This project aims to provide an easy option for Amazon Alexa Skills developers to leverage their own local environment for **development and testing purposes** by simulating the AWS Lambda environment.

The project is intended for Lambda functions using Node.js as runtime and uses Express.js as a web framework to expose the local Lambda endpoint.
A similar approach can be used for different Node.js web frameworks.

The local endpoint needs to be further exposed to the internet in a secure way, in order to be eligible to accept requests and respond to the Alexa service. Read more on hosted web services requirements [here](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-a-web-service.html).

The demonstration uses [Ngrok](https://ngrok.com/) as tunneling tool to expose the Lambda endpoint to the internet.

**While this configuration is sufficient to effectively host an Alexa Skill, it is meant only for development and testing purposes and as such it should not be used as a production environment.**

## Prerequisites
1. Node.js and `npm` must be installed in your local environment. (https://nodejs.org/en/download/)
2. You must have an [Amazon developer account](https://developer.amazon.com/) in order to create an Alexa Skill. For the purpose of the demonstration it is assumed that you already have an existing Skill and a Lambda function "compliant" source code. (You can find code samples and documentation [here](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)) 

## Instructions
1. Install the dependencies from the root folder of the project.
```bash
npm install
```
2. The project contains a placeholder script (will not work with any Alexa Skill) that will be required in the main file; a proper handler needs to be provided by your code. Copy your Lambda function source code in this project's folder and install its dependencies from the root folder of your own Lambda function project.
**As a guideline, the script that exposes the Lambda handler will be required from `/lambda/src/index.js`. If you want to use a different project structure, make sure to change the following line of code in `/index.js` to require the correct JavaScript file for your configuration.**
```javascript
const lambda = require('./lambda/src');
```
3. Start the Express.js wrapper from the root folder of the project. The default listening port is 3000, but it can be configured via Node.js process environment.
```bash
# Default port 3000
npm start
# Set port via process environment  
PORT=4000 npm start
```
4. Expose your local endpoint to the internet. This demonstration uses Ngrok to achieve this, but you can use any tunneling/reverse proxy tool that works for you. Follow the [instructions to get started](https://dashboard.ngrok.com/get-started) and, with the start command, set the same port that Express.js is listening on. For example, if you are using the default port 3000:
```bash
./ngrok http 3000
```
5. Get the HTTPS hostname assigned to you by Ngrok. You can find it on your Ngrok dashboard under the **Status** section, or from the shell you started it from.
```bash
Forwarding                    https://xxxxxxxx.ngrok.io -> localhost:3000
```
6. Go to your [Alexa Skill Kit Developer Console](https://developer.amazon.com/alexa/console/ask) and select your desired skill. In the build panel you can use the **Endpoint section** to specify the endpoint your skill will contact. Choose the **HTTPS** option: in the Default Region URI input write down your Ngrok HTTPS hostname, and select the second SSL certificate type (`My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority`). When you are done, save the Endpoints with the button at the top of the section.

Your skill will now call your local endpoint when invoked; you can test this by checking the Ngrok inspector or by logging request directly at code level.
