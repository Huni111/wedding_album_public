import client from './config/appwrite_config';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('667567b9002c639b598a');

export default client;
