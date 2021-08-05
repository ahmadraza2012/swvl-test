const ejs = require("ejs");
var path = require("path");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { constants } = require("../helpers/constants");

exports.sendEmail = async function (template_path, to, subject, template_params) {
  await ejs
    .renderFile(path.join(__dirname, template_path), template_params)
    .then(async (emailTemplate) => {
      const message = {
        from: {
          email: constants.sendEmails.from,
          name: constants.sendEmails.name,
        },
        to: to,
        subject: subject,
        html: emailTemplate,
      };
      return await sgMail
        .send(message)
        .then((sent) => {
          console.log("Email send Successfully.");
        })
        .catch((err) => {
          console.log("Error sending mail.", err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
