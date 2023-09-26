// config.js

const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  backendUrl: isDevelopment ? 'http://localhost:5000' : 'https://memetic-server-2.vercel.app'
};

export default config;
