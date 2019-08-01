// import {Req} from '@/status/request.mjs';
//
// export {RajiStatus, AuthStatus}
//
// const FixedPools = 'DEMANDPOOR,EPO';
// const unitX = 350;
// const unitY = 300;
//
// const RajiStatus = {
//   // const
//   JIRA_ADDRESS: 'http://jira.caicaivip.com',
//   // data
//   demandPoolsData: [],
//   userList: [],
//   // globalKey: new Date().getTime().toString(),
//   // resetGlobalKey() {
//   //   this.globalKey = new Date().getTime().toString();
//   // },
//   // utils
//   getUnitX() {return unitX},
//   getUnitY() {return unitY},
//   groupBy(key, coll) {
//     const resMap = {};
//     coll.forEach(dt => {
//       const keyValue = dt[key];
//       const preDts = resMap[keyValue];
//       if (!preDts)
//         return resMap[keyValue] = [dt];
//       resMap[keyValue].push(dt);
//     });
//     return resMap;
//   },
//   genJiraIssueLink(key) {
//     if (!key) return '#';
//     return this.JIRA_ADDRESS + '/browse/' + key;
//   },
//   // sameDepthCount2y(n) {
//   //   const offset = Math.ceil(n / 2) - 1;
//   //   return [...Array(n).keys()].map(x => x - offset);
//   // },
//   // depthAndSameDepthCount2xy(n, depth) {
//   //   const ys = this.sameDepthCount2y(n);
//   //   return ys.map(y => [depth, y]);
//   // },
//   formatApiResData(projectMap) {
//     return {
//       require: projectMap["待办"],
//       design: projectMap["Designing"],
//       plan: projectMap["Planning"],
//       dev: projectMap["Developing"],
//       completed: projectMap["Done"],
//     }
//   },
//   getDemandPoolByName(demandName) {
//     const matchedRes = this.demandPoolsData.filter(dt => dt.project === demandName);
//     if (matchedRes.length === 0) return null;
//     return matchedRes[0].data;
//   },
//   sameDepthCount2y(n) {
//     const offset = n / 2.0;
//     return [...Array(n).keys()].map(x => x - offset);
//   },
//   depthAndSameDepthCount2xy(n, depth) {
//     const ys = this.sameDepthCount2y(n);
//     return ys.map(y => [depth, y]);
//   },
//   depthAndSameDepthCount2xyLastLine(n, depth) {
//     if (n > 12) { // 12+
//       const leftN = Math.ceil(n / 2.0);
//       const rightN = Math.floor(n / 2.0);
//       const leftSideN = Math.ceil(leftN / 2.0);
//       const leftMiddleN = Math.floor(leftN / 2.0);
//       const rightMiddleN = Math.ceil(rightN / 2.0);
//       const rightSideN = Math.floor(rightN / 2.0);
//       const leftSideYs = this.sameDepthCount2y(leftSideN);
//       const leftMiddleYs = this.sameDepthCount2y(leftMiddleN);
//       const rightMiddleYs = this.sameDepthCount2y(rightMiddleN);
//       const rightSideYs = this.sameDepthCount2y(rightSideN);
//       return leftSideYs.map(y => [depth, y])
//         .concat(leftMiddleYs.map(y => [depth + 1, y]))
//         .concat(rightMiddleYs.map(y => [depth + 2, y]))
//         .concat(rightSideYs.map(y => [depth + 3, y]));
//     } else if (n > 8) { // 9 ~12
//       const sideN = Math.floor(n / 3.0);
//       const middleN = n - sideN * 2;
//       const sideYs = this.sameDepthCount2y(sideN);
//       const middleNs = this.sameDepthCount2y(middleN);
//       return sideYs.map(y => [depth, y])
//         .concat(middleNs.map(y => [depth + 1, y]))
//         .concat(sideYs.map(y => [depth + 2, y]));
//     } else if (n > 3) { // 4 ~ 8
//       const currN = Math.ceil(n / 2.0);
//       const nextN = Math.floor(n / 2.0);
//       const currYs = this.sameDepthCount2y(currN);
//       const nextYs = this.sameDepthCount2y(nextN);
//       const needFix = currN === nextN;
//       return currYs.map(y => [depth, y])
//         .concat(nextYs.map(y => [depth + 1, y + (needFix ? 0.5 : 0)]));
//     } else {  // 0 ~ 3
//       const ys = this.sameDepthCount2y(n);
//       return ys.map(y => [depth, y]);
//     }
//   },
//   // api-res
//   /**
//    * search all demand pools
//    * @param projects
//    * @returns {Promise<*[]>}
//    */
//   async doQuerySearchDemandPools(projects = FixedPools) {
//     const ps = {projects};
//     if (this.demandPoolsData.length > 0)
//       return [true, this.demandPoolsData];
//     const searchRes = await Req.querySearchDemandPools(ps);
//     if (searchRes) {
//       searchRes.forEach(m => m.data = this.formatApiResData(m.data));
//       this.demandPoolsData = searchRes;
//       return [true, this.demandPoolsData];
//     }
//     return [false, this.demandPoolsData];
//   },
//
//   /**
//    * search single demand pool
//    * @param project
//    * @returns {Promise<*[]>}
//    */
//   async doQuerySearchDemandPool(project) {
//     const ps = {project};
//     const searchRes = await Req.querySearchDemandPool(ps);
//     if (searchRes) {
//       const preIndex = this.demandPoolsData.map(dt => dt.project).indexOf(project);
//       if (preIndex >= 0)
//         this.demandPoolsData[preIndex] = {project, data: this.formatApiResData(searchRes)};
//       return [true, searchRes];
//     }
//     return [false, searchRes];
//   },
//
//   /**
//    *  search deps from one issue-key
//    * @param key
//    * @returns {Promise<*>}
//    */
//   // async doQuerySearchIssueTree(key) {
//   //   const ps = {key};
//   //   const deptTreeRes = await Req.querySearchIssueTree(ps);
//   //   if (!deptTreeRes)
//   //     return [false, null];
//   //   const nodeData = deptTreeRes.nodes;
//   //   nodeData.forEach(r => r.id = r.key);
//   //   const nodeDataByDepth = this.groupBy('depth', nodeData);
//   //   const depthLst = Object.keys(nodeDataByDepth);
//   //   const maxDepth = depthLst.sort()[depthLst.length - 1];
//   //   let maxY = 0;
//   //   let minY = 0;
//   //   depthLst.forEach(dp => {
//   //     const depth = Number(dp);
//   //     const nodeDataList = nodeDataByDepth[dp];
//   //     const countInSameDepth = nodeDataList.length;
//   //     let posList;
//   //     if (dp !== maxDepth) {
//   //       posList = this.depthAndSameDepthCount2xy(countInSameDepth, depth);
//   //     } else {
//   //       posList = this.depthAndSameDepthCount2xyLastLine(countInSameDepth, depth);
//   //     }
//   //     posList.forEach(([x, y], idx) => {
//   //       const currKey = nodeDataList[idx] ? nodeDataList[idx].key : null;
//   //       if (!currKey) return;
//   //       maxY = Math.max(maxY, y);
//   //       minY = Math.min(minY, y);
//   //       const idxInNode = nodeData.filter(x => !!x).map(n => n.key).indexOf(currKey);
//   //       nodeData[idxInNode].x = x * unitX;
//   //       nodeData[idxInNode].y = y * unitY;
//   //     });
//   //   });
//   //   return [true, deptTreeRes, maxY - minY];
//   // },
//
//   /**
//    *  new position in z-order
//    */
//
//   genCurrOneZ(startPos) {
//     const [startX, startY] = startPos;
//     return [startPos, [startX + 1, startY], [startX, startY - 1], [startX + 1, startY - 1],];
//   },
//
//   toNextStartPoint(startPos, maxZWidth, originPos) {
//     const offsetX = originPos[0];
//     const [startX, startY] = startPos;
//     const fixedX = startX - offsetX;
//     return (fixedX < maxZWidth * 2) ? [startX + 2, startY] : [startX - maxZWidth * 2, startY - 2]
//   },
//
//   pointCount2ZCount(count) {
//     return Math.ceil(count / 4);
//   },
//
//   genNextNZ(startPos, zCount, maxZWidth) {
//     const recurGenNextNZ = (currStartPos, zCount, resLst) => {
//       if (zCount === 0) return resLst;
//       const nextStartPos = this.toNextStartPoint(currStartPos, maxZWidth, startPos);
//       const currZ = this.genCurrOneZ(currStartPos);
//       return recurGenNextNZ(nextStartPos, zCount - 1, resLst.concat(currZ))
//     }
//     return recurGenNextNZ(startPos, zCount, [])
//   },
//
//   genZOrder(basePoint, count, maxZWidth = 1) {
//     // maxZWidth: start from 0, as max z-order count in line
//     const zCount = this.pointCount2ZCount(count);
//     const zPosLst = this.genNextNZ(basePoint, zCount, maxZWidth);
//     return zPosLst.slice(0, count);
//   },
//
//   count2ZHeight(count, maxZWidth = 1) {
//     const oneLineLimit = (maxZWidth + 1) * 4;
//     const lineCount = Math.floor(count / oneLineLimit);
//     const restCountInLast = count % oneLineLimit;
//     return lineCount * 2 + (restCountInLast > 2 ? 1 : 0) + 1;
//   },
//
//   getNextChildEdges(id, edges) {
//     return edges.filter(e => id === e.source);
//   },
//
//   id2node(id, nodes) {
//     for (let n of nodes) {
//       if (n.key === id) return n;
//     }
//   },
//
//   id2yHeight(id, data, maxDepth) {
//     const currNode = this.id2node(id, data.nodes);
//     const depth = Number(currNode.depth);
//     const childIds = this.getNextChildEdges(id, data.edges).map(e => e.target);
//     const childNodes = childIds.map(i => this.id2node(i, data.nodes));
//     if (depth === maxDepth - 1) {
//       const childCount = childNodes.length;
//       const yHeight = this.count2ZHeight(childCount);
//       return yHeight;
//     } else if (depth === maxDepth) return 1;
//     return Math.max(
//       childIds.length,
//       childIds.map(i => this.id2yHeight(i, data, maxDepth)).reduce((x, y) => Math.max(x, y), 0)
//     );
//   },
//
//   yHeight2accY(ys) {
//     const resAccY = [];
//     let accY = 0;
//     for (let y of ys) {
//       resAccY.push(accY);
//       accY += y;
//     }
//     return resAccY;
//   },
//
//   async doQuerySearchIssueTree(key) {
//     const ps = {key};
//     const deptTreeRes = await Req.querySearchIssueTree(ps);
//     if (!deptTreeRes) return [false, null];
//     const nodeData = deptTreeRes.nodes;
//     const edgeData = deptTreeRes.edges;
//     const nodeDataByDepth = this.groupBy('depth', nodeData);
//     const depthLst = Object.keys(nodeDataByDepth).map(dp => Number(dp)).sort();
//     const maxDepth = depthLst.reduce((x, y) => Math.max(x, y), 0);
//     const isMaxDepth = dp => maxDepth === dp;
//     depthLst.forEach(dp => {
//       const nodeDataLstInCurrDp = nodeDataByDepth[String(dp)];
//       if (isMaxDepth(dp)) return;
//       const nodeIds = nodeDataLstInCurrDp.map(node => node.key);
//       const nodeMaxYs = nodeIds.map(i => this.id2yHeight(i, deptTreeRes, maxDepth));
//       const accYs = this.yHeight2accY(nodeMaxYs);
//       const isNearMaxDepth = maxDepth === (dp + 1);
//       accYs.forEach((y, idx) => {
//         const currNode = nodeDataLstInCurrDp[idx];
//         currNode.x = dp;
//         currNode.y = 0 - y;
//         if (isNearMaxDepth) {
//           const childIds = this.getNextChildEdges(currNode.key, edgeData).map(e => e.target);
//           const childNodes = childIds.map(i => this.id2node(i, nodeData));
//           const startPos = [dp + 1, 0 - y];
//           const posLst = this.genZOrder(startPos, childIds.length);
//           childNodes.forEach((ch, idx) => {
//             const [x, y] = posLst[idx];
//             for (let n  of nodeData) {
//               if (n.key === ch.key) {
//                 n.x = x;
//                 n.y = y;
//                 return;
//               }
//             }
//           });
//         }
//       })
//     });
//     let minY = 0;
//     let maxY = 0;
//     nodeData.forEach(n => {
//       n.id = n.key;
//       if (n.y) {
//         minY = Math.min(n.y, minY);
//         maxY = Math.max(n.y, maxY);
//       }
//       n.x = n.x * unitX;
//       n.y = -n.y * unitY;
//     });
//     return [true, deptTreeRes, maxY - minY];
//   },
//
//   async doQuerySearchProjects() {
//     return Req.querySearchProjects();
//   },
//
//   async doQuerySearchTimeTrack(project) {
//     const ps = {project};
//     return Req.querySearchTimeTrack(ps);
//   },
//
//   async doQuerySearchFutureTimeTrack(project) {
//     const ps = {project};
//     return Req.querySearchFutureTimeTrack(ps);
//   },
//
//   async doQuerySearchUsers() {
//     const userList = await Req.querySearchUsers();
//     if (userList) this.userList = userList;
//     return this.userList;
//   },
//
//   async doQuerySearchProjectUsers(ps) {return Req.querySearchProjectUsers(ps);},
//
//   async doQueryUpdateProjectUsers(ps) {return Req.queryUpdateProjectUsers(ps);},
//
//   /**
//    * fault
//    */
//   async doQuerySearchDaily() {return Req.querySearchDaily({});},
//   async doQuerySearchWeekly() {return Req.querySearchWeekly({});},
//   async doQuerySearchMonthly() {return Req.querySearchMonthly({});},
//   async doQuerySearchThisWeek() {return Req.querySearchThisWeek({});},
//   async doQuerySearchHistory() {return Req.querySearchHistory({});},
//
//   /**
//    * version
//    */
//   fixVersionList: [],
//   issueDataWithVersion: [],
//   async doQuerySearchVersionIssues() {
//     const apiRes = await Req.querySearchVersionIssues({});
//     if (!apiRes) return;
//     const versions = apiRes.version;
//     const dataWithVersion = apiRes.data;
//     this.fixVersionList = versions || [];
//     this.issueDataWithVersion = dataWithVersion || [];
//   },
// };
//
// const AuthStatus = {
//   proxyAddress: 'http://10.111.31.226:8088/auth/cas/raji',
//   async doQuerySearchUserInfo() {
//     return Req.querySearchUserInfo()
//   }
// };
