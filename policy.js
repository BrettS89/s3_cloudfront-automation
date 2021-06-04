const { CreatePolicyCommand, IAMClient } = require('@aws-sdk/client-iam');
const region = 'us-east-1';
const iamClient = new IAMClient({ region });

const createPolicyObj = (bucketName) => ({
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "VisualEditor0",
          "Effect": "Allow",
          "Action": [
              "s3:PutAccountPublicAccessBlock",
              "s3:GetAccountPublicAccessBlock",
              "s3:ListAllMyBuckets",
              "s3:HeadBucket"
          ],
          "Resource": "*"
      },
      {
          "Sid": "VisualEditor1",
          "Effect": "Allow",
          "Action": "s3:*",
          "Resource": [
            "arn:aws:s3:::" + bucketName,
              "arn:aws:s3:::" + bucketName + "/*"
          ]
      }
  ]
});



const run = async (bucketName) => {
  try {
    const params = {
      PolicyDocument: JSON.stringify(createPolicyObj(bucketName)),
      PolicyName: 'MyTestPolicy',
    };

    const data = await iamClient.send(new CreatePolicyCommand(params));
    return data.Policy.Arn;
  } catch(e) {
    console.log('error', e);
  }
};

module.exports = run;