# Используем базовый образ с установленной версией Node.js
FROM node:18.16.0

# Установка Yarn
RUN npm install -g yarn

# Создание директории приложения
WORKDIR /app

# Копирование файлов package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Установка зависимостей
RUN yarn install

# Копирование остальных файлов приложения
COPY . .

# Проверка наличия файлов .env и google-config.json
RUN test -f .env || echo "File .env is missing!"
RUN test -f google-config.json || echo "File google-config.json is missing!"

# Команда для запуска приложения
CMD ["yarn", "start"]
