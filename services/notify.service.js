const db = require("../models/notify.model");
const { v4: uuidv4 } = require("uuid");
const get_queue = require('../middlewares/get_queue');
const addInQueue = require("../middlewares/addInQueue");
const sendNotifications = require("../middlewares/sendNotifications");

class notifyService {
  async addNotification(obj) {
    let notifyObj = [];

    // Preparing Database Objects.

    obj.users.forEach((u) => {
      u.id = uuidv4();
      u.type = obj.type;
      u.message = obj.message;
      u.status = "PENDING";
      u.created_by = "API";
      u.updated_by = "API";
      notifyObj.push(u);
    });

    // Add Entries into Database with Pending Status.
    const result = await db.add(notifyObj);

    // get name of queue according to Provider
    const queue = get_queue(obj.type)

    // Add Entries into Queue
    addInQueue(notifyObj, queue);

    // Send Notifications to relevent Provider.
    sendNotifications(obj.type, queue)

    return result;
  }
}

module.exports = new notifyService();
