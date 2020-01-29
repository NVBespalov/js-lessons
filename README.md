# TypeScript

## План урока
- Вводная о том, что такое TypeScript
- Определение(угадывание/предсказание типа) - TypeInference
- Настройка и быстрый старт
- Типы (String, Number, Boolean, Array, Object, function, Tuple, Enum, Complex, Null, Undefined, Never)
- Интерфейсы (определение, расширение, наследование)
- Классовая система

## Что такое TypeScript?

Тайпскрипт - это расширение языка джаваскрипт. Его разработала Майкрософт. Это не новый язык, это
расширение джаваскрипт. Тайпскрипт добавляет статическую или строгую типизацию.
Тем самым он решает извечную проблему нестрогой типизации джаваскрипт.
Тайпскрипт может до запуска кода определить ошибки, которые возникают при нестрогой типизации.
Часто такие ошибки не воспроизводятся сразу, а периодически в произвольном порядке.
Эти оишбки доставляют дискомфорт пользователям в лучшем случае. В худшем могут приводить к
искажению данных, что в перспективе может вылиться в большие проблемы и
даже потерю данных клиентов.

Синтаксис тайпскрипт это зеркальное отражение ES6. Можно взять валидный ES6 листинг,
скопировать его в листинг тайпскрипт и ошибок не возникнет. Это достигается тем, что у
тайпскрипт есть механизм угадывания или предсказания типов - Type inference. Если тип явно
не определен, то  механизм попробует используя цепочку вызовов предсказать его.
В случае если тип определить не удалось будет использован спецтип Any. Файлы с листингом
тайпскрипт имеют расширение `.ts`

Если переход в одну сторону работает засчет одинакового синтаксиса, то в обратную сторону
переход осуществляется за счет инструментов коммандной строки. Это целый набор инструментов
для работы с тайпскрипт листингами и превращением их в джаваскрипт.
Говорить, что тайпскрипт компилируется в джаваскрипт не верно. Так как Компиляция это процесс
перевода листинга языка программирования понятного разработчику в, так называемый, двоичный код.
Который понятнен экзекьютору или исполнителю операционной системы, а также компьютеру. Также
джаваскрипт не является компилируемым, а его компиляция по умолчанию `JIT` осуществляется
средствами движка браузера. Тайпскрипт листинг содержит расширение синтаксиса, которого нет
в современном стандарте джаваскрипт. Чтобы запустить тайпскрипт в браузере, его листинг нужно
`транспилировать` в листинг джаваскрипт.
**Транспиляция это перевод листинга одного языка в листинг другого.**

> Технически тайпскрипт это не язык. Но расширенный синтаксис приближает его к таковым.

## Условия

Для работы с тайпскрипт необходимо выполнять 4 условия:
- Наличие установленного [NodeJS](https://nodejs.org/en/download/)
- Установленный npm модуль [TypeScript](https://www.typescriptlang.org/index.html#download-links)
- Конфигурация тайпскрипт
- Файлы с листингом тайпскрипт и расширением `.ts`

## Установка

```bash
npm install -g typescript
```

## Создание проекта

Давайте создадим проект. Проект это посути папка, в которой собранны все файлы и папки, связанные с какой-либо темой или приложение.
Часто имя папки проекто близко или носит имя проекта, для семантики. В консоли переходим к папке, где лежат все наши проекты.
У меня это папка  `Developer`

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

Так как для работы тайпскрипт нужен файл конфига, а папка еще пуста, то можно воспользоваться инструментом командной строки `tsc`
указав специальный параметр `init` это приведет к инициализации нового проект TypeScript. 

```bash
tsc --init
```

Создаем файл с расширением .tsc

```bash
touch index.ts
```

Это самый минимальный набор команд для старта в тайпскрипт

## Механизм определения типов - Type inference

Давайте рассмотрим механизм тайпинференс. Это механизм вычисления или определения типов, исходя из выражения с правой
части от оператора присваивания. Этот механизм является общим и существует во многих других языках.

> **ВАЖНО!!! При декларации переменных следует помнить, что определение типов тайпскрипт анализирует выражения.
> поэтому если при декларации переменной не указать тип, то это не значит что его там не будет.
> В этом случае используется выражение от `undefined` и его то интерпретатор типов проанализирует.
> В итоге тип на выходе будет `any` И в эту переменную можно будет присвоить все что угодно.**

```typescript
let anyTypeVariable;
anyTypeVariable = 10;
anyTypeVariable = '';
```

Как мы видим, ошибки эти инструкции не вызывают. Так как тип `any` указывает на то, что тип этой переменной любой.
Кстати за счет этого механизма и типа `any` реализована обратная совместимость с ES6 джаваскрипт. Использование типа `any`
крайне не желательно. Так как это лишает нас основного профита от тайпскрипт - строгая типизация.

Для того, чтобы определить тип вручную, не используя механизм определения типов, необходимо использовать следующий синтаксис

 ```typescript
let declaredVariableWithNumberType: number;
declaredVariableWithNumberType = 10;
// declaredVariableWithNumberType = ''; => Error: Assigned expression type "" is not assignable to type number  
```

Мы задекларировали переменную с типом `number` это следующий тип тайпскрипт. В тайпскрипт нет отдельного типа для
описания значений с плавающей точкой.

Рассмотрим слудующий пример:

```typescript
let a = 10;
let b = 20;
let resultAB = a + b;
console.log(resultAB);
```

инструкция декларации переменной `let a = 10;` не содержит явного указания типа, так как механизм определения типов смог
определить тип, исходя из выражения числа 10.

> ВАЖНО!!! Мы никогда не указываем тип вручную без необходимости.Так как это дублирование работы механизма определения типов
> и лучше него его работу не сделает никто.

> Стоит отметить, что слепо полагаться на строгую типизацию не стоит. Когда код будет транспилирован 
> в старый добрый джаваскрипт, а ошибка произойдет в рантайм. От этого ничто не защитит, но это крайний случай.
  
## Типы тайпскрипт
- any
- number
- string
- boolean
- array
- object
- function
- tuple
- enum
- null
- undefined
- never
- complex

## Any
Мы уже столкнулись с ним, рассматривая мехнаизм определения типов. Он нужен для обратной совместимости с ES6.
Так как тайпскрипт не язык, а расширение ES6, синтаксис инструкциий используется ES6 - дополненный.
Для указания этого типа достаточно выполнить сдедующую инструкцию `let variableName;` в данном случае тип по умалочнаию
определится как `any`

> Я не советую этот подход по двум причинам:
> - Механизм определения может перестать возвращать any тип в ответ на ничто
> - Если у этого нет типа, скорее всего, ему нет места в мире тайпскрипт

Указать тип `any` также можно используя расширяющий синтаксис тайпскрипт, выполнив следующую иенструкцию `let variableName: any;`.

> Я также не рекомендую использовать тип any в ваших программах, так как это открывает огромное поле для ошибок и лишает тайпскрипт
> возможности сделать свое дело.

## Number

В тайпскрипт все числа имеют тип `number`. Включая числа с плавающей точкой, для них нет отдельного типа.
Для указания этого типа достаточно выполнить следующую инструкцию `let myNumberVaraible = 10` в данном случае тип `number`
вычисляется из числового выражения `10` или мы можем его указать вручную, выполнив следующую инструкцию `let myNumberVaraible: number;`

## String
В тайпскрипт все строки имеют тип `string` 
для указания этого типа достаточно выполнить следующую инструкцию `let myStringVaraible = 'Hello, my name is Vasily Alibabaevich';`
в данном случае тип `string` вычисляется из строкового выражения `'Hello, my name is Vasily Alibabaevich'`

## Boolean
В тайпскрипт все логические значения имеют тип `boolean`
для указания этого типа достаточно выполнить следующую инструкцию

```typescript
let isEven = true;
console.log(`Is Even: ${isEven}`);
```
или получить из выражения, так же используя механизм определения типов

```typescript
 let isOdd = 3 % 2 === 0;
console.log(`Is Odd: ${isOdd}`);
```

В данном фрагменте кода первая инструкция декларирует переменную `isOdd` с типом `boolean`,
используя тип полученный в результате вычисления выражения сравнения 0 с выражением, полученным от остатка деления на 2.
Для того чтобы лучше понять укажем порядок обработки операторов, используя справочную [таблицу порядка обработки операторов](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

![alt text](https://github.com/NVBespalov/js-lessons/raw/feature/typescript/dist/operators.order.png)

Итак, видим, что первым обработается оператор присваивания, у него два операнда выражения слева и справа.
Первым обработается правая часть. Рассмотрим это выражение `(3 % 2 === 0)` здесь оператор строгого сравнения `===` имеет
порядок 10, а оператор остаток от деления 14. Поэтому сначала обработается оператор строгого сравнения `===`, видим у него есть
два операнда - это выражения слева и справа от него. Выражение левой части возвращает число 1 - это остаток от деления 3 на 2.
Получим более простой вид, приведя выражение слева к числу

```typescript
 let isOdd = 1 === 0;
console.log(`Is Odd: ${isOdd}`);
```
результат здесь false и, уже используя результат, механизм определения типов тайпскрипт получит значение типа и присвоит
его переменной isOdd. Если использовать выражение не получается, то мы можем указать его вручную, выполнив следующую инструкцию

```typescript
let isEven: boolean;
isEven = true;
console.log(`Is Even: ${isEven}`);
```

## Array
Как правило все массивы однотипны. Другими словами, всегда состоят из элементов одного типа,
крайне редко допускается смешение типов.

Рассмотрим следующую инструкцию

```typescript
let myArrVariable = [1,2,3];
myArrVariable.push(4);
```

Первая инструкция декларирует переменную `myArrVariable`, а потом инициализирует ее значением выражения `[1,2,3]`
Вторая инструкция дополняет созданный массив элементом типа число, используя выражение числа 4.
 
Следующая последовательность инструкций содержит ошибку, так как в массив чисел добавляется не число а строка.
Здесь нет никакой ошибки, так как механизм определения типов определил что тип этого выражения - числовой массив.

```typescript
let myArrVariable = [1,2,3];
myArrVariable.push('111');
```
Как я уже сказал ранее это нормально и не стоит использовать явно смешанные массивы без особой нужды.

Подобный результат мы можеб достигнув указав тип явно используя расширяющий синтаксис тайпскрипт.
```typescript
let myArrVariable: number[];
myArrVariable = [];
myArrVariable.push(1);
```

> Важно помнить что если воспользоваться выражением пустой массив `[]` то в итоге мы получим массив который
> может содержать что угодно.

```typescript
let myArrVariable = [];
myArrVariable.push(1);
myArrVariable.push('');
```

Если во время декларации переменной воспользоваться выражением смешанного массива `[1, '2', 3, 4]` то тип будет смешанным
и в массив можно будет добавлять как строковые элементы так и числовые.

```typescript
let myArrVariable = [1,'2',3];
myArrVariable.push('111');
myArrVariable.push(54);
```

Как вы понимаете чем больше разных типов будет тем больше список потенциально возможных элементов в этом массиве.

> Лучше не использовать смешанные массивы. Так как это ведет к потенциальным ошибкам которые
> тайпскрипт отследить не сможет.

```typescript
let myArrVariable = [1,'2',3];
myArrVariable[0].toFixed();
```
Вторая инструкция исходя из того что в массиве может быть как число так и строка не верна и для ее работы придется писать
"Паразитные проверки" такого рода код не несет в себе бизнес ценности и создан для обхода ошибок

```typescript
let myArrVariable = [1,'2',3];
const myArrVariableElement = myArrVariable[0];
typeof myArrVariableElement === 'number' ? myArrVariableElement.toFixed() : parseInt(myArrVariableElement, 10);
``` 

Как вы понимаете чем больше потенциально возможных типов элементов тем больше этого кода нам придется писать. Нужно
стремиться писать меньше кода. И больше реиспользовать.

## Object

Обьекты являются упорядоченными колекциями. Другими словами все свойства обьектов упорядоченным по именам ключей по возрастанию.
Для того, чтобы определить обьектный тип достаточно присвоить обьект в переменную и механизм определения типов тайпскрипт
сделает это за нас.

```typescript
const userVasya = {id: 'a10', firstName: 'Василий', middleName: 'Алибабаевич'};
userVasya.aka = 'Алибаба';
``` 

Инструкция присваивания свойству aka вызывает ошибку `TS2339: Property 'aka' does not exist on type '{ id: string; firstName: string; middleName: string; }'`
как видим тайпскрипт указывает на определенный тип - `{ id: string; firstName: string; middleName: string; }` и среди свойств нет свойства `aka`.
Если тип обьекта получить из выражения не получается то мы можем указать обьектный тип вручную.

```typescript
const userVasya: { id: string; firstName: string; middleName: string; aka: string; } = {id: 'a10', firstName: 'Василий', middleName: 'Алибабаевич'};
userVasya.aka = 'Алибаба';
``` 
Теперь инструкция присваивания свойства `aka` не вызывает ошибки. Зато правая часть оператора присваивания выражения в
переменную `userVasya` вызывает ошибку `TS2741: Property 'aka' is missing in type '{ id: string; firstName: string; middleName: string; }' but required in type '{ id: string; firstName: string; middleName: string; aka: string; }'.`

Обратим внимание на правую часть выражения. Среди свойств создаваемого обьекта нет свойства aka так как оно может быть
не обязательным или поялвяться как в нашем случае с течением времени. Для этого в описании обьекта изменим описание
свойства `aka` `{ id: string; firstName: string; middleName: string; aka?: string; }` вопросительный знак указывает на
то, что это свойство опциональное и может присутствовать а может и нет. Я рекомендую из