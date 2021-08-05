const notifyService = require("../services/notify.service");

class NotificationController {
  constructor() {}

  async sendNotification(req, res, next) {
    try {
      const id = await notifyService.addNotification(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = new NotificationController();
