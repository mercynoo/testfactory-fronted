// import axios from 'axios';
// import Qs from 'qs'
//
// export {Req}
//
// /**
//  * APIS
//  */
// const BASE_RAJI = '/raji';
// const RAJI_APIS = {
//   searchDemandPool: BASE_RAJI + '/demandPool',
//   searchDemandPools: BASE_RAJI + '/demandPools',
//   searchIssueTree: BASE_RAJI + '/issueTree',
//   // time track
//   searchProjects: BASE_RAJI + '/projects',
//   searchTimeTrack: BASE_RAJI + '/projectTimeTrack',
//   searchFutureTimeTrack: BASE_RAJI + '/projectFutureTimeTrack',
//
//   searchUsers: BASE_RAJI + '/users',
//   projectUsers: BASE_RAJI + '/projectUsers',
//   // fault
//   searchThisWeek: BASE_RAJI + '/fault/thisweek',
//   searchHistory: BASE_RAJI + '/fault/history',
//   searchDaily: BASE_RAJI + '/fault/daily',
//   searchWeekly: BASE_RAJI + '/fault/weekly',
//   searchMonthly: BASE_RAJI + '/fault/monthly',
//   // version
//   searchVersionIssues: BASE_RAJI + '/version/issues',
// };
//
// const BASE_SSO = '/auth';
// const SSO_APIS = {
//   searchUserInfo: BASE_SSO + '/trade',
// };
//
// const APIS = {...RAJI_APIS, ...SSO_APIS};
//
// /**
//  * API请求封装
//  */
// const httpGet = (url, prop = {}) => {
//   return axios.get(url, {params: prop}).then(res => (res && res.status < 400) ? res.data : null);
// };
// const httpPost = (url, prop) => axios.post(url, prop).then(res => (res && res.status < 400) ? res.data : null).catch(err => err);
//
// const httpPostForm = (url, prop) => axios({
//   url: url, method: 'post', data: prop,
//   transformRequest: [function (data) {return Qs.stringify(data)}],
//   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
// }).then(res => (res && res.status < 400) ? res.data : null).catch(err => err);
//
// const Req = {
//   querySearchDemandPool(ps) {return httpGet(APIS.searchDemandPool, ps)},
//   querySearchDemandPools(ps) {return httpGet(APIS.searchDemandPools, ps)},
//   querySearchIssueTree(ps) {return httpGet(APIS.searchIssueTree, ps)},
//   querySearchProjects() {return httpGet(APIS.searchProjects, {})},
//   querySearchTimeTrack(ps) {return httpGet(APIS.searchTimeTrack, ps)},
//   querySearchFutureTimeTrack(ps) {return httpGet(APIS.searchFutureTimeTrack, ps)},
//
//   querySearchUsers() {return httpGet(APIS.searchUsers, {})},
//   querySearchProjectUsers(ps) {return httpGet(APIS.projectUsers, ps)},
//   queryUpdateProjectUsers(ps) {return httpPostForm(APIS.projectUsers, ps)},
//
//   querySearchThisWeek(ps) {return httpGet(APIS.searchThisWeek, ps)},
//   querySearchHistory(ps) {return httpGet(APIS.searchHistory, ps)},
//   querySearchDaily(ps) {return httpGet(APIS.searchDaily, ps)},
//   querySearchWeekly(ps) {return httpGet(APIS.searchWeekly, ps)},
//   querySearchMonthly(ps) {return httpGet(APIS.searchMonthly, ps)},
//
//   querySearchVersionIssues(ps) {return httpGet(APIS.searchVersionIssues, ps)},
//   // auth
//   querySearchUserInfo(){return httpGet(APIS.searchUserInfo, {})}
// };
