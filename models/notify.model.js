const db = require("../config/dbConfig.js");

const TABLE_NAME = "notification";

const findById = (id) => {
  return db(TABLE_NAME).where("id", id);

  //SQL RAW METHOD
  // return db.raw(`SELECT * FROM notification
  //                  WHERE id = ${id}`);
};

const add = (obj) => {
  return db(TABLE_NAME).insert(obj, "id");
};

const update = (id, obj) => {
  return db(TABLE_NAME).where("id", id).update(obj);
};

module.exports = {
  findById,
  add,
  update,
};
