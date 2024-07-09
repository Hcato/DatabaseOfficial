module.exports = {
    apps: [
      {
        // Nombre de la aplicación
        name: 'newact1',
        // Ubicación de archivo principal del build
        script: 'index.ts',
        env: {
          // Datos del .env
          DB_HOST: '127.0.0.1',
          DB_PORT: 3306,
          DB_USER: 'root',
          DB_PASSWORD: 'quesobadin',
          DB_NAME: 'test',
          PORT: 3000,
          SECRET: 'wenas'
        },
        env_production: {}
      }
    ]
  };