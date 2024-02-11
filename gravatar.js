const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const filename = path.join(__dirname, "temp", "mosaic.jpg"); // Шлях до файлу зображення

// Читання файлу зображення
fs.readFile(filename, (err, data) => {
  if (err) throw err;

  // Обчислення MD5-хеша зображення
  const hash = crypto.createHash("md5").update(data).digest("hex");

  // Формування URL-адреси Gravatar з MD5-хешем зображення
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

  console.log("URL-адреса Gravatar:", gravatarUrl);
});
