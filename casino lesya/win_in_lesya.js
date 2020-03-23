document.getElementById('start').onclick = start;

function start() {

if (document.getElementById('rate').value == '') return alert('Введите все данные')
if (document.getElementById('access_token').value == '') return alert('Введите все данные')


document.getElementById('log').innerHTML = 'Началось \n'

    const DATA = {
        access_token: document.getElementById('access_token').value, 
        peer_id: -158861435,
        start_rate: document.getElementById('rate').value
    }
    let status,
        rate_coeff = 1;
    
    
    //проверка ответа
    function checking(sts) {
    
        switch(sts){
            case 'п': {
                document.getElementById('log').innerHTML += 'Победа \n'
                rate_coeff *= 2;
                send(DATA.start_rate * rate_coeff);
                console.log('second');
                break
            }
            case 'в': {
                document.getElementById('log').innerHTML += 'Проиграли \n'
                rate_coeff = 1;
                console.log('aaa', );
                send(DATA.start_rate);
                break
            }
            case 'и': {
                document.getElementById('log').innerHTML += 'Ничья \n'
                rate_coeff = 1;
                console.log('aaa');
                send(DATA.start_rate);
                break
            }
            default: {
                document.getElementById('log').innerHTML += 'Ошибка\nКонец '
            }
        }
    }
    
    //отправка
    function send(rate) {
            
            $.ajax({
                url: 'https://api.vk.com/method/messages.send',
                jsonp: 'callback',
                dataType: 'jsonp',
                data: {
                        access_token: DATA.access_token,
                        peer_id: DATA.peer_id,
                        message: 'казино ' + rate + 'кк', 
                        v: '5.45'
                },
                success: setTimeout(check,1000)
            });
    }
    
    //получение ответа
    function check() {
            $.ajax({
                url: 'https://api.vk.com/method/messages.getHistory',
                jsonp: 'callback',
                dataType: 'jsonp',
                data: {
                    access_token: DATA.access_token,
                    count: 1,
                    peer_id: DATA.peer_id,
                    v: '5.103'
                },
                success: jsonp=>{ status = jsonp.response.items[0].text[15]; setTimeout(()=> checking(status), 4000)}
            });
    
            
    }
    send(DATA.start_rate);
    //console.log(DATA.start_rate)
}