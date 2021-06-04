const { IAMClient, CreateAccessKeyCommand } = require('@aws-sdk/client-iam');
const client = new IAMClient({ region: 'us-east-1' });

const run = async (UserName) => {
  console.log(UserName);
  const command = new CreateAccessKeyCommand({ UserName });
  return client.send(command);
};

module.exports = run;
