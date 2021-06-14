const { version } = require("../package.json");
const rinkeby = require("./daos/rinkeby.json");
const xdai = require("./daos/xdai.json");
//const polygon = require("./daos/polygon.json");

module.exports = function buildList() {
  const parsed = version.split(".");
  return {
    name: "Gardens DAO List",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "ipfs://Qma4TXHsoK3yVtEGCRVeezfVGzokPGLC49Hhyvd9Lf4x2j",
    keywords: ["1Hive", "gardens"],
    daos: [...xdai,...rinkeby]
  };
};