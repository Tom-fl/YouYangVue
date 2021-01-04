<template>
    <div>
        <logo>
            <img slot="logo-img" src="@/assets/img/log.png" alt="">
            <h1 slot="logo-text">修改销售员</h1>
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
                <el-form-item label="二维码">
                    <div id="upload_demo">
                        <el-upload 
                            class="upload-demo" 
                            action="http://39.106.26.6:8888/upload_img_file/"
                            multiple 
                            :limit="1" 
                            :data='formData'
                            :before-upload='beforeUpload'
                            :on-success='onSuccess'
                            >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
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
        name: 'UpdateSaler',
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
                action: 'http://39.106.26.6:8888/upload_img_file/',
                form: {
                    name: '',
                    phone: '',
                    weixin: '',
                    weixin_img_url: '',
                    pwd: '',
                    newWeixin_img_url: ''
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
                fileList: [],
                formData: {
                    data: null
                },
                response: '',
                result: []
            };
        },
        components: {
            logo
        },
        created() {
            this.start()
        },
        mounted() {
            this.start()
        },
        watch: {
            result(val) {
                if (val.data.info == undefined) {
                    this.form.name = val.data[0].p_name
                    this.form.phone = val.data[0].p_phone
                    this.form.weixin = val.data[0].weixin
                    this.form.weixin_img_url = val.data[0].weixin_img_url
                    this.form.pwd = val.data[0].p_pwd
                } else {
                    this.$router.push('/saler_list')
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
                    this.result = res
                });
            },
            filechange(file, fileList) {
                this.file = file.raw
            },
            start() {
                this.crear({
                        saler_id: this.$route.query.salerId
                    },
                    "post",
                    "http://39.106.26.6:8888/get_saler_byid/"
                );
            },
            beforeUpload(file) {
                this.formData.data = file
            },
            onSuccess(response, file) {
                this.response = response
            },


            // 点击修改按钮
            update(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.response.full_name == undefined) {
                            this.newWeixin_img_url = this.form.weixin_img_url
                        } else {
                            this.newWeixin_img_url = `http://39.106.26.6:8888/${this.response.full_name}`
                        }
                        this.crear({
                                saler_id: this.$route.query.salerId,
                                p_name: `${this.form.name}`,
                                p_phone: `${this.form.phone}`,
                                p_weixin: `${this.form.weixin}`,
                                p_pwd: `${this.form.pwd}`,
                                weixin_img_url: `${this.newWeixin_img_url}`,
                            },
                            "post",
                            "http://39.106.26.6:8888/update_saler_byid/"
                        );

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