//привязка кнопок
document.getElementById('start').onclick = start;
document.getElementById('show').onclick = show;
//показать фильтры
function show() {
    const filters = document.getElementById('filters');
    filters.style.display = (filters.style.display != 'none')?'none':'block';
}
//основная функция
async function start(){
    //переменные для работы
    let link = document.getElementById('link').value,
        members_count,
        members  = [],
        count = document.getElementById('count').value || -1,
        offset = document.getElementById('offset').value || 0,
        token = document.getElementById('token').value;
    //получаем фильтры
    let gender = document.getElementById('gender').value || -1,
        ageOver = document.getElementById('ageOver').value || -1,
        ageUnder = document.getElementById('ageUnder').value || -1,
        country = document.getElementById('country').value || -1,
        city = document.getElementById('city').value || -1;
    //обрабатываем фильтры
    //преобразуем пол
    if(gender == 'м'){
        gender = 2;
    }else if(gender == 'ж'){
        gender = 1;
    }
    //делаем массив стран
    if(country != -1){
        country = country.split(',');
    }
    //делаем массив городов
    if(city != -1){
        city = city.split(',');
    }
    //получаем год до
    if(ageOver != -1){
        ageOver = (ageOver - (new Date).getFullYear()) * (-1);
    }
    //год выше
    if(ageUnder != -1){
        ageUnder = (ageUnder - (new Date).getFullYear()) * (-1);
    }
    //получаем ид или доменное имя
    if(link.slice(15, 19) == 'club'){//чекаем на клаб и берем ид
    	link = link.slice(19);
    }else if(link.slice(15, 21) == 'public'){ //чекаем на паблик и берем ид
    	link = link.slice(21);
    }else{ //берем доменное имя
    	link = link.slice(15);
    }
    //получаем количество участников в группе
    await new Promise((resolve)=>{
        $.ajax({
            url: 'https://api.vk.com/method/groups.getById',
            jsonp: 'callback',
            dataType: 'jsonp',
            data: {
                access_token: token,
                group_id: link,
                fields: 'members_count',
                v: '5.130'
            },
            success: (jsonp)=>{
                members_count = jsonp.response[0].members_count;
                //если в группе людей больше чем нужно получить
                if(members_count > count && count != -1) members_count = count;
                resolve()
            }
        });
    })
    //получаем всех участников по тысяче
    for(let i = 0; i <= Math.floor(members_count / 1000)+2; i++){
    //while(members_count > 0){
        await new Promise((resolve)=>{
            $.ajax({
                url: 'https://api.vk.com/method/groups.getMembers',
                jsonp: 'callback',
                dataType: 'jsonp',
                data: {
                    access_token: token,
                    group_id: link,
                    count: (members_count < 1000)?members_count:1000,
                    offset: i * 1000 + offset,
                    fields: 'sex,city,country,bdate',
                    v: '5.130'
                },
                success: (jsonp)=>{
                    //составляем массив участников
                    for(let i = 0; i < jsonp.response.items.length; i++){
                        let person = jsonp.response.items[i];
                        //применем фильтры
                        try{
                            if( ((gender == -1)?true:(person.sex === gender)) && ((ageUnder == -1)?true:(person.bdate.slice(-4) >= ageUnder)) && ((ageOver == -1)?true:(person.bdate.slice(-4) <= ageOver)) ){
                                //проверка фильтра страны
                                for(let i = 0; i < (country == -1)?1:country.length; i++){
                                    console.log(country.length)
                                    if( ((country == -1)?true:(country[i].toLowerCase() == person.country.title.toLowerCase())) ){
                                        //проверка фильтра города
                                        for(let i = 0; i < (city == -1)?1:city.length; i++){
                                            if( (city == -1)?true:(city[i].toLowerCase() == person.city.title.toLowerCase()) ){
                                                members.push(person.id);
                                            }
                                        }
                                    }
                                }
                            }
                        }catch{
                            //to do
                        }
                    }
                    //вычитаем из нудного количества сколько вывели
                    members_count -= (members_count < 1000)?members_count:1000;
                    console.log(members_count)
                    //выводим участников
                    document.getElementById('ids').value = members;
                    document.getElementById('amount').innerHTML = 'Amount = ' + members.length;
                    resolve()
                }
            });
        })
    }
}