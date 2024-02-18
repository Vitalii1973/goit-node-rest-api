# Використовуємо офіційний образ Node.js
FROM node:18

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json у робочу директорію
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів додатку
COPY . .

# Відкриваємо порт 3000
EXPOSE 3000

# Команда для запуску додатку
CMD ["npm", "start"]
