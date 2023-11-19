import os from 'os';
import fs from 'fs';
import dotenv from 'dotenv';

// Load existing .env file if it exists
let envConfig: { [key: string]: string } = {};
if (fs.existsSync('.env')) {
  envConfig = dotenv.parse(fs.readFileSync('.env', 'utf-8'));
}

// Get network interfaces
const networkInterfaces = os.networkInterfaces();

// Find the IPv4 address
for (const name of Object.keys(networkInterfaces)) {
  for (const net of networkInterfaces[name]!) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    if (net.family === 'IPv4' && !net.internal) {
      envConfig.HOST_IP = net.address;
      break;
    }
  }
}

// Replace ${host_ip} in API_URL with the value of HOST_IP
if (envConfig.API_URL && envConfig.HOST_IP) {
  envConfig.API_URL = envConfig.API_URL.replace('${host_ip}', envConfig.HOST_IP);
}

// Write to .env file
const envConfigString = Object.entries(envConfig).map(([key, value]) => `${key}=${value}`).join('\n');
fs.writeFileSync('.env', envConfigString);

console.log('Host IP address written to .env file.');

// Write to firebase.json file
const firebaseJson = JSON.parse(fs.readFileSync('firebase.json', 'utf-8'));
firebaseJson.emulators.functions.host = envConfig.HOST_IP;
fs.writeFileSync('firebase.json', JSON.stringify(firebaseJson, null, 2));

console.log('Host IP address written to firebase.json file.');
