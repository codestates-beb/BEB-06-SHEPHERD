const Shepherd = artifacts.require("Shepherd");

module.exports = function(deployer) {
  deployer.deploy(Shepherd);
};
