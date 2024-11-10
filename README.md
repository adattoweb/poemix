# Poemix
## UA
Привіт! Я створив пет-проєкт мета якого покращити вивчення (запам'ятовування) віршів (текстів) напам'ять — Віршич (англ. Poemix). 
Якщо коротко, то користувач вставляє вірш (текст) у поле вводу, після чого появляється віконце, 
де користувачу потрібно буде вводити по рядку тексту з вірша, та перевіряти свій результат, 
якщо користувач забуде якийсь рядок, користувач зможе натиснути на кнопку після чого висвітиться правильний рядок. 
Після введеня рядка користувачу буде показаний результат а також він може почати перевіряти наступний рядок.
Після того як користувач увів усі рядки з вірша, йому буде відображатися час який він був у програмі,
а також кількість помилок.
В Віршич (англ. Poemix) також є опція відстеження покращень користувачів з часом, 
є статистика скільки всього разів користувач перевіряв/вчив вірші, а також кількість помилок.
Також є опція обирати складність коли користувач натискає перевірити рядок. 
При складній складності висвічується перше слово, при середній - кожне друге слово пропадає, і так далі.

### ОНОВЛЕННЯ 2.0.0
**Нові зміни:**
- Додано послідовний режим (детальніше в інструкції на сайті)
- Додано мозаїчний режим (детальніше в інструкції на сайті)
- Покращено візуальний вигляд інструкції
- Додано сторінку "Історія" де користувач може дивитися останні вірші які він проходив, а також наново їх проходити.
- Додано опцію таймер за допомогою якої можна встановлювати собі таймер, та намагатися пройти вірш за деякий час.

### ОНОВЛЕННЯ 2.1
Тепер усі версії рахуються не n.n.n, а n.n де перша цифра - масштабне оновлення, а друга цифра - оновлення над масштабним оновленням.

Виправлено ряд багів зокрема:
- Було виправлено баг з таймером, коли він не правильно закінчував свою роботу.
- Було виправлено баг з неправильним додаванням коми в об'єкт localStorage, із-за чого історія не відображалась.
- Було додано фунцію оновлення на сторінку історія, щоб висвічювати нові зміни в історії при натисканні на іконку.
- Було виправлено баг з неправильним копіюванням

### ОНОВЛЕННЯ 2.2
- Виправленно баги
- Покращенно структуру проєкта


## EN
Hello! I've created a pet project aimed at improving the memorization of poems (texts). 
In short, the user pastes a poem (text) into the input field, 
after which a window appears where the user needs to input the poem line by line and check their result. 
If the user forgets a line, they can press a button to reveal the correct line. After entering each line,
the user will see the result and can move on to the next line for verification.
After the user has entered all the lines from the poem, they will see the time they spent in the program, 
as well as the number of mistakes.
In the Poemix memorization tool, there is also an option to track users improvements over time. 
The statistics show how many times a user has reviewed/studied poems and the number of mistakes made.
Additionally, users can choose the difficulty level when checking a line. In high difficulty, 
only the first word is shown; in medium difficulty, every second word disappears, and so on.

### UPDATE 2.0.0
**New Changes:**
- Added Sequential Mode (more details in the instructions on the website)
- Added Mosaic Mode (more details in the instructions on the website)
- Improved the visual layout of the instructions
- Added a "History" page where users can view recent poems they’ve completed and retry them
- Added a timer option that allows users to set a timer and try to complete the poem within a specified time

### UPDATE 2.1
All versions are now counted as n.n, where the first digit represents a major update, and the second digit represents an update to that major release.

Fixed a number of bugs, including:
- Fixed a timer bug that caused it to end incorrectly.
- Fixed a bug with incorrect comma placement in the `localStorage` object, which prevented the history from displaying.
- Added a refresh function to the history page so that new changes are displayed when the icon is clicked.
- A bug with incorrect copying has been fixed

### UPDATE 2.2
- Fixed bugs
- Improved project structure
