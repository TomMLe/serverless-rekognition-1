# Photo Reader Front end
__Link__ : www.read.photos

A web application that allows users to easily manage and analyze their collection of photos. Each photo is analyzed by AWS Rekognition. The result is the users will receive labels describing the photo. For students or any one who wants to get the texts in the picture, the application also produces any detected text.

## Front end: 
* Written by React framework along with react-bootstrap for a smoother look
* Link the backend with AWS amplify. 
* Route with react-router-dom

## Back end: 
Take advantage of the scalability and price effieciency of AWS serverless architecture.
* Storage: S3, DynamoDB 
* API & Compute: API Gateway, Lambda
* Authentication: Cognito
* DNS & CDN: Route53, Cloudfront
* HTTPS & SSL certificate: AWS Certificate Manager
* Machine Learning: Rekognition API
* Helper package(s): serverless, api-cli-test
