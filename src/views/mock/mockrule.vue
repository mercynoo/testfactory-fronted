<style>
    .log-number {
        background: grey;
    }
</style>
<template>
    <Tabs type="card" :animated="false">
        <TabPane label="请求历史">
            <HisTable></HisTable>
        </TabPane>
        <TabPane label="代理规则">
            <Table name="代理"
                   :url="url"
                   :columns="columns"
            ></Table>
        </TabPane>
    </Tabs>

</template>

<script>
    import {proxymock} from "../../utils/api";
    import Table from "../../components/table/Table.vue";
    import HisTable from "../../components/table/HisTable.vue";

    export default {
        mounted () {
        },
        data() {
            return {
                columns: [
                    {
                        title: '名称',
                        key: 'name'
                    }, {
                        title: '端口',
                        key: 'port'
                    }, {
                        title: '代理host',
                        key: 'target'
                    }, {
                        title: '是否开启',
                        key: 'enabled',
                        switch: true,
                    }
                ],
//                hisColumns: [
//                    {
//                        title: 'Method',
//                        key: 'reqMethod'
//                    }, {
//                        title: 'Url',
//                        key: 'reqUrl'
//                    }, {
//                        title: 'Status',
//                        key: 'resStatus'
//                    }, {
//                        title: '时间',
//                        key: 'createdAt'
//                    }
//                ],
                url: proxymock.proxyRuleUrl,
//                historyUrl: proxymock.historyUrl
            };
        },
        methods: {},
        computed: {},

        components: {
            Table,
            HisTable,
        }
    };
</script>