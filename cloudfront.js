const { CloudFrontClient, CreateDistributionCommand } = require('@aws-sdk/client-cloudfront');

const client = new CloudFrontClient({ region: 'us-east-1' });

const run = (bucketName) => {
  const command = new CreateDistributionCommand({ DistributionConfig: {
      Enabled: true,
      Comment: `${bucketName} bucket cloudfront distribution`,
      CallerReference: new Date().toISOString(),
      Origins: {
        Items: [
          {
            DomainName: `${bucketName}.s3.amazonaws.com`,
            Id: bucketName,
            S3OriginConfig: { OriginAccessIdentity: '' },
          }
        ],
        Quantity: 1,
      },
      DefaultCacheBehavior: {
        TargetOriginId: bucketName,
        ViewerProtocolPolicy: 'redirect-to-https',
        MinTTL: 1000,
        ForwardedValues: {
          Cookies: { Forward: 'all' },
          Headers: { Quantity: 0 },
          QueryString: false,
          QueryStringCacheKeys: { Quantity: 0 }
        },
      },
    },
  });

  return client.send(command);
};

module.exports = run;
