const { constants } = require("../helpers/constants");

module.exports  = async (type)=>{
    let queue = '';
    switch (type) {
      case constants.platform.email:
        queue = constants.queues.email_queue;
        break;
      case constants.platform.sms:
        queue = constants.queues.sms_queue;
        break;
      case constants.platform.push:
        queue = constants.queues.push_queue;
        break;
    }
    return queue;
}