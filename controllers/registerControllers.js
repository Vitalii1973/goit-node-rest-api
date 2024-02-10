// const bcrypt = require("bcrypt");
// const User = require("../models/userModel");
// const Joi = require("joi");

// // Реєстрація користувача
// exports.registerUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Валідація обов'язкових полів
//     const schema = Joi.object({
//       email: Joi.string().email().required(),
//       password: Joi.string().required(),
//     });

//     const { error } = schema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     // Перевірка, чи існує вже користувач з такою електронною поштою
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "Email in use" });
//     }

//     // Хешування паролю
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Створення нового користувача
//     const newUser = await User.create({
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       user: { email: newUser.email, subscription: newUser.subscription },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
