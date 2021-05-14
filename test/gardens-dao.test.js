const packageJson = require("../package.json");
const { expect } = require("chai");
const { getAddress } = require("@ethersproject/address");
const buildList = require("../src/buildList");

// const ajv = new Ajv({ allErrors: true, format: "full" });
// const validator = ajv.compile(schema);

describe("buildList", () => {
  const defaultTokenList = buildList();

  // it("validates", () => {
  //   expect(validator(defaultTokenList)).to.equal(true);
  // });

  it("contains no duplicate addresses", () => {
    const map = {};
    for (let dao of defaultTokenList.daos) {
      const key = `${dao.address}`;
      expect(typeof map[key]).to.equal("undefined");
      map[key] = true;
    }
  });

  it("all addresses are valid and checksummed", () => {
    for (let dao of defaultTokenList.daos) {
      expect(getAddress(dao.address).toLowerCase()).to.eq(
        dao.address.toLowerCase()
      );
    }
  });

  it("contains native token logo", () => {
    for (let dao of defaultTokenList.daos) {
      expect(typeof dao.token.logo).not.equal("undefined");
      expect(dao.token.logo.length).not.equal(0);
    }
  });

  it("contains dao name", () => {
    for (let dao of defaultTokenList.daos) {
      expect(typeof dao.name).not.equal("undefined");
      expect(dao.name.length).not.equal(0);
    }
  });

  it("contains dao logo", () => {
    for (let dao of defaultTokenList.daos) {
      expect(typeof dao.logo).not.equal("undefined");
      expect(dao.logo.length).not.equal(0);
    }
  });

  it("version matches package.json", () => {
    expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
    expect(packageJson.version).to.equal(
      `${defaultTokenList.version.major}.${defaultTokenList.version.minor}.${defaultTokenList.version.patch}`
    );
  });

  it("logos only should be PNG extension", () => {
    for (let dao of defaultTokenList.daos) {
      expect(dao.logo).match(/\.(png|PNG)$/)
      expect(dao.logo_type).match(/\.(png|PNG)$/)
      if (dao.token && dao.token.logo) {
        expect(dao.token.logo).match(/\.(png|PNG)$/)
      }
      if (dao.wrappableToken && dao.wrappableToken.logo) {
        expect(dao.wrappableToken.logo).match(/\.(png|PNG)$/)
      }
    }
  })
});
