const messageBroker = require("../Queue/index");
module.exports  = async (notifyObj, queue)=>{
    // Push in Queue. // convert to method
    messageBroker.getInstance().then((broker)=>{
      notifyObj.forEach((data) => {
        broker.send(queue, data);
      });
    });
}