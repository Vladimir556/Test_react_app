# Stage 1: Сборка приложения
FROM node:18 AS build

WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в рабочую директорию контейнера
COPY . .

# Собираем проект (production build)
RUN npm run build

# Stage 2: Запуск приложения в Nginx
FROM nginx:alpine

# Копируем собранные файлы из Stage 1 в папку с Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Настраиваем порт для доступа к приложению
EXPOSE 80

# Команда запуска Nginx
CMD ["nginx", "-g", "daemon off;"]
