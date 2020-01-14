# TypeScript

## План урока
- Водная о том что это такое TypeScript
- Типы (String, Number, Boolean, Array, Object, function, Tuple, Enum, Complex, Null, Undefined, Never)
- Определение(угадывание типа) - TypeInference
- Интерфейсы (определение, расширение, наследование)
- Классовая система

## Что же такое TypeScript ?

Тайп скрипт это расширение языка джаваскрипт. Его разработала Майкрософт. Это не новый язык, это
расширение джаваскрипт. Тайп скрипт добавляет статическую или строгую типизацию.
Тем самым он решает извечную проблему не строгой типизации джаваскрипт.
Тайпскрипт может до запуска кода определить ошибки которые возникают при не строгой типизации.
Чато такие ошибки не воспроизводятся сразу, а переодически в произвольном порядке.
Эти оишбки доставляют дискомфорт пользователям в лучшем случае. В худшем могут приводить к
искажению их данных, что в перспективе может вылиться в большие проблемы и
даже потерю данных клиентов.

Синтаксиси тайпскрипт это зеркальное отражение ES6. Можно взять валидный ES6 листинг,
скопировать его в листинг тайпскрипт и ошибок не возникнет. Это достигается тем, что у
тайпскрипт есть механизм угадывания или предсказания типов - Type inference. Если тип явно
не определен, то  механизм попробует используя цепочку вызовов предсказать его.
В случае если тип определить не удалось будет использован  спец тип Any. Файлы с листингом
тайпскрипт имеют расширение `.ts`

Если переход в одну сторону работает за счет одинакового синтаксиса, то в обратную сторону
переход осуществляется за счет инструментов коммандной строки. Это целый набор инструментов
для работы с тайпскрипт листингами и превращением их в джаваскрипт.
Говорить, что тайпскрипт компилируется в джаваскрипт не верно. Так как Компиляция это процесс
перевода листинга языка программирования понятного разработчику в так называемый двоичный код.
Который понятнен экзекьютору или исполнителю операционной системе а также компьютеру. Также
джаваскрипт не является компилируемым а его компиляция по умолчанию `JIT` осуществляется
средствами движка браузера. Тайпскрипт листинг содержит расширение синтаксиса которого нет
в современном стандарте джаваскрипт. Чтобы запустить тайпскрипт в браузере его листинг нужно
`транспилировать` в листинг джаваскрипт.
**Транспиляция это перевод листинга одного языка в листинг другого.**
> Технически тайпскрипт это не язык. Но расширенный синтаксис приближает его к таковым.

 
## Условия

Для работы с тайпскрипт необходимо выполнять 4 условия:
- Наличие установленного NodeJS
- Установленный npm модуль typescript
- Конфигурация тайпскрипт
- Файлы с листингом тайпскрипт и расширением `.ts`

## Установка

```bash
npm install -g typescript
```

## Создание проекта

Теперь когда проект у нас установлен тайпскрипт давайте создадим проект.
Та как для работы тайпскрипт нужен файл конфига все его файлы принято помещать в папку.
Условно эта папка и есть проект и ее имя близко или носит имя проекта.
В консоли переходим к папке где лежат все наши проекты. У меня это `Developer` 
```bash
cd ~./Developer 
```  
Создаем папку с именем проекта
```
mkdir typescriptProjectName
```
Переходим в корень проекта
```bash
cd typescriptProjectName
```
Инициализируем проект typescript

```bash
tsc init
```
Создаем файл с расширением .tsc
```bash
touch index.ts
```
Это самый минимальный набор команд для старта в тайпскрипт

Давайте рассмотрим механизм тайпинференс. Это механизм вычисления или определения типов исходя из выражения с правой
части от оператора присваивания.  

> **ВАЖНО!!! При декларации переменных следует помнить, что определение типов тайпскрипт анализирует выражения.
> поэтому если при декларации переменной не указать тип, то это не значит что его там не будет.
> В этом случае используется выражение от `undefined` и его то интерпретатор типов проанализирует.
> В итоге тип на выходе будет `any` И в эту переменную можно будет присвоить все что угодно.**

```typescript
let anyTypeVariable;
anyTypeVariable = 10;
anyTypeVariable = '';
```

Как мы видим ошибки эти инструкции не вызывают. Так как тип `any` указывает на то, что тип этой переменной любой.
Кстати за счет этого механизма и типа `any` реализована обратная совместимость с ES6 джаваскрипт. Использование типа `any`
крайне не желательно. Так как это лишает нас основного профита от тайпскрипт - строгая типизация.

Для того чтобы определить тип вручную не используя механизм определения типов необходимо использовать следующий синтаксис
 ```typescript
let declaredVariableWithNumberType: number;
declaredVariableWithNumberType = 10;
// declaredVariableWithNumberType = ''; => Error: Assigned expression type "" is not assignable to type number  
```
