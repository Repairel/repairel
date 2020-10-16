module.exports = {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: process.env.AWSAccessKeyId,
      secretAccessKey: process.env.AWSSecretKey,
      region: "eu-west-2",
      params: {
        Bucket: "repairel-images",
      },
    },
};

