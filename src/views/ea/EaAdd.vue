<template>
    <div>
        <logo>
            <img slot="logo-img" src="@/assets/img/log.png" alt="">
            <h1 slot="logo-text">添加推广员</h1>
        </logo>

        <main>
            <el-form ref="form" :rules="rules" status-icon :model="form" label-width="100px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="微信号码" prop="weixin">
                    <el-input v-model="form.weixin"></el-input>
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
        name: 'EaAdd',
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
            return {
                form: {
                    name: '',
                    phone: '',
                    weixin: ''
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
                    }]
                },
                response: '',
                result: []
            };
        },
        components: {
            logo
        },
        watch: {
            result(val) {
                if (val.info == undefined) {

                } else if (val.info == "添加推广员成功!") {
                    this.$router.push('/ea_list')
                }
            }
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
                    this.result = res.data
                })
            },


            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.crear({
                                p_name: `${this.form.name}`,
                                p_phone: `${this.form.phone}`,
                                p_weixin: `${this.form.weixin}`
                            },
                            "post",
                            "http://39.106.26.6:8888/add_ea/"
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