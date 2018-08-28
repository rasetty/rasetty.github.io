'use script';

class AntiCaptcha {
    constructor(clientKey) {
        this.clientKey = clientKey;
        this.corsProxy = 'https://cors-anywhere.herokuapp.com/';
        this.anticaptchaApiUrl = 'https://api.anti-captcha.com/';
    }

    async createTask(captchaUrl) {
        const __METHOD_NAME = 'createTask';

        let captchaBase64;

        try {
            captchaBase64 = await this.getBase64FromUrl(captchaUrl);
        } catch(error) {
            console.error(error);
            return false;
        }

        return await new Promise((resolve, reject)=> {
            $.ajax({
                url: this.anticaptchaApiUrl + __METHOD_NAME,
                method: 'POST',
                contentType: 'application/json; charset=utf-8',

                data: JSON.stringify({
                    clientKey: this.clientKey,
                    languagePool: 'ru',
                    task: {
                        'type': 'ImageToTextTask',
                        'body': captchaBase64,
                        'phrase': false,
                        'case': false,
                        'numeric': false,
                        'math': false
                    }
                }),

                success: resolve
            });
        });
    }

    async getTaskResult(taskId) {
        const __METHOD_NAME = 'getTaskResult';

        if (!taskId || typeof taskId !== 'number') {
            console.error('taskId: ', taskId);
            throw new Error('Аргумент taskId обязателен и должен быть числом.');
        }

        return await new Promise((resolve, reject)=> {
            $.ajax({
                url: this.anticaptchaApiUrl + __METHOD_NAME,
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ clientKey: this.clientKey, taskId }),
                success: resolve
            });
        });
    }

    async resolveCaptcha(captchaUrl) {
        if (!captchaUrl || typeof captchaUrl !== 'string') {
            console.error('captchaUrl: ', captchaUrl);
            throw new Error('Аргумент captchaUrl обязателен и должен быть строкой.');
        }

        let getTaskResult;
        let createTaskResult = await this.createTask(captchaUrl);

        if (createTaskResult.errorId !== 0) {
            console.error('createTaskResult: ', createTaskResult);
            throw new Error('Ошибка в создании таска антикапчи');
        }

        do {
            getTaskResult = await this.getTaskResult(createTaskResult.taskId);
        } while (getTaskResult.status === 'processing');

        return getTaskResult.solution.text;
    }

    async getBase64FromUrl(captchaUrl) {
        return await new Promise((resolve, reject)=> {
            let captchaImg = new Image();
            captchaImg.crossOrigin = 'anonymous';
            captchaImg.src = this.corsProxy + captchaUrl;

            captchaImg.onload = () => {
                let canvas = document.createElement('canvas');
                canvas.width = captchaImg.width;
                canvas.height = captchaImg.height;

                let ctx = canvas.getContext('2d');
                ctx.drawImage(captchaImg, 0, 0);

                let base64 = canvas.toDataURL('image/jpeg');

                if (!base64) throw new Error('Ошибка в получении base64');

                resolve(base64);
            };

            captchaImg.onerror = () => {
                throw new Error('Ошибка в загрузке изображения капчи по URL ' + captchaUrl);
            };
        });
    }
}

class VkController {
    constructor(token = null) {
        // Задаём опции для всех методов класса.
        this.controllerOptions = {
            token: token, // Токен авторизации
            v: '5.80', // Версия API
            apiUrl: 'https://api.vk.com/method/' // URL, по которому будут идти запросы.
        };

        // Расширяем класс
        this.wall = new VkWallController(this.controllerOptions);
    }
}

class VkWallController {
    constructor(controllerOptions) {
        // Наследуемые опции от родительского класса.
        this.controllerOptions = controllerOptions;

        // Расширяем опции под наш класс.
        this.controllerOptions.methodClass = 'wall';

        // Дополняем URL.
        this.controllerOptions.apiUrl = this.controllerOptions.apiUrl + this.controllerOptions.methodClass + '.';
    }

    async post(message = '', target, _payload = {}) {
        const __METHOD_NAME = 'post'; // Название метода из VK.
        let url = this.controllerOptions.apiUrl + __METHOD_NAME; // Формируем URL, на который пойдёт запрос.

        // Создаём payload, который будет отправлен с запросом.
        let payload = {
            access_token: this.controllerOptions.token, // Токен VK
            v: this.controllerOptions.v, // Версия API
            message: message, // Сообщение, которое будет на стене.
            owner_id: target // Сообщение, куда идёт отправка.
        };

        // Дополняем payload, переданными свойствами.
        for (let key in _payload) payload[key] = _payload[key];

        if (payload.attachments.length) {
            payload.attachments = payload.attachments.join(',');
        }

        // Отправляем запрос.
        return await new Promise((resolve, reject)=> {
            $.ajax({
                url,
                dataType: 'jsonp',
                data: $.param(payload),
                success: resolve
            });
        });
    }

    async postGroupByUrl(message = '', groupUrl, _payload = {}) {
        let groupShortName = groupUrl.match(/https?:\/\/vk\.com\/([\w]+)/)[1];

        // Узнаём id группы по короткому имени.
        return await new Promise(async (resolve, reject)=> {
            $.ajax({
                url: 'https://api.vk.com/method/groups.getById',
                dataType: 'jsonp',
                data: { group_id: groupShortName, access_token: this.controllerOptions.token, v: this.controllerOptions.v },

                success: async (res)=> {
                    // Если ошибка, то возвращаем её первым аргументом.
                    if (res.error) {
                        console.error(res.error);
                        return false;
                    }

                    // Вытаскиваем ID группы из ответа.
                    let groupId = res.response[0].id;

                    // Постим сообщение из уже готового метода.
                    let postResult = await this.post(message, -groupId, _payload);

                    resolve(postResult);
                }
            });
        });
    }
}


function getData() {
    return {
        message:        $('#message').val(), // Сообщение. Пример: "Hello World!"
        token:          $('#token').val(), // Токен. Пример: 5f3ee4e14222979bc714a9c2cad3f9c8997asfgh35gsad478f0354f80a8a649f84128c6785a8984cbd4cdc
        clientKey:      $('#clientKey').val(), // Ключ на антикапче. Пример: 5f3ee4e14222979b
        attachments:    $('#attachments').val().replace(/\s+/g,' ').trim().split(' '), // Приложения. Пример: photo-26604743_456239041 photo-26604743_456239041
        groupsUrl:      $('#groups').val().replace(/\s+/g,' ').trim().split(' '), // Ссылки на группы. Пример: https://vk.com/club26604743 https://vk.com/club26604743
        interval:       parseInt($('#interval').val()) * 1000 || 3000, // Задерка между цикли новых отправок сообщений (в секундах). Пример: 10
    };
}

$(document).ready(()=> {
    $('.start').click(startHandler);
});

async function startHandler() {
    let data = getData();

    try {
        if (!data) throw new Error('Ошибка в получении data.');
        if (!data.message || !data.message.length) throw new Error('Поле message обязательно.');
        if (!data.token) throw new Error('Поле token обязательно.');
        if (!data.groupsUrl || !data.groupsUrl.length) throw new Error('В поле groupsUrl нужна минимум одна группа.');
    } catch (error) {
        return alert(error);
    }

    $('.start')
        .unbind('click', startHandler)
        .removeClass('start')
        .addClass('stop')
        .html('Остановить')
        .click(stopHandler);

    appendToLog('Рассылка началась.');

    let vk = new VkController(data.token);
    let antiCaptcha = new AntiCaptcha(data.clientKey);

    while ($('.stop').length) {
        for (let groupUrl of data.groupsUrl) {
            if (!$('.stop').length) break;

            let message = data.message;
            let payload = { attachments: data.attachments };

            let postResult = await vk.wall.postGroupByUrl(message, groupUrl, payload);

            if (postResult.error) {
                let error = postResult.error;

                switch (error.error_code) {
                    case 14:
                        if (!antiCaptcha.clientKey) { // Еcли антикапчи нет, то пропускаем итерацию.
                            console.error('Нужно ввести капчу, но ключ от антикапчи не обнаружен.');
                            appendToLog('Нужно ввести капчу, но ключ от антикапчи не обнаружен.');
                            await pause(2000);
                            continue;
                        }

                        let captchaKey = await antiCaptcha.resolveCaptcha(error.captcha_img);

                        if (!captchaKey) throw new Error('Ошибка при решении капчи.');

                        payload.captcha_sid = error.captcha_sid;
                        payload.captcha_key = captchaKey;

                        await vk.wall.postGroupByUrl(message, groupUrl, payload);

                        break;
                    default:
                        console.error(postResult);
                }
            }

            await pause(2000);
        }

        // Задержка между повторами цикла отправок
        await new Promise((resolve, reject)=> { setTimeout(()=> { resolve() }, data.interval) });
    }
}

function stopHandler() {
    appendToLog('Рассылка закончилась.');

    $('.stop')
        .unbind('click', stopHandler)
        .removeClass('stop')
        .addClass('start')
        .attr('intId', null)
        .html('Начать')
        .click(startHandler);
}

function appendToLog(message) {
    $('#log').val($('#log').val() + message + '\n');
    console.log(message);
}

async function pause(ms) {
    console.log(`Делаем искуственную задерку в ${ms / 1000} секунды...`);
    await new Promise((resolve, reject)=> { setTimeout(()=> { resolve() }, ms) });
    console.log('Готово.');
}
function сlear(){
	localStorage.clear();
	window.location.reload();
}
function save(){
	localStorage.setItem('tokenS', document.getElementById('token').value); 
	localStorage.setItem('messageS', document.getElementById('message').value); 
	localStorage.setItem('intervalS', document.getElementById('interval').value); 
	localStorage.setItem('attachmentsS', document.getElementById('attachments').value); 
	localStorage.setItem('clientKeyS', document.getElementById('clientKey').value);
	localStorage.setItem('groupsS', document.getElementById('groups').value);
}

document.getElementById('token').value = localStorage.getItem('tokenS');
document.getElementById('message').value = localStorage.getItem('messageS');
document.getElementById('attachments').value = localStorage.getItem('attachmentsS');
document.getElementById('clientKey').value = localStorage.getItem('clientKeyS');
document.getElementById('interval').value = localStorage.getItem('intervalS')
document.getElementById('groups').value = localStorage.getItem('groupsS')
