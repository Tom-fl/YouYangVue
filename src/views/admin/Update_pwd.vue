<template>
  <div>
        <logo>
            <img slot="logo-img" src="@/assets/img/log.png" alt="">
            <h1 slot="logo-text">修改密码</h1>
        </logo>

            <main>
                <el-form ref="form" :rules="rules" status-icon :model="form" label-width="100px">
                    <el-form-item label="登录角色" prop="name">
                        <el-select v-model="selectValue" placeholder="请选择" id="login_select" style="width: 100%;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="oldPwd">
                        <el-input type="password" v-model="form.oldPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPwd">
                        <el-input type="password" v-model="form.newPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="再确认密码" prop="affPwd">
                        <el-input type="password" v-model="form.affPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click='submit("form")' style="width: 100%;">保存</el-button>
                    </el-form-item>
                </el-form>
            </main>
  </div>
</template>

<script>
    import logo from '@/components/logo'
    export default {
        name: 'Update_pwd',
        data() {
            let validatePhone = (rule, value, callback) => {
                if (/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}(\s*$)/.test(value) == false) {
                    callback(new Error('手机号由11位数字组成'));
                } else {
                    callback();
                }
            };
            let validatePwd = (rule, value, callback) => {
                if (/^[A-Za-z0-9]{5,20}$/.test(value) == false) {
                    callback(new Error('密码由5-19位数字字母组成'));
                } else {
                    callback();
                }
            };
            return {
                value: '',
                options: [{
                    value: 'admin',
                    label: '管理员'
                }, {
                    value: 'saler',
                    label: '销售员'
                }, {
                    value: 'ea',
                    label: '推广员'
                }],
                selectValue: '请选择身份',
                form: {
                    phone: '',
                    oldPwd: '',
                    newPwd: '',
                    affPwd: '',
                },
                rules: {
                    phone: [{
                        validator: validatePhone,
                        trigger: 'blur'
                    }],
                    oldPwd: [{
                        validator: validatePwd,
                        trigger: 'blur'
                    }],
                    newPwd: [{
                        validator: validatePwd,
                        trigger: 'blur'
                    }],
                    affPwd: [{
                        validator: validatePwd,
                        trigger: 'blur'
                    }]
                },
            };
        },
        components: {
            logo
        },
        methods: {
            // 封装的axios请求方法
            crear(para, prot, src) {
                let data = this.$Qs.stringify(para);
                this.$axios({
                    method: prot,
                    url: src,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                    data,
                }).then(res => {
                    console.log(res);
                    if (res.data.status == "Ok") {
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                    }
                });
            },

            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid && this.form.newPwd == this.form.affPwd) {
                        this.crear({
                                p_phone: `${parseFloat(this.form.phone)}`,
                                p_role: `${this.selectValue}`,
                                p_new_pwd: `${this.form.newPwd}`,
                                p_old_pwd: `${this.form.oldPwd}`
                            },
                            "post",
                            "http://39.106.26.6:8888/update_pwd/"
                        )
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '格式错误!!'
                        });
                        return false;
                    }
                });
            }
        },
    };
</script>

<style scoped>
    @import url('../../assets/css/add.css');
</style>