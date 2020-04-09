// IMPORT THE CONFIG FILE AND INIT IT
const Config = require("../settings");
let config = new Config();

class Getdata {
  constructor() {

    // DECLARE YOUR GLOBAL CONFIG VARIABLES FROM THE SETTINGS FILE
    this.dappAddress = config.get("dappAddress")
    this.userAddress = config.get("userAddress")
    this.nodeUrl = config.get("nodeURL")
    this.providerUrl = config.get("providerUrl");
    this.explorerSegment = config.get("network") == "T" ? "/testnet":""

    // CHECK IF THERE IS A PAGE ADDRESS IN FIRST URL SEGMENT, IF YES USE IT,
    // IF NOT, GET IT FROM SETTINGS, ELSE REQUIRE AN ADDRESS
    if (window.location.pathname.split("/")[1]) {
      this.userAddress = window.location.pathname.split("/")[1];
    } else if (this.userAddress != "") {

    } else {
      // IF NO ADDRESS SEND AN ALERT
      alert("defined an account address");
    }
  }

  // DEFINE A SIMPLE GETTER TO ACCESS OUR GLOBAL VARS
  get(key) {
    return this[key];
  }

  // THIS METHOD WILL REQUEST DATA BY KEY / REGEX TO THE BLOCKCHAIN NODE
  async getDataByKey(keyname) {
    let name = await fetch(`${this.nodeUrl}/addresses/data/${this.dappAddress}?matches=${keyname}`)
      .then((jsonres) => {
        return jsonres.json();
      })
      .then((res) => {
        // IF ONLY ONE RESULT, RETURN THE VALUE, IF NOT, THE FULL DATA
        if(res.length == 1){
          return res[0].value ;
        }else{
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return name;
  }
}

module.exports = Getdata;
