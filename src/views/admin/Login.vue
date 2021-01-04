<template>
  <div>
    <el-row :gutter="10" type="flex" id="login_box">
        <el-col :xs='12' :sm="10" :md="10" :lg="10" :xl="10">
            <div class="grid-content bg-purple">
                <div>
                <img src="@/assets/img/login_log.png" alt="">
                <h1>欢迎登录有样儿分量系统</h1>
                </div>
            </div>
        </el-col>
        <el-col :xs='11' :sm="11" :md="11" :lg="11" :xl="11" id="grid-content-right">
            <div class="grid-content bg-purple-light">
                 <el-select v-model="selectValue" placeholder="请选择" id="login_select">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                 </el-select>
                <el-input
                  placeholder="请输入手机号"
                  v-model="phone"
                  clearable>
                </el-input>
                <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
            </div>
            <!-- 修改密码 -->
            <div class="upa-pwd">
                <router-link to="/update_pwd">修改密码</router-link>
            </div>
            <!-- 登录和重置按钮 -->
            <div class="login-btns">
                <el-row>
                  <el-button type="success" plain @click="succeed">登录</el-button>
                  <el-button type="info" plain @click="reset">重置</el-button>
                </el-row>
            </div>

        </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                phone: '',
                pwd: '',
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
            };
        },
        created() {},
        methods: {
            // 登录
            succeed() {
                let data = this.$Qs.stringify({
                    p_phone: `${parseFloat(this.phone)}`,
                    p_role: `${this.selectValue}`,
                    p_pwd: `${this.pwd}`
                });
                this.$axios({
                    method: 'post',
                    url: 'http://39.106.26.6:8888/login/',
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    data
                }).then(res => {
                    if (res.data.status == 'Ok') {
                        window.sessionStorage.setItem('userName', this.selectValue)
                        window.sessionStorage.setItem('userId', res.data.user.p_id)
                        if (this.selectValue == 'admin') {
                            this.$router.push('/admin')
                        } else if (this.selectValue == 'saler') {
                            this.$router.push('/salerplatform')
                        } else if (this.selectValue == 'ea') {
                            this.$router.push('/eaplatform')
                        }
                    } else {
                        this.$notify.error({
                            title: '登录错误',
                            message: '这是一条错误的提示消息'
                        });
                    }
                })
            },
            // 重置
            reset() {
                this.phone = ''
                this.pwd = ''
                this.selectValue = '请选择身份'
            }
        },
    };
</script>

<style scoped>
    @import '../../assets/css/login.css'
</style>