abstract class Account<KP, PK, CN> {
  private mnemonic : string;

  private keyPair : KP;

  connection?: CN;

  path : string;

  index : number;

  publicKey : PK;

  networkId : string;

  chain : string;

  constructor(mnemonic: string, keyPair: KP, path: string, index: number, networkId: string) {
    this.setSeedPhrase(mnemonic);
    this.setKeyPair(keyPair);
    this.setPublicKey(keyPair);
    this.path = path;
    this.index = index;
    this.networkId = networkId;
  }

  setSeedPhrase(mnemonic: string) {
    this.mnemonic = mnemonic;
  }

  abstract setKeyPair(keyPair: KP);
  abstract setPublicKey(keyPair: KP);

  retrieveSecureSeedPhrase() : string {
    return this.mnemonic;
  }

  abstract retrieveSecureKeyPair() : KP;

  abstract getConnection() : Promise<CN>;
  abstract getTokens() : Promise<object[]>;
  abstract getBalance() : Promise<object>;
  abstract getReceiveAddress() : string;
  abstract validateDestinationAccount(address: string) : Promise<object>;
  abstract transfer(
    destination: string,
    token: string,
    amount: number,
    opts: object
  ) : Promise<object>;
  abstract airdrop(amount: number) : Promise<object>;
  abstract getAllNfts() : Promise<object[]>;
  abstract getAllNftsGrouped() : Promise<object[]>;
  abstract getBestSwapQuote(
    nToken: string,
    outToken: string,
    amount: number,
    slippage: number
  ) : Promise<object>;
  abstract executeSwapTransaction(routeId : string) : Promise<object>;
  abstract createSwapTransaction(transactionId : string) : Promise<object>;
  abstract setNetwork(networkId : string) : void;
  static getNetworks() : Promise<object[]> {
    throw new Error('not implemented!');
  }

  abstract getCurrentNetwork() : Promise<object>;
  abstract getChain() : string;
  abstract getRecentTransactions(lastSignature : string) : Promise<object[]>;
  static restoreAccount<KP, PK, CN>(mnemonic: string, networkId: string) : Account<KP, PK, CN> {
    throw new Error('not implemented!');
  }

  static restoreDerivedAccounts<KP, PK, CN>(
    mnemonic: string,
    networkId: string,
  ) : Account<KP, PK, CN>[] {
    throw new Error('not implemented!');
  }
}

export { Account };
