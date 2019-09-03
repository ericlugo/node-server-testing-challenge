const db = require('../data/dbConfig.js');

const noteModel = (module.exports = {});

noteModel.find = function(id) {
  if (id)
    return db('note')
      .where('note_id', id)
      .first();
  else return db('note');
};

noteModel.findBy = function(filter) {
  return db('note').where(filter);
};

noteModel.insert = async function(note) {
  const [id] = await db('note').insert(note, 'note_id');
  return noteModel.find(id);
};

noteModel.remove = async function(id) {
  const deletedNote = await noteModel.find(id);
  const deleted = await db('note')
    .where('note_id', id)
    .first()
    .del();

  if (deleted) return deletedNote;
};
