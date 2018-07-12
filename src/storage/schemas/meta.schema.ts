import * as mongoose from 'mongoose';

export const MetaSchema = new mongoose.Schema({}, { strict: false });

MetaSchema.statics.qtumMetaId = '5b460dee77baf4761364b177';

MetaSchema.statics.getQtumMeta = async function () {
  const meta = await this.findById(this.qtumMetaId).lean().exec()

  if (meta) {
    return meta
  }
  return this.create({ _id: this.qtumMetaId })
}

MetaSchema.statics.updateQtumMeta = function (update) {
  update.lastModified = new Date()
  return this.findByIdAndUpdate(this.qtumMetaId, update, { upsert: true, new: true }).lean().exec()
}
