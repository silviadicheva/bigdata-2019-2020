const{Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec 
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('c57cb09c27a213086ad99fc487ce9c789b6a6cfb6af3ea62b34fba1615584b0');
const myWalletAddress = myKey.getPublic('hex');

let siscOin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
siscOin.addTransaction(tx1);

console.log("\n Starting the miner...");
siscOin.minePendingTransactions(myWalletAddress);

console.log('\n Balance of silvia is', siscOin.getBalanceOfAddress(myWalletAddress));

siscOin.chain[1].transactions[0].amount = 1

console.log('Is chain valid?', siscOin.isChainValid())