<style>
    .log-number {
        background: grey;
    }
</style>
<template>
    <Table name="支付mock规则"
           :url="url"
           idName="autoId"
           :columns="columns"
    ></Table>
</template>

<script>
    import {paymock} from "../../utils/api";
    import Table from "../../components/table/Table.vue";

    export default {
        mounted () {
        },
        data() {
            return {
                columns: [
                    {
                        title: '卡号',
                        key: 'bankAccount',
                        desc: '请输入银行卡号',
                        width: 160
                    }, {
                        title: '返回状态',
                        key: 'retStatus',
                        desc: '1:处理中,2:成功,3:失败',
                        width: 90
                    }, {
                        title: '返回码',
                        key: 'retCode',
                        desc: '0000:成功,2000:处理中,6000:失败',
                        width: 80
                    }, {
                        title: '返回消息',
                        key: 'retMessage',
                        desc: '处理成功,处理中,处理失败',
                        width: 100
                    }, {
                        title: '二步返回消息',
                        key: 'extInfo',
                        desc: '例如: mt;2;0000;处理成功'
                    }, {
                        title: '业务类型',
                        key: 'businessType',
                        desc: '1:入金,2:出金,4:鉴权,7:全业务',
                        width: 90
                    }, {
                        title: '是否开启',
                        key: 'isValid',
                        switch: true,
                        width: 90
                    }
                ],
                url: paymock.mockRuleUrl,
            };
        },
        methods: {},
        computed: {},

        components: {
            Table,
        }
    };
</script>