const baseUrl = 'https://study.duyiedu.com';
// 用于保存token的属性名
const tokenName = 'token';


// 封装get函数
const get = (url) => {
    // header信息
    const headers = {};
    const token = localStorage.getItem(tokenName);
    if(token){
        headers.authorization = `Bearer ${token}`;
    }
    // console.log(headers);
    return fetch(baseUrl+url,{
        headers,
        method: 'GET'
    });
}

// 封装post函数
const post = (url,bodyObj) => {
    // header信息，设置请求体信息类型
    const headers = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem(tokenName);
    if(token){
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(baseUrl+url,{
        headers,
        method: 'POST',
        body: JSON.stringify(bodyObj)
    });
}

const reg = async(userinfo) => {
    const res = await post(`/api/user/reg`,userinfo);
    return await res.json();
}

const login = async(loginInfo) => {
    const res = await post('/api/user/login',loginInfo);
    const result = await res.json();
    // 判断登陆信息
    if(result.code === 0){
        const token = res.headers.get('authorization');
        localStorage.setItem(tokenName,token);
    }
    return result;
}

const exists = async(loginId) => {
    const res = await get(`/api/user/exists?loginId=${loginId}`);
    return await res.json();
}

const profile = async() => {
    const res = await get(`/api/user/profile`);
    return await res.json();
}

const sendChat = async(content) => {
    const res = await post(`/api/chat`,{content});
    return await res.json();
}

const getHistory = async() => {
    const res = await get('/api/chat/history');
    return await res.json();
}

const logout = () => {
    localStorage.removeItem('token');
}