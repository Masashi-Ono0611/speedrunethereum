import * as chains from "viem/chains";

export type BaseConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  rpcOverrides?: Record<number, string>;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

export type ScaffoldConfig = BaseConfig;

const scaffoldConfig = {
  // The networks on which your DApp is live
  targetNetworks: [chains.sepolia],
  // The interval at which your front-end polls the RPC servers for new data (it has no effect if you only target the local network (default is 4000))
  pollingInterval: 30000,
  // Get Alchemy API key from environment variables
  // Create a .env file in the root directory and add:
  // NEXT_PUBLIC_ALCHEMY_API_KEY=your_api_key_here
  alchemyApiKey:
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ||
    (() => {
      throw new Error("NEXT_PUBLIC_ALCHEMY_API_KEY is not set in environment variables");
    })(),
  // If you want to use a different RPC for a specific network, you can add it here.
  // The key is the chain ID, and the value is the HTTP RPC URL
  rpcOverrides: {
    // Example:
    // [chains.mainnet.id]: "https://mainnet.buidlguidl.com",
  },
  // Get WalletConnect Project ID from environment variables
  // Create a .env file in the root directory and add:
  // NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ||
    (() => {
      throw new Error("NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not set in environment variables");
    })(),
  onlyLocalBurnerWallet: false,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
