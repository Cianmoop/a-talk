/**
 * 配置表单验证
 */
class validateForm{
    /**
     * 获取 dom id，使用校验规则
     * @param {String} idName input id名
     * @param {Function} validateFn 校验规则函数，失败返回错误信息，成功返回null
     */
    constructor(idName,validateFn){
        this.input = $('#'+idName);
        this.p = this.input.nextElementSibling;
        this.validateFn = validateFn;
        this.input.addEventListener('blur',()=>{
            this.validate();
        });
    }
    /**
     * 验证，成功返回true，错误返回false
     */
    async validate(){
        const err = await this.validateFn(this.input.value);
        if(err){
            this.p.innerHTML = err;
            return false;
        }else{
            this.p.innerHTML = '';
            return true;
        }
    }
    /**
     * 验证所有表单内容
     * @param  {...any} validators 所有的表单验证器
     */
    static async validate(...validators){
        const proms = validators.map(i=>i.validate());
        const result = await Promise.all(proms);
        return result.every(i=>i);
    }
}



