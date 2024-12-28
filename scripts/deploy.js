const { ethers } = require("hardhat");

async function main() {
  const UploadContract = await ethers.getContractFactory("Upload"); 
  const deployedUploadContract = await UploadContract.deploy();

  await deployedUploadContract.waitForDeployment(); 

  const contractAddress = await deployedUploadContract.getAddress(); 
  console.log("Upload Contract deployed to:", contractAddress); 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });