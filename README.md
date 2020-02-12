# js-lessons: Бизнес Аналитика возможности пользователя - Загрузка файлов  Простого Веб Приложения.

## User Story: **Я как пользователь хочу загрузить один файл для того чтобы иметь возможность с ним работать в приложении на разных устройствах**

## Сценарии Использования:

- Успешная загрузка файла:
    - Вижу кнопку загрузить файл.
    - Нажимаю кнопку загрузить файл  
    - Вижу диалог в котором я могу выбрать файл на моем устройстве  
    - Выбираю файл  
    - вижу что мой файл обрабатывается приложением  
    - вижу что файл загружен  

- Не успешная загрузка
    - Вижу кнопку загрузить файл.
    - Нажимаю кнопку загрузить файл  
    - Вижу диалог в котором я могу выбрать файл на моем устройстве  
    - Выбираю файл  
    - вижу что мой файл обрабатывается приложением  
    - вижу что файл не загружен и во всплывающем окне вижу текст ошибки сервера приложений

- Отказ от выбора
    - Вижу кнопку загрузить файл.
    - Нажимаю кнопку загрузить файл  
    - Вижу диалог в котором я могу выбрать файл на моем устройстве  
    - отменяю выбор файла  
    - вижу что диалог выбора файлов закрылся   
    - вижу что ничего не обрабатывается приложение ни как не отреагировало


# Слои приложения (Трех уровневая Архитектура) 
- Интерфейс Приложения
- Сервер Приложения
- Сервер Баз Данных

## Слой Интерфейс
- Я как Разработчик Интерфейсов хочу создать HTML обьекты которые ползволят пользователю выбрать файл
- Я как Инженер По качеству хочу проверить что интерфейс не содержит ошибок и недочетов
- Я как Фронтенд Разработчик хочу написать необходимые инструкции чтобы используя созданые HTML обекты получить файл пользователя и выполнить запрос обработки файла пользователя  к серверу приложения
- Я как Инженер По качеству хочу проверить что интерфейс работает как надо и запрос уходит на сервер с правильными заголовками и правильным содержимым
- Я как Фронтенд Разработчик хочу написать необходимые инструкции  для того чтобы обработать результат запроса загрузки  файла пользователя от сервера
- Я как Инженер По качеству хочу проверить что интерфейс работает как надо и после отправки запроса обработки файла пользователя появляется сообщение об успешной загрузке

## Слой Сервера Приложения
- Я как Бэк Енд разработчик хочу опбаботать запрос загрузки файла от пользователя для того чтобы сохранить в папку
- Я как Инженер По качеству хочу проверить что Сервер приложения обрабатывает запросы Интерфейса приложения и формирует успешный ответ на запрос загрузки  

## Слой сервера Баз Данных
- Не задействован


