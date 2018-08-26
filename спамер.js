'use script';

class AntiCaptcha {
    constructor(clientKey) {
        this.clientKey = clientKey;
        this.corsProxy = 'https://cors-anywhere.herokuapp.com/';
    }

    createTask(captchaUrl, callback) {
        this.getBase64FromUrl(captchaUrl, (error, captchaBase64)=> {
            if (error) throw new Error(error);

            $.ajax({
                url: 'https://api.anti-captcha.com/createTask',
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

                success: callback
            });
        });
    }

    getTaskResult(taskId, callback) {
        $.ajax({
            url: 'https://api.anti-captcha.com/getTaskResult',
            method: 'POST',
            contentType: 'application/json; charset=utf-8',

            data: JSON.stringify({
                clientKey: this.clientKey,
                taskId: taskId
            }),

            success: callback
        });
    }

    async resolveCaptcha(captchaUrl) {
        return await new Promise((resolve, reject)=> {
            this.createTask(captchaUrl, (response)=> {
                if (response.errorId !== 0) {
                    console.error(response);
                    throw new Error('Ошибка в создании таска для капчи ' + captchaUrl);
                }

                let intervalId = setInterval(()=> {
                    this.getTaskResult(response.taskId, (response)=> {
                        if (response.status === 'ready') {
                            clearInterval(intervalId);
                            resolve(response.solution.text);
                        }
                    });
                }, 2000);
            })
        });
    }

    getBase64FromUrl(captchaUrl, callback) {
        if (!captchaUrl || typeof captchaUrl !== 'string') callback(new Error('Аргумент captchaUrl обязателен и должен быть строкой.'));

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

            let error = null;

            if (!base64) error = new Error('Ошибка в получении base64');

            callback(error, base64);
        };

        captchaImg.onerror = () => {
            callback(new Error('Ошибка в загрузке изображения капчи по URL ' + captchaUrl));
        };
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

    post(message = '', target, _payload = {}, callback) {
        let methodName = 'post'; // Название метода из VK.
        let url = this.controllerOptions.apiUrl + methodName; // Формируем URL, на который пойдёт запрос.

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
        $.ajax({
            url,
            dataType: 'jsonp',
            data: $.param(payload),

            success: (res)=> {
                // Если ошибка, то возвращаем её первым аргументом.
                if (res.error) return callback(res);

                // Если ошибки нет, то возвращаем ответ вторым аргументом.
                callback(null, res.response);
            }
        });
    }

    postGroupByUrl(message = '', groupUrl, _payload = {}, callback) {
        let groupShortName = groupUrl.match(/https?:\/\/vk\.com\/([\w]+)/)[1];

        // Узнаём id группы по короткому имени.
        $.ajax({
            url: 'https://api.vk.com/method/groups.getById',
            dataType: 'jsonp',
            data: { group_id: groupShortName, access_token: this.controllerOptions.token, v: this.controllerOptions.v },

            success: (res)=> {
                // Если ошибка, то возвращаем её первым аргументом.
                if (res.error) return callback(res.error);

                // Вытаскиваем ID группы из ответа.
                let groupId = res.response[0].id;

                // Постим сообщение из уже готового метода.
                this.post(message, -groupId, _payload, callback);
            }
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

    let vk = new VkController(data.token);
    let antiCaptcha = new AntiCaptcha(data.clientKey);

    appendToLog('Рассылка началась.');

    let intervalId = setInterval(()=> {
        for (let groupUrl of data.groupsUrl) {
            let message = data.message;
            let payload = { attachments: data.attachments };

            let postCallback = async (error, response)=> {
                if (error) {
                    if (error.error_code === 14) { // Если капча
                        if (!antiCaptcha.clientKey) throw new Error('Нужно ввести капчу, но ключ от антикапчи не обнаружен.');

                        let captchaKey = await antiCaptcha.resolveCaptcha(error.captcha_img);

                        if (!captchaKey) throw new Error('Ошибка при решении капчи.');

                        payload.captcha_sid = error.captcha_sid;
                        payload.captcha_key = captchaKey;

                        // Рекурсирвно отправляем еще одну попытку отправки сообщения уже с капчей
                        return vk.wall.postGroupByUrl(message, groupUrl, payload, postCallback);
                    } else {
                        console.error(error);
                        throw new Error('Ошибка от VK');
                    }
                }

                appendToLog('📧 Сообщение успешно доставлено в группу ' + groupUrl);

                console.log('Делаем искуственную задерку в 1 секунду...');
                await new Promise((resolve, reject)=> { setTimeout(()=> resolve(), 1000) });
                console.log('Готово.');
            }

            vk.wall.postGroupByUrl(message, groupUrl, payload, postCallback);
        }
    }, data.interval);

    $('.start')
        .unbind('click', startHandler)
        .removeClass('start')
        .addClass('stop')
        .attr('intId', intervalId)
        .html('Остановить')
        .click(stopHandler);
}

function stopHandler() {
    appendToLog('Рассылка закончилась.');

    clearInterval($('.stop').attr('intId'));

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
