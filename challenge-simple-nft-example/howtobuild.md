# コントラクト編集と再デプロイ手順（mint 制限）

## 目的
`packages/hardhat/contracts/YourCollectible.sol` の `mintItem()` を「特定アドレスのみミント可能」に制限し、Sepolia へ再デプロイしてフロント参照を更新する手順をまとめます。

## 前提
- コントラクト: `packages/hardhat/contracts/YourCollectible.sol`
- フロント設定: `packages/nextjs/scaffold.config.ts`
- 自動生成参照: `packages/nextjs/contracts/deployedContracts.ts`
- ネットワーク: Sepolia（Chain ID: 11155111）

## 手順

### 1) コントラクト編集（ミント制限の追加）
対象: `packages/hardhat/contracts/YourCollectible.sol`

```solidity
// 指定アドレスのみミント可能にする定数
address public constant ALLOWED_MINTER = 0x08D811A358850892029251CcC8a565a32fd2dCB8;

function mintItem(address to, string memory uri) public returns (uint256) {
    require(msg.sender == ALLOWED_MINTER, "Not authorized to mint");
    // ... 既存処理（tokenIdCounter++ 〜 _setTokenURI） ...
}
```

ポイント:
- `ALLOWED_MINTER` は定数のため、変更時は再デプロイが必要。
- 既存のデプロイ済みコントラクトには自動反映されない。

### 2) コンパイル
場所: `packages/hardhat`

```bash
npx hardhat compile
```

成功例: `Compiled 1 Solidity file successfully`

### 3) デプロイ（Sepolia）
必要な環境変数:
- `ALCHEMY_API_KEY`
- `__RUNTIME_DEPLOYER_PRIVATE_KEY`（資金のある秘密鍵）

実行例（ワークスペースルートまたは hardhat パッケージから）:

```bash
yarn deploy --network sepolia
# または
npx hardhat deploy --network sepolia
```

成功時:
- `deployed at 0x...`
- `Updated TypeScript contract definition file on ../nextjs/contracts/deployedContracts.ts`

### 4) フロント参照の更新確認
- 自動更新: `packages/nextjs/contracts/deployedContracts.ts` が新アドレスに更新されます。
- フロント設定確認: `packages/nextjs/scaffold.config.ts` の `targetNetworks` に `chains.sepolia` を含める。
- テストネットで burner を使う場合: `onlyLocalBurnerWallet: false` に変更。

### 5) フロント起動と動作確認

```bash
yarn dev
```

- ブラウザで Sepolia に接続。
- テスト手順:
  - `ALLOWED_MINTER` のアドレスで接続 → `mintItem` 成功。
  - 別アドレスで接続 → `Not authorized to mint` で失敗。

## トラブルシューティング
- __insufficient funds__: デプロイヤーアドレスに Sepolia ETH を入金、または資金のある鍵を設定。
- __Node バージョン警告__: Hardhat は Node v18/20 を推奨（v23 は非サポート警告）。

## 変更のコミット・プッシュ

```bash
git add challenge-simple-nft-example/packages/hardhat/contracts/YourCollectible.sol \
        challenge-simple-nft-example/howtobuild.md
git commit -m "docs: add contract edit & redeploy steps (mint restriction)"
git push
```