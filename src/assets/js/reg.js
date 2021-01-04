function reg() {
    let validateName = (rule, value, callback) => {
        if (/[\u4e00-\u9fa5_a-zA-Z0-9_]{2,10}/.test(value) == false) {
            callback(new Error('用户名由2-210位字母组成'));
        } else {
            callback();
        }
    };
    let validatePhone = (rule, value, callback) => {
        if (/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}(\s*$)/.test(value) == false) {
            callback(new Error('手机号由11位数字组成'));
        } else {
            callback();
        }
    };
    let validateWeixin = (rule, value, callback) => {
        if (/^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(value) == false) {
            callback(new Error('微信号由5-19位数字字母组成'));
        } else {
            callback();
        }
    };
}
export default reg