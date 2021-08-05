// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.SMS_ACCOUNT_SID;
const authToken = process.env.SMS_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
// client.region = 'ca';

const { constants } = require("../helpers/constants");

exports.sendSMS = async function (body, to) {
  await client.messages.create({
    body: body,
    from: constants.sms.from,
    to: to,
  });
};
