(async()=>{
    // 首先判断是否登陆，借用api来实现
    const res = await profile();
    // console.log(res);
    const userinfo = res.data;
    if(res.code !== 0){
        window.location.href = './login.html';
        alert('请先登陆');
    }
    
    const doms = {
        aside: {
            nickname: $('#nickname'),
            loginId: $('#loginId')
        },
        close: $('.close'),
        container: $('.chat-container'),
        msg: {
            input: $('#txtMsg'),
            button: $('button')
        }
    }

    // 显示用户信息
    const setUserInfo = ()=>{
        doms.aside.loginId.innerText = userinfo.loginId;
        doms.aside.nickname.innerText = userinfo.nickname;
    }
    setUserInfo();

    // 登出
    doms.close.onclick = ()=>{
        logout();
        window.location.href = './login.html';
    }


    // 滚动到底部
    const scrollBottom = () => {
        doms.container.scrollTop = doms.container.scrollHeight;
    }

    // 初始化时间
    const formatTime = (time)=>{
        console.log(time);
        
        const time0 = new Date(+time);
        const year = time0.getFullYear();
        const month = (time0.getMonth()+1).toString().padStart(2,'0');
        const day = time0.getDay().toString().padStart(2,'0');
        const hour = time0.getHours().toString().padStart(2,'0');
        const min = time0.getMinutes().toString().padStart(2,'0');
        const sec = time0.getSeconds().toString().padStart(2,'0');
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }
    /**
     * 添加消息到列表中
     * @param {Object} chatInfo 
     */
    const addChat = (chatInfo) => {
        // console.log(chatInfo);
        
        const div = $$$('div');
        div.classList.add('chat-item');
        if(chatInfo.from){
            div.classList.add('me');
        }
        const img = $$$('img');
        img.className = 'chat-avatar';
        img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
        const content = $$$('div');
        content.className = 'chat-content';
        content.innerText = chatInfo.content;
        const date = $$$('div');
        date.className = 'chat-date';
        date.innerText = formatTime(chatInfo.createAt);
        div.appendChild(img);
        div.appendChild(content);
        div.appendChild(date);
        doms.container.appendChild(div);
        scrollBottom();
    }
    // 获取历史信息，加入到对话框
    const chatInfo = await getHistory();
    // console.log(chatInfo);
    
    chatInfo.data.forEach(i => {
        console.log(i);
        
        addChat({
            from: i.from,
            to: i.to,
            content: i.content,
            createAt: i.createdAt
        });
    });

    // 发送消息
    doms.msg.button.onclick = async(e) => {
        e.preventDefault();
        const message = doms.msg.input.value; 
        const date0 = new Date();
        addChat({
            from: userinfo.nickname,
            content: message,
            createAt: date0
        })
        doms.msg.input.value = '';
        const result = await sendChat(message);
        if(result.code !== 0)
            return;
        const respond = result.data;
        console.log(respond);
        
        const date1 = new Date();
        addChat({
            content:respond.content,
            createAt:date1
        })
        scrollBottom();
    }
    
})();