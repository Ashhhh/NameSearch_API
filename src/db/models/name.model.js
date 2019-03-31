const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NameSchema = new Schema({
  name: String,
  nameLowerCase: {
    type: String,
    select: false
  }
});

NameSchema.pre('save', function nameSchemaPreSave() {
  if (this.isModified('name')) {
    this.nameLowerCase = this.name.toLowerCase();
  }
});

const Name = mongoose.models.Name || mongoose.model('Name', NameSchema);

module.exports = {
  NameSchema,
  Name
};
