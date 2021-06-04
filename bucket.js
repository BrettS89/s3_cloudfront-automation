const { S3Client, CreateBucketCommand, PutBucketCorsCommand, PutBucketPolicyCommand } = require('@aws-sdk/client-s3');

const client = new S3Client({ region: 'us-east-1' });

const createBucket = (bucketName) => {
  const command = new CreateBucketCommand({ Bucket: bucketName, ObjectLockEnabledForBucket: false });
  return client.send(command);
};

const putCorsPolicy = (bucketName) => {
  const command = new PutBucketCorsCommand({
    Bucket: bucketName,
    CORSConfiguration: {
      CORSRules: [
        {
          "AllowedHeaders": [
            "*"
          ],
          "AllowedMethods": [
            "GET"
          ],
          "AllowedOrigins": [
            "*"
          ],
          "ExposeHeaders": [],
          "MaxAgeSeconds": 3000
        },
        {
          "AllowedHeaders": [
            "*"
          ],
          "AllowedMethods": [
            "PUT"
          ],
          "AllowedOrigins": [
            "*"
          ],
          "ExposeHeaders": []
        },
        {
          "AllowedHeaders": [
            "*"
          ],
          "AllowedMethods": [
            "DELETE"
          ],
          "AllowedOrigins": [
            "*"
          ],
          "ExposeHeaders": []
        }
      ]
    }
  });

  return client.send(command);
};

const putBucketPolicy = (bucketName) => {
  const policy = {
    "Version": "2012-10-17",
    "Statement": [
      {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::" + bucketName + "/*"
      }
    ]
  }

  const command = new PutBucketPolicyCommand({
    Bucket: bucketName,
    Policy: JSON.stringify(policy),
  });

  return client.send(command);
};

const run = async (bucketName) => {
  await createBucket(bucketName);
  await putCorsPolicy(bucketName);
  await putBucketPolicy(bucketName);
  return { success: true, bucketName };
};

module.exports = run;
