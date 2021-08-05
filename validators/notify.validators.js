const { check, body, validationResult } = require("express-validator");

exports.Notify = [
  check("type")
    .notEmpty()
    .withMessage("type must not be empty.")
    .isIn(["EMAIL", "SMS", "PUSH"])
    .withMessage("type must be in EMAIL | SMS | PUSH"),

  check("message")
    .notEmpty()
    .withMessage("message must not be empty.")
    .isLength({ min: 10 })
    .trim()
    .withMessage("Please write message atleast 10 chractors long."),

  body("users.*.recepient", "recepient must not be empty.")
    .isLength({ min: 3 })
    .trim()
    .if((value, { req }) => {
      (req.body.type == "EMAIL" && value.isEmail()) ||
        (req.body.type == "SMS" && value.isMobilePhone());
    }),
  body("users.*.sender_id", "sender_id must be valid UUID").isUUID(4),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        next();
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
