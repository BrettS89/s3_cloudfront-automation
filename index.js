require('dotenv').config();
const createBucket = require('./bucket');
const createPolicy = require('./policy');
const createUser = require('./user');
const createAccessKeys = require('./access-key');
const createCloudfrontDistribution = require('./cloudfront');

/*
  SHOULD RETURN
    - AccessKeyId
    - SecretAccessKey
    - Bucket name
    - s3 Bucket Key
    - Cloudfront Key
*/

(async () => {
  try {
    const { bucketName } = await createBucket('api-test-bucket422');
    const cloudfront = await createCloudfrontDistribution(bucketName);
    const policyARN = await createPolicy(bucketName);
    const user = await createUser(policyARN);
    const accessKeys = await createAccessKeys(user.User.UserName);

    return {
      awsAccessKeyId: accessKeys.AccessKey.AccessKeyId,
      awsSecretAccessKey: accessKeys.AccessKey.SecretAccessKey,
      bucketName: bucketName,
      bucketKey: `https://${bucketName}.s3.amazonaws.com`,
      cloudfrontKey: `https://${cloudfront.Distribution.DomainName}`,
    }
  } catch(e) {
    console.log(e);
  }
})();
