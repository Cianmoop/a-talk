const idValidator = new validateForm('txtLoginId',async(value)=>{
    if(value){
        return null
    }else{
        return '请输入内容';
    }
});

const pwdValidator = new validateForm('txtLoginPwd',async(value)=>{
    if(value){
        return null;
    }else{
        return '请输入密码';
    }
});


// 注册表单提交事件
const form = $('.user-form');
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    // 验证所有表单数据
    const result = await validateForm.validate(
        idValidator,
        pwdValidator,
    );
    // console.log(result);
    if(!result){
        return;
    }else{
        // 获取表单内容
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // 验证通过，访问api
        const res = await login(data);
        // console.log(res);
        
        if(res.code !== 0){
            alert(res.msg);
            return;
        }
        alert('登陆成功');
        window.location.href = './index.html';
    }
})