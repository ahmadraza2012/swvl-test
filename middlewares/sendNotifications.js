const messageBroker = require("../Queue/index");
const helper = require("../helpers");
const { constants } = require("../helpers/constants");
const db = require("../models/notify.model");

module.exports = async (provider, queue) => {
  // Logic to control number of requests to specific providers.

  messageBroker.getInstance().then((broker) => {
    broker.subscribe(queue, (msg) => {
      // Call Specific methid as mentioned in the queue;

      // GET MAX Limit Per minute for Specific Provider.
      if (remainingProviderLimit(provider)) {
        if (provider == constants.platform.sms)
          helper.sendSMS(msg.message, msg.recepient);
        else if (provider == constants.platform.email)
          helper.sendEmail(msg.message, msg.recepient);
        else if (provider == constants.platform.push)
          helper.sendPush(msg.message, msg.recepient);

        // If successfully send, remove from Queue.

        // Update Status into database to 'SENT'
        db.update(msg.id, {status: constants.statues.SENT})
      }
    });
  });
};

function remainingProviderLimit(provider) {
  let limit = 0;
  switch (provider) {
    case constants.platform.email:
      limit = process.env.EMAIL_PER_MINUTE - emailInlastMinute();
      break;
    case constants.platform.sms:
      limit = process.env.SMS_PER_MINUTES - smsInlastMinute();
      break;
    case constants.platform.push:
      limit = process.env.PUSH_PER_MINUTE - pushInlastMinute();
      break;
  }
  return limit;
}
