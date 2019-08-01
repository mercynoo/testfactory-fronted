<style>
    .ivu-card-body {
        padding: 5px;
    }
</style>

<template>
    <div>
        <!--<Row>-->
            <!--<Col span="2" v-if="!disableCreate">-->
            <!--<Button type="success" @click.stop="openModel();reset()">新建-->
            <!--</Button>-->
            <!--</Col>-->
            <!--<Col span="3">-->
            <!--<Select v-model="filterOption.key" style="padding-bottom: 5px" placeholder="请选择要过滤的项">-->
                <!--<Option v-for="item in searchKeys" :value="item.key" :key="item.key">{{ item.title }}</Option>-->
            <!--</Select>-->
            <!--</Col>-->
            <!--<Col span="8" style="margin-left:10px">-->
            <!--<Tooltip placement="top" content="过滤数据">-->
                <!--<Input style="padding-bottom: 5px;width: 300px" v-model="filterOption.value" @on-change="filterAll"-->
                       <!--placeholder="输入过滤值">-->
                <!--</Input>-->
            <!--</Tooltip>-->
            <!--</Col>-->
            <!--<Col>-->
            <!--<Button shape="circle" icon="refresh" @click="getAllData" :loading="loading"></Button>-->
            <!--</Col>-->
        <!--</Row>-->
        <Card style="margin-bottom: 10px;margin-top: -10px;background-color: #e9eaec;border-color:lightgrey;border-style:solid;">
            <Button type="success" @click.stop="openModel();reset()">新建
            </Button>
            <Select v-model="filterOption.key" style="width: 120px" placeholder="请选择要过滤的项">
                <Option v-for="item in searchKeys" :value="item.key" :key="item.key">{{ item.title }}</Option>
            </Select>
            <Tooltip placement="top" content="过滤数据">
                <Input style="width: 300px" v-model="filterOption.value" @on-change="filterAll"
                       placeholder="输入过滤值">
                </Input>
            </Tooltip>
            <Button shape="circle" icon="refresh" @click="getAllData" :loading="loading"></Button>
        </Card>
        <Table :loading="loading" border :columns="allColumns" :data="viewData"></Table>
        <Modal v-model="modal" :title="title" @on-cancel="cancel">
            <Form :label-width="100">
                <div v-for="col in columns">
                    <Form-item :label="col.title">
                        <i-switch type="green" v-if="col.switch" v-model="newObj[col.key]"></i-switch>
                        <Input v-else v-model="newObj[col.key]" :placeholder="col.desc"/>
                    </Form-item>
                </div>
            </Form>
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

    let filterData = (data, fo) => {
        return data.filter(item => {
            if (item[fo.key]) {
                return item[fo.key].indexOf(fo.value) > -1
            }
            return true
        })
    }

    export default {

        props: ['url', 'columns', 'name', 'disableCreate', 'idName'],

        mounted () {
            this.getAllData()
        },

        computed: {
            searchKeys () {
                return this.columns
            },
            size () {
                return this.filterData.length
            },
            allColumns () {
                let allColumns = cloneDeep(this.columns)
                allColumns.forEach(col => {
                    if (col.switch) {
                        col.render = (h, params) => {
                            return h('i-switch', {
                                props: {
                                    type: 'green',
                                    value: params.row[col.key],
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    'on-change': (i) => {
                                        this.newObj = params.row
                                        this.newObj[col.key] = i
                                        this.createOrUpdate()
                                    }
                                }
                            }, params.row.enabled)
                        }
                    }
                })
                allColumns.push({
                    title: '操作',
                    key: 'action',
                    width: 150,
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
                                        this.newObj = params.row
                                        if (this.newObj[this.getIdName()]) {
                                            this.title = `编辑${this.name}:${this.newObj[this.getIdName()]}`
                                        } else {
                                            this.title = `新建${this.name}`
                                        }
                                        this.modal = true
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let title = '确定要删除吗？'
                                        if (params.row[this.getIdName()]) {
                                            title = `删除${this.name}:${params.row[this.getIdName()]}`
                                        }
                                        this.$Modal.confirm({
                                            title: title,
                                            onOk: () => {
                                                this.remove(params.row[this.getIdName()]);
                                            },
                                            okText: '删除',
                                            cancelText: '取消'
                                        })
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                })
                return allColumns
            }
        },

        data () {
            return {
                modal: false,
                data: [],
                newObj: {},
                filterOption: {
                    key: '',
                    value: ''
                },
                filterData: [],
                viewData: [],
                pageSize: 30,
                current: 1,
                title: '新建',
                loading: false
            }
        },
        methods: {
            createOrUpdate() {
                let promise
                if (this.newObj[this.getIdName()]) {
                    promise = sails.update(this.url, this.newObj[this.getIdName()], this.newObj)
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
                    this.getAllData()
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
            getIdName () {
                return this.idName || 'id'
            }
        }
    }
</script>
<style scoped>
    .footer {
        justify-content: center;
    }
</style>