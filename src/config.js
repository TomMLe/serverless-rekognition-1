export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-west-2",
    BUCKET: "serverless-rekognition-photos"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://c9kfxh1kj0.execute-api.us-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_rca7MbHZO",
    APP_CLIENT_ID: "78tlmhue3brjljh79lr244260g",
    IDENTITY_POOL_ID: "us-west-2:60591c21-efca-40c1-b2f5-50cf5f3e869b"
  }
};
