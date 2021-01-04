<template>
    <div>
        <!-- 头 -->
        <header>
            <logo>
                <img slot="logo-img" src="../../assets/img/log.png" alt="">
                <h1 slot="logo-text">推广员平台</h1>
            </logo>
        </header>

        <!-- 导航按钮 -->
        <nav class="nav">
            <div class="nav-left">
            <div class="block">
                <span class="demonstration">默认</span>
                <el-date-picker v-model="timeVal1" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-ddTHH:mm">
                </el-date-picker>
            </div>
                <div class="block">
                    <span class="demonstration">结束时间:</span>
                    <el-date-picker v-model="timeVal2" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-ddTHH:mm">
                    </el-date-picker>
                </div>
                <el-button type="success" @click='derive($event)'>
                    <el-link type="success" :href='newTimeVal' id="derive">导出</el-link>
                </el-button>
                
                <el-select v-model="isaddValue" placeholder="是否添加" @change='ifAdd($event)'>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
        </nav>

        <!-- table -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="add_date" label="录入时间" width="180"></el-table-column>
            <el-table-column prop="ea_name" label="推广员" width="180"></el-table-column>
            <el-table-column prop="weixin" label="客户微信">
                <div slot-scope="scope">
                    <p>{{scope.row.weixin}}</p>
                    <el-button type="button" @click="upaWxBtn(scope.row.weixin)">修改微信</el-button>
                </div>
            </el-table-column>
            <el-table-column prop="channel" label="渠道">
            </el-table-column>
            <el-table-column prop="saler_name" label="销售顾问">
            </el-table-column>
            <el-table-column prop="saler_weixin" label="销售顾问微信">
            </el-table-column>
            <el-table-column prop="whether_add" label="是否已添加">
            </el-table-column>
            <el-table-column prop="saler_weixin_url" label="销售顾问二维码">
                <div slot-scope="scope">
                    <img :src="scope.row.saler_weixin_url" width="60" height="60" />
                </div>
            </el-table-column>
        </el-table>

        <!-- 点击qq渠道添加 -->
        <div class="qqIsAdd">
            <el-button type="button" v-if="userName !=='admin'" @click="open">QQ渠道添加</el-button>
        </div>

        <el-pagination background layout="prev, pager, next" :total=count class="pag" :page-size=pagesize
            @current-change='currentChange'></el-pagination>
    </div>
</template>

<script>
    import logo from "@/components/logo"
    export default {
        name: 'EaPlatform',
        data() {
            return {
                userName: '',
                userId: '',
                timeVal1: '',
                timeVal2: '',
                newTimeVal: '',
                options: [{
                    value: '1',
                    label: '是'
                }, {
                    value: '0',
                    label: '否'
                }],
                isaddValue: '',

                tableData: [],
                count: 1,
                pagesize: 2,
                currentpage: 1,
                result: [],
                upaWX: ''
            };
        },
        created() {
            this.start()
        },
        components: {
            logo
        },
        computed: {
            time() {
                return `http://39.106.26.6:8888/export_all_by_start_end_time?start_time=${this.timeVal1}&end_time=${this.timeVal2}`
            }
        },
        watch: {
            result(val) {
                if (val.info == undefined) {
                    this.tableData = val.list
                    this.count = val.counts
                    this.pagesize = val.page_size
                    this.currentpage = val.current_page
                } else {
                    this.start()
                }
            }
        },
        methods: {
            // 点击qq渠道添加
            open() {
                this.$prompt('请输入QQ', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\d{5,11}/,
                    inputErrorMessage: 'QQ格式不正确(数字5-11位!)'
                }).then(({
                    value
                }) => {
                    this.crear({
                            weixin: `${value}`,
                            ea_id: `${this.userId}`,
                        },
                        "post",
                        "http://39.106.26.6:8888/add_stu/"
                    )
                    this.$message({
                        type: 'success',
                        message: '你的QQ是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },

            open2() {
                this.$notify({
                    title: '警告',
                    message: '这是一条警告的提示消息',
                    type: 'warning'
                });
            },

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


            // 普通分页--管理员
            start() {
                this.userId = window.sessionStorage.getItem('userId')
                this.userName = window.sessionStorage.getItem('userName')
                if (this.userName == 'admin') {
                    this.crear({
                            page_size: `${this.pagesize}`,
                            current_page: `${this.currentpage}`
                        },
                        "post",
                        "http://39.106.26.6:8888/get_all_clients_ea/"
                    )
                } else if (this.userName == 'ea') {
                    this.$axios.get('http://39.106.26.6:8888/get_all_by_eaid/', {
                        params: {
                            ea_id: `${this.userId}`,
                            page_size: `${this.pagesize}`,
                            current_page: `${this.currentpage}`
                        }
                    }).then(res => {
                        this.result = res.data
                    })
                }
            },


            // 点击分页按钮--管理员
            currentChange(val) {
                if (this.userName == 'admin') {
                    if (this.isaddValue == '') {
                        this.crear({
                                page_size: `${this.pagesize}`,
                                current_page: `${val}`
                            },
                            "post",
                            "http://39.106.26.6:8888/get_all_clients_ea/"
                        )
                    } else {
                        this.crear({
                                whether_add: `${this.isaddValue}`,
                                page_size: `${this.pagesize}`,
                                current_page: `${val}`
                            },
                            "post",
                            "http://39.106.26.6:8888/get_all_by_whether_add/"
                        )
                    }
                } else if (this.userName == 'ea') {
                    if (this.isaddValue == '') {
                        this.$axios.get('http://39.106.26.6:8888/get_all_by_eaid/', {
                            params: {
                                ea_id: `${this.userId}`,
                                page_size: `${this.pagesize}`,
                                current_page: `${val}`
                            }
                        }).then(res => {
                            this.result = res.data
                        })
                    } else {
                        this.crear({
                                ea_id: `${this.userId}`,
                                whether_add: `${this.isaddValue}`,
                                page_size: `${this.pagesize}`,
                                current_page: `${val}`
                            },
                            "post",
                            "http://39.106.26.6:8888/get_all_by_eaid_whether_add/"
                        )
                    }
                }
            },


            // 是否添加--管理员
            ifAdd(event) {
                this.crear({
                        ea_id: `${this.userId}`,
                        whether_add: `${this.isaddValue}`,
                        page_size: `${this.pagesize}`,
                        current_page: `${this.currentpage}`
                    },
                    "post",
                    "http://39.106.26.6:8888/get_all_by_eaid_whether_add/"
                )
            },


            // 点击修改微信
            upaWxBtn(oldValue) {
                this.$prompt('请输入微信', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/,
                    inputErrorMessage: '微信格式不正确(不能以数字开头!)'
                }).then(({
                    value
                }) => {
                    this.crear({
                            new_weixin: `${value}`,
                            old_weixin: `${oldValue}`
                        },
                        "post",
                        "http://39.106.26.6:8888/update_stu_weixin/"
                    )
                    this.$message({
                        type: 'success',
                        message: '你的微信是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },


            // 点击导出
            derive(event) {
                console.log();
                if (this.timeVal1 == '' && this.timeVal2 == '') {
                    event.preventDefault()
                    this.$notify({
                        title: '警告',
                        message: '这是一条警告的提示消息',
                        type: 'warning'
                    });
                } else {
                    this.newTimeVal = `http://39.106.26.6:8888/export_all_by_start_end_time?start_time=${this.timeVal1}&end_time=${this.timeVal2}`
                }
            },
        },
    };
</script>

<style scoped>
    .pag {
        display: flex;
        justify-content: center;
    }
    
    .nav {
        display: flex;
        justify-content: space-around;
    }
    
    .nav-left {
        display: flex;
        width: 50%;
        justify-content: inherit;
    }
    
    #derive {
        color: white;
    }
    
    .qqIsAdd {
        width: 90%;
        display: flex;
        justify-content: flex-end;
    }
</style>