# js-lessons

#Как создать Простой веб-сервер, используя только стандартные инструкции nodejs. 
Часто для разработки MPA/SPA/PWA приложений требуется простой веб-сервер. Однажды, на одном большом митинге в ответ на вопрос: «Что ты делал?», я сказал, что поднимал веб-сервер для хостинга PWA приложения. Мы все долго смеялись и да, кстати, PWA это не клей. Как SPA - это не косметический салон, а SSR это не страна :-). Все это виды веб-приложений. Если запустить такое приложение просто открыв стартовую страницу index.html через браузер, оно не будет работать как должно, в лучшем случае мы получим оффлайн версию. Я люблю язык JavaScript и буду решать проблему, используя только доступные мне средства, так сказать из "коробки".
<cut />
Начнем с плана:

1.  Если нет [NodeJS](https://nodejs.org/dist/) качаем LTS, устанавливаем, настройки не меняем, жмем далее
2.  В нашем укромном местечке, где собраны все проекты, создаем папку **simple-web-server**
3.  В папке проекта выполним команду npm init --yes // без --yes инициализатор будет задавать много вопросов
4.  В файле **package.json** в секции **scripts** добавим свойство и его значение - **"main": "index.js"** - так мы сможем быстро запустить наш сервер, используя команду npm run
5.  Создать папку **lib** В нее рекомендуется помещать весь свой код, который не требует сборки и доп действий для его работы
6.  Создадим в папке **lib** файл **index.js** Это наш будущий сервер
7.  Создадим папку **dist** \- это будет папка в которой будут публично доступные файлы, в том числе index.html, другими словами статика, которую будет раздавать наш сервер
8.  Откроем файл /index.js
9.  Напишем немного кода

Итак, что мы знаем о том, что должен делать наш сервер?

1.  Обрабатывать запросы
2.  Читать файлы
3.  Отвечать на запрос содержимым файла

Для начала создадим наш сервер, в файле **idex.js** импортируем

```javascript
    const {createServer} = require('http');
```

Эта инструкция деструктуризирует объект модуля [**http**](https://nodejs.org/api/http.html) и в идентификатор переменной **createServer** присваивает выражение - функцию [**createServer**](https://www.w3schools.com/nodejs/met_http_createserver.asp).

Создаем новый сервер, используя следующую инструкцию

```javascript
    const server = createServer();
```

При первом заходе на хост сервера браузер отправляет запрос для получения документа. Поэтому, для того чтобы обработать это событие, нам нужно прослушивать такие запросы. У созданного нами сервера есть метод **listen** в качестве параметра передадим номер порта 3000.

```javascript
    const eventsEmitter = server.listen(3000);
```

Выражением этого метода будет объект [**EventEmitter**](https://nodejs.org/api/events.html#events_class_eventemitter) который будет сохранен в переменную с идентификатором **eventsEmitter**. Этот объект является наблюдаемым(Observable). Подпишемся на его события, используя вызов метода [**on/addEventListener**](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener) с двумя обязательными параметрами **string** **function**. Первый параметр указывает на то, какие события нам интересны [**request**](https://nodejs.org/api/http.html#http_event_request) второй - это функция, которая будет обрабатывать это событие.

```javascript
    eventsEmitter.on('request', (req, res) => { debugger; });
```

Откроем в браузере [ссылку](http://localhost:3000/)

![image](https://github.com/NVBespalov/js-lessons/raw/feature/simple-http-server/dist/on-request-listener.png)

Итак, мы остановились на инструкции отладчика. Видим, что в качестве параметров мы получаем два объекта [**req**](https://nodejs.org/api/http.html#http_class_http_clientrequest),[**res**](https://nodejs.org/api/http.html#http_class_http_serverresponse) Эти объекты являются экземплярами Объектов типа [поток](https://nodejs.org/api/stream.html) следовательно [**req**](https://nodejs.org/api/stream.html#stream_readable_streams) - поток чтения, а [**res**](https://nodejs.org/api/stream.html#stream_writable_streams) - поток записи.

Запрос мы обработали и можно сказать, что "дело в шляпе". Осталось всего ничего: прочитать и отдать в ответ файл. Для начала нужно понять, какой же файл нам нужен. В отладчике, изучив все свойства параметра **req**, я увидел, что есть у него свойство **url**. Но вот только в нем нет ничего похожего на **index.html**.

Посмотрим еще раз на наш браузер: видим, что мы явно не указали этого. Попробуем еще раз, но уже явно укажем [index.html](http://localhost:3000/index.html).  

![image](https://github.com/NVBespalov/js-lessons/raw/feature/simple-http-server/dist/second-try.png)

Теперь видно, что имя файла приходит в запросе в свойстве **url** и больше ничего кроме этого, чтобы прочитать файл нам от запроса не нужно. Деструктуризируем его, используя пару фигурных скобок, указываем имя свойства **url** и, через оператор **:**, задаем произвольное имя с помощью валидного идентификатора переменной, в моем случае **requestUrl**.

```javascript
    eventsEmitter.addListener('request', ({url: requestUrl}, res) => { debugger });
```

Отлично, что дальше? По правде говоря, мне не очень нравится тот факт, что нужно будет всегда явно указывать index.html, поэтому давайте сразу решим и эту проблему. Я решил, что самый простой способ сделать это - использовать стандартную функцию [**extname**](https://nodejs.org/api/path.html#path_path_extname_path) она входит в стандартную поставку
NodeJS модуля [**path**](https://nodejs.org/api/path.html) импортируем ее, используя следующую инструкцию.

```javascript
    const {extname} = require('path');
```

Теперь можно вызвать ее, передав в качестве параметра выражение идентификатора requestUrl и получить выражение строки примерного формата `'.extension'`. Если в запросе явно не указан файл, то вернется пустая строка. Используя этот принцип, мы будем добавлять значение по умолчанию **'index.html'**. Запишем следующую инструкцию

```javascript
    const url = extname(requestUrl) === '' ? DEFAULT_FILE_NAME : requestUrl;
```

Я уверен, что пользователь сервера захочет переопределить это имя и также завел переменную окружения, используя следующую инструкцию

```javascript
    const {env: {DEFAULT_FILE_NAME = '/index.html'}} = process;`
```

в глобальной переменной [**process**](https://nodejs.org/api/process.html) множество полезной информации я лишь буру ее часть, в частности свойство [**env**](https://nodejs.org/api/process.html#process_process_env) оно содержит все свойства окружения пользователя и уже в ней будем искать **DEFAULT\_FILE\_NAME** в случае если пользователь ее не укажет - используем index.html по умолчанию.

> ВАЖНО: если значение свойства окружения DEFAULT\_FILE\_NAME будет что угодно, кроме undefined, присваивание значения по умолчанию не сработает. Об этом стоит помнить, но не сейчас, мы делаем все по минимуму :-)

![image](https://github.com/NVBespalov/js-lessons/raw/feature/simple-http-server/dist/resolve-url.png)

Теперь, когда у нас есть относительная ссылка на файл, нам нужно получить абсолютный путь к файлу в файловой системе нашего сервера. Мы решили, что все публичные файлы будут храниться в папке **dist** поэтому, чтобы получить **абсолюьный путь до файла**, воспользуемся еще одной функцией [**resolve**](https://nodejs.org/api/path.html#path_path_resolve_paths) из уже знакомого нам модуля
[**path**](https://nodejs.org/api/path.html) просто указываем ее в ранее созданной инструкции на 5 строчке

```javascript
    const {resolve, extname} = require('path');
```

Дальше на 10 строчке запишем инструкцию, которая получит и сохранит в переменную **filePath**  **абсолютный путь** Я также заранее «вангую», что имя этой папки можно переопределить для гибкости. Поэтому расширяю инструкцию на 6 строчке, добавляя имя
переменной окружения **DIST\_FOLDER**!

![image](https://github.com/NVBespalov/js-lessons/raw/feature/simple-http-server/dist/abs-path-resolve.png)

Теперь все готово, чтобы читать файл. Можно файл читать по-разному Асинхронно, Синхронно, а можно использовать [потоки](https://nodejs.org/api/stream.html). Я буду пользоваться потоками :-) это красиво и более эффективно, с точки зрения затрачиваемых ресурсов. Для начала, создадим тестовый файл в папке **dist**, чтобы было что читать :-)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
TESTING 1,2,3...
</body>
</html>
```

Теперь нам нужна функция, которая создаст поток чтения файла, она тоже входит в стандартную поставку NodeJS извлекаем ее из модуля [**fs**](https://nodejs.org/api/fs.html) используя следующую инструкцию

```javascript
    const {createReadStream} = require('fs');
```

а на 12 строчке в теле обработчика запроса используем следующую инструкцию

```javascript
    createReadStream(filePath)
```

в результате вернется экземпляр объект поток-чтения, используя его
функцию [**pipe**](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options) мы можем переключить потоки чтения в поток записи, также потоки можно трансформировать и много чего полезного. Так параметр **res** это поток чтения, ведь так?

Попробуем сразу переключить созданный нами поток чтения файла в поток записи **res** для
этого на 12 строчке продолжаем инструкцию вызывая метод **pipe**, а в качестве параметра передаем наш поток записи **res**

```javascript
    createReadStream(filePath).pipe(res);
```

![image](https://github.com/NVBespalov/js-lessons/raw/feature/simple-http-server/dist/pipe-to-res.png)

Все? Неееет. А ошибки кто обрабатывать будет? Какие ошибки? Попробуем в файл index.html докинуть css файлик, а создавать его не будем и посмотрим что будет :-)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="index1.css">
</head>
<body>
TESTING 1,2,3...
</body>
</html>
```

![image](https://github.com/NVBespalov/js-lessons/raw/feature/simple-http-server/dist/error-not-found.jpg)

Ожидаемо, но сервер упал! Это совсем не дело. Дело в том, что по умолчанию в потоках ошибки не отлавливаются и нужно делать это самим :-) **createReadStream** возвращает поток, в котором происходит ошибка. Поэтому добавим обработчик ошибки. Используя вызов методе **on** Указывая имя события **error** и обработчик - функцию. Она завершит поток чтения **res** с кодом ответа 404.

```javascript 
    createReadStream(filePath)
        .on('error', error => res.writeHead(404).end())
        .pipe(res);
```

проверяем!

![image](https://github.com/NVBespalov/js-lessons/raw/feature/simple-http-server/dist/fix-not-found.jpg)

Другое дело. Кстати, сервер еще не готов и если мы попробуем открыть его в другом браузере, то страница будет работать не правильно :-) кто догадался, пожалуйста, пишите в комменты, что мы с вами забыли сделать? Дело в том, что когда сервер отвечает на запрос сервера файлом, для браузера не достаточно одного расширения чтобы понять какого типа этот файл и другие браузеры: ни хром или ни более старые версии работать с файлами загруженные без указания заголовка ответа Content-Type не смогут правильно обработать файл, помимо всего прочего, наш сервер должен указать [MIME type](https://developer.mozilla.org/ru/docs/Web/HTTP/Basics_of_HTTP/MIME_types) Для этого заведем отдельную переменную со всеми распространенными майм типами. Также предоставим возможность их расширить, передав в качестве переменной окружения

```javascript
    const {env: {DEFAULT_FILE_NAME = '/index.html', DIST_FOLDER = 'dist', DEFAULT_MIME_TYPES = '{}'}} = process;
    const {text} = mimeTypes = {
        'html': 'text/html',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'js': 'text/javascript',
        'css': 'text/css',
        'text': 'plain/text',
        'json': 'application/json',
        ...JSON.parse(DEFAULT_MIME_TYPES)
};
```

Отлично, теперь нужно как-то перед переключением потока чтения в поток записи указать MIME тип. Я использовал в качестве ключей имена расширений файлов, поэтому уже знакомой функцией **extname** получим расширение файла

```javascript
    const fileExtension = extname(url).split('.').pop();
```
а при помощи обработчика события **pipe** зададим нужный MIME тип

```havascript
res.on('pipe', () => res.setHeader(contentType, mimeTypes[fileExtension] || text));
```

Проверяем

![image](https://github.com/NVBespalov/js-lessons/raw/feature/simple-http-server/dist/finish.jpg)

Вот и все - сервер готов. Он, конечно, не идеален, но для быстрого старта самое то. Если вам интересно развитие этой идеи, пожалуйста, пишите в комментариях :-)

[Полный код проекта](https://github.com/NVBespalov/js-lessons/tree/feature/simple-http-server)
<video>https://www.youtube.com/embed/ZWpO8NIBnNQ</video>
