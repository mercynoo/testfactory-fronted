<!--<template>-->
<!--    <div>-->
<!--        <div style="minHeight:100vh">-->
<!--            <Menu mode="horizontal" theme="dark">-->
<!--                <Row>-->
<!--                    <Col span="5">-->
<!--                    <div class="layout-logo">-->
<!--                        <Icon type="card" size="30"></Icon>-->
<!--                        中台测试工厂-->
<!--                    </div>-->
<!--                    </Col>-->
<!--                    <Col span="10">-->
<!--                    <div class="layout-nav">-->
<!--                        <a target="_blank" v-for="link in links" :href="link.href">-->
<!--                            <MenuItem :name="link.title">-->
<!--                                <Icon type="android-apps"></Icon>-->
<!--                                {{link.title}}-->
<!--                            </MenuItem>-->
<!--                        </a>-->
<!--                    </div>-->
<!--                    </Col>-->
<!--                    <Col span="3" offset="6">-->
<!--                    <nb-trade :list="['个人主页','编辑']"-->
<!--                             :baseUrl="iamURL"-->
<!--                             :userNameStyle="{color:'#fff',cursor: 'pointer'}"-->
<!--                             :needLogout="true"-->
<!--                             v-if="useIAM">-->
<!--                        <template slot="item"-->
<!--                                  scope="props">-->
<!--                            <span>{{props.item}}</span>-->
<!--                        </template>-->
<!--                    </nb-trade>-->
<!--                    </Col>-->
<!--                </Row>-->
<!--            </Menu>-->
<!--            <div class="layout">-->
<!--                <Layout :style="{minHeight: '100vh'}">-->
<!--                    <Sider collapsible :collapsed-width="78" v-model="isCollapsed">-->
<!--                        <Menu active-name="active" theme="dark" width="auto" :class="menuitemClasses">-->
<!--                                <router-link to="/inspect">-->
<!--                                    <MenuItem name="1">-->
<!--                                        <Icon type="android-bulb"></Icon>-->
<!--                                        <span>问题排查</span>-->
<!--                                    </MenuItem>-->
<!--                                </router-link>-->
<!--                            <router-link to="/logsearch">-->
<!--                                <MenuItem name="2">-->
<!--                                    <Icon type="search"></Icon>-->
<!--                                    <span>测试环境日志</span>-->
<!--                                </MenuItem>-->
<!--                            </router-link>-->
<!--                            <router-link to="/proxy-mock">-->
<!--                                <MenuItem name="3">-->
<!--                                    <Icon type="ios-pulse-strong"></Icon>-->
<!--                                    <span>动态代理</span>-->
<!--                                </MenuItem>-->
<!--                            </router-link>-->
<!--                            <router-link to="/pay-mock">-->
<!--                                <MenuItem name="4">-->
<!--                                    <Icon type="wand"></Icon>-->
<!--                                    <span>支付mock</span>-->
<!--                                </MenuItem>-->
<!--                            </router-link>-->
<!--                            <router-link to="/chart">-->
<!--                                <MenuItem name="5">-->
<!--                                    <Icon type="stats-bars"></Icon>-->
<!--                                    <span>数据统计</span>-->
<!--                                </MenuItem>-->
<!--                            </router-link>-->
<!--                            <Submenu name="1">-->
<!--                                <template slot="title">-->
<!--                                    <Icon type="ios-people"></Icon>-->
<!--                                    账户数据-->
<!--                                </template>-->
<!--                                <router-link to="/fagen">-->
<!--                                    <MenuItem name="1-1">-->
<!--                                        <span>用户生成</span>-->
<!--                                    </MenuItem>-->
<!--                                </router-link>-->
<!--                                <router-link to="/fainfo">-->
<!--                                    <MenuItem name="1-2">-->
<!--                                        <span>用户信息</span>-->
<!--                                    </MenuItem>-->
<!--                                </router-link>-->
<!--                            </Submenu>-->
<!--                            <router-link to="/friendsites">-->
<!--                                <MenuItem name="6">-->
<!--                                    <Icon type="coffee"></Icon>-->
<!--                                    <span>常用工具</span>-->
<!--                                </MenuItem>-->
<!--                            </router-link>-->
<!--                        </Menu>-->
<!--                    </Sider>-->
<!--                    <Layout>-->
<!--                        <Content :style="{padding: '0 16px 16px'}">-->
<!--                            <bread/>-->
<!--                            <router-view/>-->
<!--                        </Content>-->
<!--                    </Layout>-->
<!--                </Layout>-->
<!--            </div>-->
<!--            &lt;!&ndash;<nb-layout>&ndash;&gt;-->
<!--            &lt;!&ndash;<nb-sider style="background-color: #404040">&ndash;&gt;-->
<!--            &lt;!&ndash;<automenu theme="dark" :expand-all="true"/>&ndash;&gt;-->
<!--            &lt;!&ndash;</nb-sider>&ndash;&gt;-->
<!--            &lt;!&ndash;<nb-content class="nb-tt-spa-content" style="">&ndash;&gt;-->
<!--            &lt;!&ndash;<div style="flex:1;display: flex;flex-direction: column">&ndash;&gt;-->
<!--            &lt;!&ndash;<bread/>&ndash;&gt;-->
<!--            &lt;!&ndash;<router-view/>&ndash;&gt;-->
<!--            &lt;!&ndash;</div>&ndash;&gt;-->
<!--            &lt;!&ndash;</nb-content>&ndash;&gt;-->
<!--            &lt;!&ndash;</nb-layout>&ndash;&gt;-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    /* eslint-disable */-->
<!--    import {Breadcrumb, BreadcrumbItem, Button, Layout, Icon} from '@u51/miox-vant';-->
<!--    import Image from '@u51/titan-image';-->
<!--    import User from '@u51/titan-trade';-->
<!--    import config from '../../config'-->
<!--    import './index.less';-->

<!--    export default {-->
<!--        components: {-->
<!--            'nb-image': Image,-->
<!--            'nb-layout': Layout,-->
<!--            'nb-header': Layout.Header,-->
<!--            'nb-content': Layout.Content,-->
<!--            'nb-sider': Layout.Sider,-->
<!--            'nb-icon': Icon,-->
<!--            'nb-button': Button,-->
<!--            'nb-trade': User,-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
<!--                title: 'i am a title',-->
<!--                collapsed: true,-->
<!--                collapsible: true,-->
<!--                isCollapsed: false,-->
<!--                width: 300,-->
<!--                path: [],-->
<!--                userName: 'leicl',-->
<!--                // iamURL: config.iamURL,-->
<!--                // useIAM: config.useIAM,-->
<!--                links: [-->
<!--                    {-->
<!--                        title: '数据工厂',-->
<!--                        href: 'http://testfactory.dailuobo.com'-->
<!--                    },-->
<!--                    {-->
<!--                        title: '中台wiki',-->
<!--                        href: 'http://wiki.caicaivip.com/pages/viewpage.action?pageId=7503896'-->
<!--                    }]-->
<!--            };-->
<!--        },-->
<!--        computed: {-->
<!--            menuitemClasses: function () {-->
<!--                return [-->
<!--                    'menu-item',-->
<!--                    this.isCollapsed ? 'collapsed-menu' : ''-->
<!--                ]-->
<!--            }-->
<!--        }-->
<!--    };-->
<!--</script>-->

<!--<style src="./index.less"></style>-->
