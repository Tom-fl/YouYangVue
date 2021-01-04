<template>
    <div>
        <!-- 头 -->
        <header>
            <logo>
                <img slot="logo-img" src="../../assets/img/log.png" alt="">
                <h1 slot="logo-text">销售员平台</h1>
            </logo>
        </header>

        <!-- 导航按钮 -->
        <nav class="nav">
            <div class="nav-left">
                <el-input v-model="weixin" placeholder="微信"></el-input>
                <el-button type="success" @click='weixinBtn'>查找</el-button>
            </div>
            <div class="nav-right">
            <el-select v-model="value" placeholder="是否添加" @change='ifAdd($event)'>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </div>
        </nav>

        <!-- table -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="add_date" label="录入时间" width="180">
            </el-table-column>
            <el-table-column prop="weixin" label="微信">
            </el-table-column>
            <el-table-column prop="extensionagent_name" label="推广人员" width="180">
            </el-table-column>
            <el-table-column prop="whether_add" label="是否已添加">
            </el-table-column>
            <el-table-column label="操作" prop="whether_add">
                <div slot-scope="scope">
                    <el-button type="info" :value='scope.row.whether_add' v-if="scope.row.whether_add !== '是'" @click='addBtn(scope.row.s_id)'>添加</el-button>
                </div>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total=count class="pag" :page-size=pagesize
            @current-change='currentChange'></el-pagination>
    </div>
</template>

<script>
    import logo from "@/components/logo"
    export default {
        name: 'PlatformSaler',
        data() {
            return {
                options: [{
                    value: '1',
                    label: '是'
                }, {
                    value: '0',
                    label: '否'
                }],
                value: '',
                userName: '',
                userId: '',
                weixin: '',
                tableData: [],
                count: 1,
                pagesize: 2,
                currentpage: 1,
                result: [],
                isShow: false
            };
        },
        created() {
            this.start()
        },
        components: {
            logo
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


            // 普通分页
            start() {
                this.userName = window.sessionStorage.getItem('userName');
                this.userId = window.sessionStorage.getItem('userId');
                // this.userId = this.$route.query.salerId;

                if (this.userName == 'admin') {
                    this.crear({
                            page_size: `${this.pagesize}`,
                            current_page: `${this.currentpage}`
                        },
                        "post",
                        "http://39.106.26.6:8888/get_all_stus_saler/"
                    )
                } else
                if (this.userName == 'saler') {
                    this.crear({
                            saler_id: `${this.userId}`,
                            page_size: `${this.pagesize}`,
                            current_page: `${this.currentpage}`
                        },
                        "post",
                        "http://39.106.26.6:8888/saler_platform_page/"
                    )
                }
            },


            // 点击分页按钮
            currentChange(val) {
                // 管理员
                if (this.userName == 'admin') {
                    if (this.weixin == '' && this.value == '') {
                        this.crear({
                                page_size: `${this.pagesize}`,
                                current_page: `${val}`
                            },
                            "post",
                            "http://39.106.26.6:8888/get_all_stus_saler/"
                        )
                    } else if (this.weixin !== '') {
                        this.crear({
                                weixin: `${this.weixin}`,
                                page_size: `${this.pagesize}`,
                                current_page: `${val}`
                            },
                            "post",
                            "http://39.106.26.6:8888/get_stus_like_byweixin/"
                        )
                    } else if (this.weixin == '' && this.value !== '') {
                        this.crear({
                                whether_add: `${this.value}`,
                                page_size: `${this.pagesize}`,
                                current_page: `${val}`
                            },
                            "post",
                            "http://39.106.26.6:8888/get_stus_bywhether_add/"
                        )
                    }


                    // 销售员
                } else if (this.userName == 'saler') {
                    if (this.weixin == '' && this.value == '') {
                        console.log('a');
                        this.crear({
                                saler_id: `${this.userId}`,
                                page_size: `${this.pagesize}`,
                                current_page: `${val}`
                            },
                            "post",
                            "http://39.106.26.6:8888/saler_platform_page/"
                        )
                    } else if (this.weixin !== '' && this.value == '') {
                        console.log('b');
                        this.crear({
                                saler_id: `${this.userId}`,
                                weixin: `${this.weixin}`,
                                page_size: `${this.pagesize}`,
                                current_page: `${val}`
                            },
                            "post",
                            "http://39.106.26.6:8888/get_stus_like_byweixin_saler_id/"
                        )
                    } else if (this.weixin == '' && this.value !== '') {
                        console.log('c');
                        this.crear({
                                saler_id: `${this.userId}`,
                                whether_add: `${this.value}`,
                                page_size: `${this.pagesize}`,
                                current_page: `${val}`
                            },
                            "post",
                            "http://39.106.26.6:8888/get_stus_bywhether_add_saler_id/"
                        )
                    }
                }


            },


            // 微信查询--管理员
            weixinBtn() {
                if (this.userName == 'admin') {
                    this.crear({
                            weixin: `${this.weixin}`,
                            page_size: `${this.pagesize}`,
                            current_page: `${this.currentpage}`
                        },
                        "post",
                        "http://39.106.26.6:8888/get_stus_like_byweixin/"
                    )
                } else if (this.userName == 'saler') {
                    this.crear({
                            saler_id: `${this.userId}`,
                            weixin: `${this.weixin}`,
                            page_size: `${this.pagesize}`,
                            current_page: `${this.currentpage}`
                        },
                        "post",
                        "http://39.106.26.6:8888/get_stus_like_byweixin_saler_id/"
                    )
                }
            },


            // 是否添加--管理员
            ifAdd(event) {
                if (this.userName == 'admin') {
                    this.crear({
                            whether_add: `${event}`,
                            page_size: `${this.pagesize}`,
                            current_page: `${this.currentpage}`
                        },
                        "post",
                        "http://39.106.26.6:8888/get_stus_bywhether_add/"
                    )
                } else if (this.userName == 'saler') {
                    this.crear({
                            saler_id: `${this.userId}`,
                            weixin: `${this.weixin}`,
                            page_size: `${this.pagesize}`,
                            current_page: `${this.currentpage}`
                        },
                        "post",
                        "http://39.106.26.6:8888/get_stus_like_byweixin_saler_id/"
                    )
                }
            },


            // 点击添加按钮--管理员
            addBtn(id) {
                this.crear({
                        stu_id: id
                    },
                    "post",
                    "http://39.106.26.6:8888/add_stu_to_saler/"
                )
            }


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
    }
    
    .nav-right {
        display: flex;
    }
</style>