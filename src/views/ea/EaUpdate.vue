<template>
   <div>
        <logo>
            <img slot="logo-img" src="@/assets/img/log.png" alt="">
            <h1 slot="logo-text">修改推广员</h1>
        </logo>
        
        <main>
            <el-form ref="form" :rules="rules" status-icon :model="form" label-width="100px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="微信号码" prop="weixin">
                    <el-input v-model="form.weixin"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                        <el-input v-model="form.pwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click='update("form")'>修改</el-button>
                </el-form-item>
            </el-form>
        </main>
    </div>
</template>

<script>
    import logo from '@/components/logo'
    export default {
        name: 'EaUpdate',
        data() {
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
            let validatePwd = (rule, value, callback) => {
                if (/^[A-Za-z0-9]{6,20}$/.test(value) == false) {
                    callback(new Error('密码由6-20位数字字母组成(不能包含特殊字符)'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    name: '',
                    phone: '',
                    weixin: '',
                    pwd: '',
                },
                rules: {
                    name: [{
                        validator: validateName,
                        trigger: 'blur'
                    }],
                    phone: [{
                        validator: validatePhone,
                        trigger: 'blur'
                    }],
                    weixin: [{
                        validator: validateWeixin,
                        trigger: 'blur'
                    }],
                    pwd: [{
                        validator: validatePwd,
                        trigger: 'blur'
                    }]
                },
                result: []
            };
        },
        components: {
            logo
        },
        created() {
            this.start()
        },
        watch: {
            result(val) {
                if (val.info == undefined) {
                    this.form.name = val[0].p_name
                    this.form.phone = val[0].p_phone
                    this.form.weixin = val[0].p_weixin
                    this.form.pwd = val[0].p_pwd
                } else {
                    this.$router.push('/ea_list')
                }

            }
        },
        methods: {
            // 封装的axios请求方法
            crear(para, prot, src, callback) {
                let data = this.$Qs.stringify(para);
                this.$axios({
                    method: prot,
                    url: src,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                    data,
                }).then(res => {
                    this.result = res.data
                });
            },


            // 根据id查询信息
            start() {
                this.crear({
                        ea_id: this.$route.query.eaId
                    },
                    "post",
                    "http://39.106.26.6:8888/get_ea_byid/"
                );
            },

            // 点击修改
            // update_ea_byid/
            // ea_id,p_name,p_phone,p_weixin、p_pwd
            update(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.crear({
                                ea_id: this.$route.query.eaId,
                                p_name: `${this.form.name}`,
                                p_phone: `${this.form.phone}`,
                                p_weixin: `${this.form.weixin}`,
                                p_pwd: `${this.form.pwd}`
                            },
                            "post",
                            "http://39.106.26.6:8888/update_ea_byid/"
                        )
                    } else {
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