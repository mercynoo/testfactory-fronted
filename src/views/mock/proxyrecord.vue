<!--<style>-->
<!--    .log-number {-->
<!--        background: grey;-->
<!--    }-->
<!--</style>-->
<!--<template>-->
<!--    <div>-->
<!--        <Row>-->
<!--            <Form inline>-->
<!--                <FormItem>-->
<!--                    <nb-input v-model="params.message" placeholder="输入要搜索的信息" style="width: 220px"></nb-input>-->
<!--                </FormItem>-->
<!--                <FormItem>-->
<!--                    &lt;!&ndash;<AutoComplete&ndash;&gt;-->
<!--                    &lt;!&ndash;v-model="params.service"&ndash;&gt;-->
<!--                    &lt;!&ndash;:data="serviceSearches"&ndash;&gt;-->
<!--                    &lt;!&ndash;@on-search="serviceSearch"&ndash;&gt;-->
<!--                    &lt;!&ndash;placeholder="服务名"></AutoComplete>&ndash;&gt;-->
<!--                    <Select v-model="services" filterable multiple>-->
<!--                        <Option v-for="service in allServices" :value="service" :key="service">{{ service }}</Option>-->
<!--                    </Select>-->
<!--                </FormItem>-->
<!--                <FormItem>-->
<!--                    <nb-input v-model="params.tid" placeholder="trackId"></nb-input>-->
<!--                </FormItem>-->
<!--                <FormItem>-->
<!--                    <Select v-model="params.level" placeholder="日志级别">-->
<!--                        <Option v-for="item in levels" :value="item.value" :key="item.title">{{ item.title }}</Option>-->
<!--                    </Select>-->
<!--                </FormItem>-->
<!--                <FormItem>-->
<!--                    <nb-datepicker v-model="params.date" :clearable="true" format='yyyy.MM.dd'></nb-datepicker>-->
<!--                </FormItem>-->
<!--                <FormItem>-->
<!--                    <Button @click="search" type="primary" :loading="loading">立即搜索</Button>-->
<!--                </FormItem>-->
<!--            </Form>-->
<!--        </Row>-->
<!--        <Row>-->
<!--            <Collapse :model="selectedPanel">-->
<!--                <Panel v-for="logItem in result" :name="logItem.time">-->
<!--                    <Tag :color="getType(logItem.level)">{{logItem.service}}.{{logItem.tag}}</Tag>-->
<!--                    <span>{{trim(logItem)}}</span>-->
<!--                    <Tooltip content="字数" style="float: right;margin-right: 10px" placement="right">-->
<!--                        <Badge :count="logItem.message.length" overflow-count="99999"-->
<!--                               class-name="log-number"></Badge>-->
<!--                    </Tooltip>-->

<!--                    <div slot="content" style="width:150vh">-->
<!--                        <Poptip title="关键信息" placement="left-start" width="250" trigger="hover">-->
<!--                            <Card style="font-size: xx-small;background-color: black;color: lightgreen">-->
<!--                                <div v-if="logItem.context">-->
<!--                                    <p style="margin-bottom: 5px; color: lightgrey" v-for="line in logItem.context">-->
<!--                                        {{line}}</p>-->
<!--                                </div>-->
<!--                                <span>{{logItem.message}}</span>-->

<!--                                <Button type="text" style="color: white" @click="getContext(logItem)"-->
<!--                                        :loading="logItem.loading">获取该日志上下文-->
<!--                                </Button>-->
<!--                            </Card>-->
<!--                            <div slot="content">-->
<!--                                <router-link target="_blank"-->
<!--                                             :to="{ path: '/logsearch?time=' + logItem.time + '&service=' + logItem.service + '&host=' + logItem.host}"-->
<!--                                             v-if="logItem.time">时间:-->
<!--                                    {{logItem.time}}-->
<!--                                </router-link>-->
<!--                                <p>ip: {{logItem.host}}</p>-->
<!--                                <router-link target="_blank" :to="{ path: '/logsearch?tid=' + logItem.traceId}"-->
<!--                                             v-if="logItem.traceId">trackId:-->
<!--                                    {{logItem.traceId}}-->
<!--                                </router-link>-->
<!--                                <p>方法: {{logItem.logger_name}}</p>-->
<!--                                <p>调用方: {{logItem.target_service_id}}</p>-->
<!--                                <p>调用ip: {{logItem.remoteIp}}</p>-->
<!--                            </div>-->
<!--                        </Poptip>-->

<!--                    </div>-->
<!--                </Panel>-->
<!--            </Collapse>-->
<!--        </Row>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import {hawkeye} from "../../utils/api";-->
<!--    const TOTAL_LENGTH = window.innerWidth * 0.09-->

<!--    //    console.log(TOTAL_LENGTH)-->

<!--    export default {-->
<!--        mounted () {-->
<!--            if (Object.keys(this.$route.query).length > 0) {-->
<!--                for (let x in this.$route.query) {-->
<!--                    if (this.$route.query.hasOwnProperty(x)) {-->
<!--                        if (x === 'service' && this.$route.query[x]) {-->
<!--                            this.services = JSON.parse(this.$route.query[x])-->
<!--                        }-->
<!--                        this.params[x] = this.$route.query[x]-->
<!--                    }-->
<!--                }-->
<!--                this.search()-->
<!--            }-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
<!--                selectedPanel: [],-->
<!--                detailModal: {-->
<!--                    title: '',-->
<!--                    enabled: false,-->
<!--                    text: ''-->
<!--                },-->
<!--                services: [],-->
<!--                params: {-->
<!--                    service: '',-->
<!--                    message: '',-->
<!--                    level: '',-->
<!--                    date: '',-->
<!--                    tid: ''-->
<!--                },-->
<!--                serviceSearches: [],-->
<!--                result: [],-->
<!--                levels: [{title: '全部', value: ''}, {title: 'DEBUG', value: 'DEBUG'}, {-->
<!--                    title: 'INFO',-->
<!--                    value: 'INFO'-->
<!--                }, {title: 'ERROR', value: 'ERROR'}],-->
<!--                loading: false,-->
<!--                columns: [-->
<!--                    {-->
<!--                        title: '时间',-->
<!--                        key: 'time',-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        title: '级别',-->
<!--                        key: 'level',-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        title: '服务名',-->
<!--                        key: 'service',-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        title: 'tag',-->
<!--                        key: 'tag'-->
<!--                    },-->
<!--                    {-->
<!--                        title: 'ip',-->
<!--                        key: 'host'-->
<!--                    },-->
<!--                    {-->
<!--                        title: '信息',-->
<!--                        key: 'message'-->
<!--                    }-->
<!--                ]-->
<!--            };-->
<!--        },-->
<!--        methods: {-->
<!--            serviceSearch (value) {-->
<!--                this.serviceSearches = this.$store.state.services.filter(item => {-->
<!--                    return item.indexOf(value) > -1-->
<!--                })-->
<!--                this.serviceSearches.splice(10, this.serviceSearches.length)-->
<!--            },-->
<!--            search () {-->
<!--                this.result = ''-->
<!--                this.loading = true-->
<!--                this.params.service = this.services.length > 0 ? JSON.stringify(this.services) : ''-->
<!--                hawkeye.logsearch(this.params).then(data => {-->
<!--                    this.$router.push({query: this.params})-->
<!--                    if (data.length > 0) {-->
<!--                        this.result = data-->
<!--                    } else {-->
<!--                        this.$Notice.warning({-->
<!--                            title: '搜索失败',-->
<!--                            desc: '根据您提供的条件，我们未能搜索到数据'-->
<!--                        })-->
<!--                    }-->
<!--                }, err => {-->
<!--                    console.error(err)-->
<!--                }).finally(() => this.loading = false)-->
<!--            },-->
<!--            getContext (logItem) {-->
<!--                this.$set(logItem, 'loading', true)-->
<!--                this.$set(logItem, 'context', '')-->
<!--                hawkeye.contextLogs(logItem).then(data => {-->
<!--                    this.$set(logItem, 'context', data)-->
<!--                }).finally(() => this.$set(logItem, 'loading', false))-->
<!--            },-->
<!--            getType (level) {-->
<!--//                let color = '#ff9900'-->
<!--//                if (level === 'DEBUG') color = '#19be6b'-->
<!--//                if (level === 'INFO') color = '#2d8cf0'-->
<!--//                if (level === 'ERROR') color = '#ed3f14'-->
<!--//                return {'color': color}-->
<!--                switch (level) {-->
<!--                    case 'DEBUG':-->
<!--                        return 'green'-->
<!--                    case 'INFO':-->
<!--                        return 'blue'-->
<!--                    case 'ERROR':-->
<!--                        return 'red'-->
<!--                    default:-->
<!--                        return 'yellow'-->
<!--                }-->
<!--            },-->
<!--            viewDetail (logItem) {-->
<!--                this.detailModal.enabled = true-->
<!--                this.detailModal.title = logItem.time-->
<!--                this.detailModal.text = logItem.message-->
<!--            },-->
<!--            trim (logItem) {-->
<!--                let totalLength = logItem.message.length + logItem.service.length + logItem.tag.length-->
<!--                return totalLength > TOTAL_LENGTH ? logItem.message.substr(0, TOTAL_LENGTH - logItem.service.length - logItem.tag.length) : logItem.message-->
<!--            },-->
<!--            changePanel (o){-->
<!--                console.error(o)-->
<!--            }-->
<!--        },-->
<!--        computed: {-->
<!--            allServices () {-->
<!--                return this.$store.state.services-->
<!--            }-->
<!--        }-->
<!--    };-->
<!--</script>-->
