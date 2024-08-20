const idValidator = new validateForm('txtLoginId',async(value)=>{
    if(value){
        const res = await exists(value);
        if(res.data){
            return '此用户名已存在，请修改'
        }
        return null
    }else{
        return '请输入内容';
    }
});

const nickValidator = new validateForm('txtNickname',async(value)=>{
    if(value){
        return null;
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

const rePwdValidator = new validateForm('txtLoginPwdConfirm',async(value)=>{
    if(value){
        if(value !== pwdValidator.input.value){
            return '密码不一致';
        }
        return null;
    }else{
        return '请再次输入密码';
    }
});


// 注册表单提交事件
const form = $('.user-form');
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    // 验证所有表单数据
    const result = await validateForm.validate(
        idValidator,
        nickValidator,
        pwdValidator,
        rePwdValidator
    );
    // console.log(result);
    if(!result){
        return;
    }else{
        // 获取表单内容
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // console.log(data);
        // 验证通过，访问api
        const res = await reg(data);
        // console.log(res);
        
        if(res.code !== 0){
            return;
        }
        alert('注册成功');
        window.location.href = './login.html';
    }
})