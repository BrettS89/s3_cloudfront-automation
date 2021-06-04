const { IAMClient, CreateUserCommand } = require('@aws-sdk/client-iam');
const region = 'us-east-1';

const client = new IAMClient({ region });

const run = async policyARN => {
  try {
    const command = new CreateUserCommand({ UserName: 'MyTestUser2', PermissionsBoundary: policyARN });
    const response = await client.send(command);
    return response;
  } catch(e) {
    console.log('create user error', e);
  }
};

module.exports = run;
