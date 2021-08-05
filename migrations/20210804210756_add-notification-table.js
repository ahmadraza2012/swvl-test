const { v4: uuidv4 } = require("uuid");

exports.up = function (knex) {
  return knex.schema.createTable("notification", (table) => {
    table.uuid("id").primary().defaultTo(uuidv4());
    table.uuid("sender_id").notNullable(); // USER_ID (must be valid UUID)
    table.string("type").notNullable(); // EMAIL | SMS | PUSH
    table.string("recepient"); // mail@gmail.com | 923217675129 | Valid_FCM_token_ID.
    table.string("message"); // Simple Text
    table.string("status").notNullable(); // PENDING | SEND | ERROR
    table.timestamp("created_on").defaultTo(knex.fn.now());
    table.string("created_by").notNullable();
    table.timestamp("updated_on").defaultTo(knex.fn.now());
    table.string("updated_by");
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("notification");
};
