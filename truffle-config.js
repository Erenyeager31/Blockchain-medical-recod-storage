module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",    // Ganache host
      port: 7545,           // Ganache port (check your Ganache settings if different)
      network_id: "*",      // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",     // Solidity version you want to use
    },
  },
};
