import * as mongoose from 'mongoose';

export const BlockSchema = new mongoose.Schema({
  hash: String,
  strippedsize: Number,
  size: Number,
  weight: Number,
  height: Number,
  version: Number,
  versionHex: String,
  merkleroot: String,
  hashStateRoot: String,
  hashUTXORoot: String,
  tx: Array,
  time: Number,
  mediantime: Number,
  nonce: Number,
  bits: String,
  difficulty: String,
  chainwork: String,
  previousblockhash: String,
  nextblockhash: String,
  flags: String,
  proofhash: String,
  modifier: String,
  signature: String
}, {
  strict: false
});
