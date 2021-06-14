const packageJson = require("../package.json");
const { expect } = require("chai");
const { getAddress } = require("@ethersproject/address");
const buildList = require("../src/buildList");

// const ajv = new Ajv({ allErrors: true, format: "full" });
// const validator = ajv.compile(schema);

describe("buildList", () => {
  const defaultDaoList = buildList();

  it("contains no duplicate addresses", () => {
    const map = {};
      for (let dao of defaultDaoList.daos) {
        const key = `${dao.chainId}-${dao.address}`;
        expect(typeof map[key]).to.equal("undefined");
        map[key] = true;
      }
  });

  it("all addresses are valid and checksummed", () => {
    for (let dao of defaultDaoList.daos) {
      expect(getAddress(dao.address).toLowerCase()).to.eq(
        dao.address.toLowerCase()
      );
    }
  });

  it("contains dao name", () => {
    for (let dao of defaultDaoList.daos) {
      expect(typeof dao.name).not.equal("undefined");
      expect(dao.name.length).not.equal(0);
    }
  });

  it("contains logo", () => {
    for (let dao of defaultDaoList.daos) {
      if (dao.logo) {
        expect(typeof dao.logo).not.equal("undefined");
        expect(dao.logo).not.equal(0);
      } else {
        expect(typeof dao.logo_type).not.equal("undefined");
        expect(dao.logo_type).not.equal(0);
      }
    }
  });

  it("version matches package.json", () => {
    expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
    expect(packageJson.version).to.equal(
      `${defaultDaoList.version.major}.${defaultDaoList.version.minor}.${defaultDaoList.version.patch}`
    );
  });

  it("logos only should be PNG extension", () => {
    for (let dao of defaultDaoList.daos) {
      if (dao.logo) {
        expect(dao.logo).match(/\.(png|PNG)$/)
      }
      if (dao.logo_type) {
        expect(dao.logo_type).match(/\.(png|PNG)$/)
      }
      if (dao.token && dao.token.logo) {
        expect(dao.token.logo).match(/\.(png|PNG)$/)
      }
      if (dao.wrappableToken && dao.wrappableToken.logo) {
        expect(dao.wrappableToken.logo).match(/\.(png|PNG)$/)
      }
    }
  })

  it("forum should be in valid url format", () => {
    for (let dao of defaultDaoList.daos) {
      if(dao.forum) {
        expect(dao.forum).match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
      }
    }
  })
});
