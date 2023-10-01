const ethers = require("ethers");
const zlib = require('zlib');

const apiKey = process.env.ALCHEMY_KEY;
console.log(apiKey);
const provider = new ethers.JsonRpcProvider(`https://opt-mainnet.g.alchemy.com/v2/${apiKey}`);

const contract = new ethers.Contract("0x2EF5fb9E8C1e05097061707D0db8355a6f375083", ["function getText() external view returns (bytes memory)"], provider);
const fromHexString = (hexString) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

(async function () {
    const result = await contract.getText();
    console.log(result);
    const output = fromHexString(result.substring(2));
    zlib.unzip(output, (err, unzippedBuffer) => {
        if (!err) {
          // unzippedBuffer now contains the uncompressed data
          console.log(unzippedBuffer.toString('utf8')); // Assuming it's a text file
        } else {
          console.error('Error:', err);
        }
    });
})();