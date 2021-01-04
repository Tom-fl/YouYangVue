<template>
  <div>
    <!-- 头 -->
    <header>
      <logo>
        <img slot="logo-img"
             src="../../assets/img/log.png"
             alt="">
        <h1 slot="logo-text">销售顾问列表 </h1>
      </logo>
    </header>
    <!-- 导航按钮 -->
    <nav class="nav">
      <div class="nav-left">
        <el-input v-model="phone"
                  placeholder="输入手机号"></el-input>
        <el-button type="success"
                   @click="phoneBtn">查找</el-button>
      </div>
      <div class="nav-right">
        <el-button type="success" @click='addSaler'>
          <span>+销售员工添加</span>
        </el-button>
        <el-button type="success" @click='adminBtn' v-if="userName =='admin'">查看所有</el-button>
      </div>
    </nav>

    <!-- table -->
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="add_date"
                       label="录入时间"
                       width="180">
      </el-table-column>
      <el-table-column prop="p_name"
                       label="销售员"
                       width="180">
      </el-table-column>
      <el-table-column prop="p_phone"
                       label="手机号">
      </el-table-column>
      <el-table-column prop="weixin"
                       label="销售顾问微信">
      </el-table-column>
      <el-table-column prop="weixin_img_url"
                       label="销售顾问二维码">
        <div slot-scope="scope">
          <img :src="scope.row.weixin_img_url"
               width="60"
               height="60" />
        </div>
      </el-table-column>
      <el-table-column prop="p_pwd" label="登录密码">
      </el-table-column>
        <el-table-column prop="p_pwd" label="操作">
            <div slot-scope="scope">
                <el-button type="info" @click="update(scope.row.p_id)">修改</el-button>
                <el-button type="info" @click="del(scope.row.p_id,$event)">删除</el-button>
                <el-button type="info" v-if="userName !=='admin'" @click="examine(scope.row.p_id)">查看</el-button>
            </div>
        </el-table-column>
    </el-table>

    <!-- 分页按钮 -->
    <el-pagination background
                   layout="prev, pager, next"
                   :total=count
                   class="pag"
                   :page-size=pagesize
                   @current-change='currentChange'>
    </el-pagination>
    
  </div>
</template>

<script>
    import logo from "@/components/logo";

    export default {
        name: "SalerList",
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
        created() {
            this.start()
            this.userName = window.sessionStorage.getItem('userName')
        },
        components: {
            logo,
        },
        watch: {
            result(val) {
                if (val.info == undefined) {
                    this.tableData = val.list;
                    this.count = val.counts;
                    this.pagesize = val.page_size;
                    this.currentpage = val.current_page;
                } else {
                    this.crear({
                            page_size: 2,
                            current_page: 1
                        },
                        "post",
                        "http://39.106.26.6:8888/saler_page/"
                    )
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
                this.userName = sessionStorage.getItem('userName')
                this.crear({
                        page_size: 2,
                        current_page: 1
                    },
                    "post",
                    "http://39.106.26.6:8888/saler_page/"
                )
            },


            // 分页的按钮--管理员
            currentChange(val) {
                // 普通分页
                if (this.phone == '') {
                    this.crear({
                            page_size: `${this.pagesize}`,
                            current_page: `${val}`
                        },
                        "post",
                        "http://39.106.26.6:8888/saler_page/"
                    )
                } else {
                    // 手机号查询的分页
                    this.crear({
                            phone: `${this.phone}`,
                            page_size: `${this.pagesize}`,
                            current_page: `${val}`
                        },
                        "post",
                        "http://39.106.26.6:8888/get_saler_by_phone/"
                    )
                }
            },


            // 手机号查询--管理员
            phoneBtn() {
                this.crear({
                        phone: `${this.phone}`,
                        page_size: `${this.pagesize}`,
                        current_page: `${this.currentpage}`,
                    },
                    "post",
                    "http://39.106.26.6:8888/get_saler_by_phone/"
                );
            },


            // 点击删除--管理员
            del(id, event) {
                this.crear({
                        saler_id: `${id}`
                    },
                    "post",
                    "http://39.106.26.6:8888/delete_saler_byid/"
                )
            },

            // 点击修改--管理员
            update(id) {
                this.$router.push({
                    path: '/salerupdate',
                    query: {
                        salerId: id
                    }
                })
            },
            // 点击添加--管理员
            addSaler() {
                this.$router.push('/saleradd')
            },


            // 点击查看所有 进入销售员平台--管理员
            adminBtn() {
                this.$router.push('/salerplatform')
            },


            // 点击查看按钮 进入销售员平台--销售员
            examine(id) {
                // console.log(id);
                this.$router.push('/salerplatform')

                // this.$router.push({
                //     path: '/salerplatform',
                //     query: {
                //         salerId: id
                //     }
                // })
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