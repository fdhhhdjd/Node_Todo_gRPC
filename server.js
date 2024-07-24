require('module-alias/register');

const app = require('@/app');
const {
  appConfigs: {
    app: { port },
  },
} = require('@/configs');

app.listen(port, () => {
  console.info(`🚀 Server is listening on port http://localhost:${port}`);
});
