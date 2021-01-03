$.ajax({
        url: 'https://api.vk.com/method/messages.send', //wall.post
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {
            access_token: 'd38e3107c890670d6569e255666a30aad76c20ad4517c473a421c36d71cfd3e3cd9e2ffa8f69bbc05ad4a',
            peer_id: 185014513,//owner_id: data.groups[i]
            message: '1',
            attachments: '',
            captcha_sid: '',
            captcha_key: '',
            v: '5.45'//v
        },
        success: jsonp=>{
            console.log(jsonp);
        }
    })

