import { create } from "ipfs-http-client";

const apiKey = "80c4246189edb484a7cd";
const apiSecret = "f10f984985b516768e7759bf87e3b515410b4fc4b64c410fc1dc5131574d0534";

// Create IPFS client with Pinata credentials
const ipfsClient = create({
  host: "api.pinata.cloud",
  port: 443,
  protocol: "https",
  headers: {
    Authorization: `Bearer ${apiKey}:${apiSecret}`,
  }, 
});

export default ipfsClient;
