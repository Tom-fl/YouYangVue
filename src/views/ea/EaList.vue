<template>
    <div>
        <!-- 头 -->
    <header>
       <logo>
           <img slot="logo-img" src="@/assets/img/log.png" alt="">
           <h1 slot="logo-text">推广员列表 </h1>
       </logo>
    </header>

    <!-- 导航按钮 -->
    <nav class="nav">
      <div class="nav-left">
        <el-input v-model="phone"
                  placeholder="输入手机号"></el-input>
        <el-button type="success" @click='phoneBtn'>查找</el-button>
      </div>
      <div class="nav-right">
        <el-button type="success" @click='EaAdd'>
          <span>+推广员工添加</span>
        </el-button>
        <el-button type="success" @click="adminBtn">查看所有</el-button>
      </div>
    </nav>

    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="add_date" label="录入时间" width="180">
        </el-table-column>
        <el-table-column prop="p_name" label="推广员" width="180">
        </el-table-column>
        <el-table-column prop="p_phone" label="手机号">
        </el-table-column>
        <el-table-column prop="p_weixin" label="推广员微信">
        </el-table-column>
        <el-table-column label="操作">
            <div slot-scope="scope">
                <el-button type="info" @click="update(scope.row.p_id)">修改</el-button>
                <el-button type="info" @click="del(scope.row.p_id)">删除</el-button>
                <el-button type="info" v-if="userName !=='admin'">查看</el-button>
            </div>
        </el-table-column>
    </el-table>
    
    <!-- 分页按钮 -->
    <el-pagination background layout="prev, pager, next" :total=count class="pag" :page-size=pagesize
        @current-change='currentChange'>
    </el-pagination>

    </div>
</template>

<script>
    import logo from '@/components/logo'
    export default {
        name: 'EaList',
        data() {
            return {
                userName: '',
                phone: '',
                tableData: [],
                count: 1,
                pagesize: 2,
                currentpage: 1,
                result: []
            };
        },
        components: {
            logo,
        },
        created() {
            this.start()
        },
        watch: {
            result(val) {
                if (val.info == undefined) {
                    this.tableData = val.list
                    this.count = val.counts
                    this.currentpage = val.current_page
                    this.pagesize = val.page_size
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


            // 普通分页--管理员
            start() {
                this.userName = window.sessionStorage.getItem('userName');
                this.crear({
                        page_size: `${this.pagesize}`,
                        current_page: `${this.currentpage}`
                    },
                    "post",
                    "http://39.106.26.6:8888/ea_page/"
                )
            },

            // 分页按钮--管理员
            currentChange(val) {
                if (this.phone == '') {
                    this.crear({
                            page_size: `${this.pagesize}`,
                            current_page: val
                        },
                        "post",
                        "http://39.106.26.6:8888/ea_page/"
                    )
                } else {
                    this.crear({
                            phone: `${this.phone}`,
                            page_size: `${this.pagesize}`,
                            current_page: val
                        },
                        "post",
                        "http://39.106.26.6:8888/get_ea_by_phone/"
                    )
                }

            },

            // 手机查询分页--管理员
            phoneBtn() {
                this.crear({
                        phone: `${this.phone}`,
                        page_size: `${this.pagesize}`,
                        current_page: `${this.currentpage}`
                    },
                    "post",
                    "http://39.106.26.6:8888/get_ea_by_phone/"
                )
            },


            // 添加销售员--管理员
            EaAdd() {
                this.$router.push('/eaadd')
            },


            // 点击删除--管理员
            del(id) {
                this.crear({
                        ea_id: id
                    },
                    "post",
                    "http://39.106.26.6:8888/delete_ea_byid/"
                )
            },


            // 点击修改--管理员
            update(id) {
                this.$router.push({
                    path: '/eaupdate',
                    query: {
                        eaId: id
                    }
                })
            },


            // 点击查看所有按钮
            adminBtn(){
                this.$router.push('/eaplatform')
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