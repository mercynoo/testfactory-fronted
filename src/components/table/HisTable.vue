<template>
    <div>
        <Card style="margin-bottom: 10px;margin-top: -10px;background-color: #e9eaec;border-color:lightgrey;border-style:solid;">
            <Select v-model="filterOption.key" style="width: 120px" placeholder="请选择要过滤的项">
                <Option v-for="item in searchKeys" :value="item.key" :key="item.key">{{ item.title }}</Option>
            </Select>
            <Tooltip placement="top" content="过滤数据">
                <Input style="width: 300px" v-model="filterOption.value" @on-change="filterAll"
                       placeholder="输入过滤值">
                </Input>
            </Tooltip>
            <Button shape="circle" icon="refresh" @click="getAllData" :loading="loading"></Button>
            <Button shape="circle" icon="trash-a" @click="removeWithCondition"></Button>
        </Card>
        <div class="demo-spin-article">
            <Table :loading="loading" border :columns="columns" :data="viewData"></Table>
        </div>
        <Modal v-model="modal" :title="title" @on-cancel="cancel" width="1200">
            <Tabs :animated="false" v-if="modal">
                <TabPane :label="item.key" v-for="item in info">
                    <pre>{{item.value}}</pre>
                </TabPane>
                <TabPane label="链路">
                    <linkTable :traceId="getTraceId(info)" :defer="true" :isApiTestUnit="true"></linkTable>
                </TabPane>
            </Tabs>
            <div slot="footer">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="createOrUpdate">确定</Button>
            </div>
        </Modal>
        <Row type="flex" theme="dark" class="footer">
            <Page :total="size" :current="current" :page-size="30" @on-change="changeCurrentPage"
                  show-total style="padding: 10px"></Page>
        </Row>
    </div>
</template>

<script>
    import {sails} from '../../utils/api'
    import cloneDeep from 'lodash/cloneDeep'
    import {proxymock} from "../../utils/api";
    import LinkTable from '../../components/link-check/link-table/index.vue'

    let filterData = (data, fo) => {
        return data.filter(item => {
            if (fo.key && fo.value) {
                if (fo.value == 'null') {
                    return item[fo.key] == null
                }
                if (item[fo.key]) {
                    return item[fo.key].indexOf(fo.value) > -1
                }
                return false
            } else {
                return true
            }
        })
    }

    let toList = (obj) => {
        let list = []
        for (let x in obj) {
            if (obj.hasOwnProperty(x)) {
                if (x === 'reqHeaders') {
                    list.push({key: '请求头', value: obj[x]})
                } else if (x === 'reqBody') {
                    let value = obj[x]
                    if (typeof value === 'string') {
                        value = value.split('&').join('\n')
                    }
                    list.push({key: '请求Body', value: value})
                } else if (x === 'resHeaders') {
                    list.push({key: '返回头', value: obj[x]})
                } else if (x === 'resData') {
                    let value
                    try {
                        value = JSON.parse(obj[x])
                    } catch (e) {
                        value = obj[x]
                    }
                    list.push({key: '返回Body', value: value})
                }
            }
        }
        return list.reverse()
    }

    let getMethodColor = (method) => {
        if (method === 'POST') {
            return '#19be6b'
        } else if (method === 'PUT') {
            return '#ff9900'
        } else if (method === 'DELETE') {
            return '#ed3f14'
        } else {
            return '#2d8cf0'
        }
    }

    let getStatusColor = (status) => {
        if (status === '200') {
            return '#19be6b'
        } else if (status.indexOf('4') === 0) {
            return '#ff9900'
        } else if (status.indexOf('5') === 0) {
            return '#ed3f14'
        } else {
            return '#2d8cf0'
        }
    }

    export default {

        mounted () {
            this.getAllData()
        },

        computed: {
            searchKeys () {
                return this.columns
            },
            size () {
                return this.filterData.length
            }
        },

        data () {
            return {
                name: '历史记录',
                modal: false,
                data: [],
                info: [],
                filterOption: {
                    key: '',
                    value: ''
                },
                filterData: [],
                viewData: [],
                pageSize: 30,
                current: 1,
                title: '新建',
                loading: false,
                url: proxymock.historyUrl,
                columns: [
                    {
                        title: 'Method',
                        key: 'reqMethod',
                        width: 85,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: getMethodColor(params.row.reqMethod),
                                    'font-weight': 'bold'
                                }
                            }, params.row.reqMethod)
                        }
                    }, {
                        title: 'Target',
                        key: 'target',
                        width: 130,
                        render: (h, params) => {
                            return h('div', params.row.target)
                        }
                    }, {
                        title: 'Url',
                        key: 'reqUrl'
                    }, {
                        title: 'Tag',
                        key: 'tag',
                        width: 60,
                    }, {
                        title: 'Status',
                        key: 'resStatus',
                        width: 85,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: getStatusColor(params.row.resStatus),
                                    'font-weight': 'bold'
                                }
                            }, params.row.resStatus)
                        }
                    }, {
                        title: 'Body',
                        key: 'resData',
                        width: 70,
                        render: (h, params) => {
                            return h('span', params.row.resData.length)
                        }
                    }, {
                        title: '时间',
                        key: 'created',
                        width: 150,
                    }, {
                        title: '操作',
                        key: 'action',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.info = toList(params.row)
                                            this.title = `查看${this.name}:${params.row.id}`
                                            this.modal = true
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            createOrUpdate() {
                let promise
                if (this.newObj.id) {
                    promise = sails.update(this.url, this.newObj.id, this.newObj)
                } else {
                    promise = sails.create(this.url, this.newObj)
                }
                promise.then(data => {
                    this.$Notice.success({title: "操作成功", duration: 8})
                }).catch(e => this.$Notice.error({
                    title: "失败",
                    desc: e,
                    duration: 8
                })).finally(() => {
                    sails.get(this.url).then(data => {
                        this.data = data
                    })
                    this.modal = false
                })
            },
            remove(id) {
                sails.remove(this.url, id).then(data => {
                    this.$Notice.success({title: "删除成功!", duration: 8})
                }).catch(e => this.$Notice.error({
                    title: "删除失败",
                    desc: e,
                    duration: 8
                })).finally(() => {
                    this.getAllData()
                })
            },
            cancel() {
                this.modal = false
            },
            reset () {
                this.newObj = {}
            },
            openModel() {
                this.modal = true
            },
            filterAll () {
                this.filterData = filterData(this.data, this.filterOption)
                this.updateViewData()
            },
            updateViewData () {
                this.current = 1
                this.viewData = this.filterData.slice((this.current - 1) * this.pageSize, this.current * this.pageSize)
            },
            changeCurrentPage (nextPage) {
                this.viewData = this.filterData.slice((nextPage - 1) * this.pageSize, nextPage * this.pageSize)
            },
            getAllData () {
                this.data = []
                this.loading = true
                sails.get(this.url).then(data => {
                    this.data = data
                    this.filterAll()
                }).finally(() => this.loading = false)
            },
            removeWithCondition () {
                this.$Modal.confirm({
                    title: '确定要全部删除吗？',
                    onOk: () => {
                        sails.removeAll(this.url, this.filterOption).then(data => {
                            this.$Notice.success({title: "删除成功!", duration: 8})
                        }).catch(e => this.$Notice.error({
                            title: "删除失败",
                            desc: e,
                            duration: 8
                        })).finally(() => {
                            this.getAllData()
                            this.filterOption.key = ''
                            this.filterOption.value = ''
                        })
                    },
                    okText: '删除',
                    cancelText: '取消'
                })
            },
            getTraceId (infos) {
                for (let info of infos) {
                    if (info.key === '请求头') {
                        return info.value['x-trace-traceid']
                    }
                }
                return null
            }
        },
        components: {
            LinkTable
        }
    }
</script>
<style scoped>
    .footer {
        justify-content: center;
    }

    pre {
        white-space: pre-wrap; /* css-3 */
        white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
        white-space: -pre-wrap; /* Opera 4-6 */
        white-space: -o-pre-wrap; /* Opera 7 */
        word-wrap: break-word; /* Internet Explorer 5.5+ */
    }
</style>