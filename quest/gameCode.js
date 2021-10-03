//После игры необходимо спросить номер вопроса. 
//По номеру вопроса нужно вывести текст вопроса и текст выбранного ответа

var event, ok;

var answers = [];

function procesResponses(question, choice1, choice2, quantity) {
    do {//Выводим первый вопрос
        ok = false;
        event = +prompt(question + choice1 + choice2 + '-1 - Выход из игры');

        if (event == -1) {
            break;
        }
        else {
            ok = isAnswer(quantity, event);
            if (event == 1) {
                answers.push(choice1);
            } else {
                answers.push(choice2);
            }
        }
    } while (!ok);
}

procesResponses(works.a00, works.a1, works.a2, works.a0);

switch (event) {
    case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2
        procesResponses(works.b00, works.b1, works.b2, works.b0);

        switch (event) {
            case 1: // Второе действие, если во 2 окне ввели 1 то переходим на 4 окно
                procesResponses(works.d00, works.d1, works.d2, works.d0);
                break;

            case 2: // Второе действие   Если ввели 2 то также переходим на 4 окно
                procesResponses(works.d00, works.d1, works.d2, works.d0);
                break;

            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;

    case 2: // Первое действие    Если в 1 окне ввели 2 то переходим к 3 окну
        procesResponses(works.c00, works.c1, works.c2, works.c0);

        switch (event) {
            case 1: // Второе действие
                procesResponses(works.d00, works.d1, works.d2, works.d0);
                break;

            case 2: // Второе действие
                procesResponses(works.b00, works.d1, works.d2, works.d0);
                break;

            case -1: // Второе действие
                break;

            default:
                alert('Ошибка');
        }
        break;

    case -1: // Первое действие
        break;

    default:
        alert('Ошибка');
}
var questionNumber = +prompt('Введите номер вопроса');
alert(`Ваш ответ был: ${answers[questionNumber]}`);

alert('Спасибо за игру');

//------------------------------------------
function isAnswer(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
    return true;
}