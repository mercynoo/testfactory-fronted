// export {ParticleTransport}
// import G6 from '@antv/g6';
//
// G6.track(false);
// import d3 from 'd3'
//
// class ParticleTransport {
//   constructor(options) {
//     this.minInnerHeight = 640;
//     this.headerHeight = 100;
//     this.options = Object.assign({
//       getGravities: (graph) => {
//         // const colors = ['#FD8C3D', '#D83F43', '#F7BED6', '#E487C7', '#46A848', '#D83F43', '#3B85BA', '#48335B', '#B7CDE9']; // 重力点附上颜色
//         const colors = [
//           '#ff586f',
//           '#FD8C3D',
//           '#f7e722',
//           '#82e41a',
//           '#0ed8b5',
//           '#1686ba',
//           '#582087',
//           '#f7a5cf',
//         ];
//         const width = graph.getWidth();
//         const height = graph.getHeight();
//         const padding = 50;
//         const center = [width / 2, height / 2];
//         const gravityCount = 8; // count
//         const angleStep = Math.PI * 2 / gravityCount;
//         const radius = Math.min(width, height) / 2 - padding;
//         const initialV = [0, -radius];
//         const gravities = [initialV];
//         for (let index = 1; index < gravityCount; index++) {
//           const v = G6.Util.vec2.rotate([], initialV, [0, 0], angleStep * index);
//           gravities.push(v);
//         }
//         gravities.forEach((gravity, index) => {
//           gravity[0] += center[0];
//           gravity[1] += center[1];
//           gravity[2] = colors[index];
//         });
//         return gravities;
//       }
//     }, options);
//     this.initGraph();
//     this.initGravities();
//     this.initData();
//     this.initSimulation();
//     const graph = this.graph;
//     graph.add('node', {
//       label: {
//         text: this.options.title,
//         fontSize: 24
//       },
//       x: graph.getWidth() / 2,
//       y: graph.getHeight() / 2,
//       style: {
//         fillOpacity: 0,
//         strokeOpacity: 0
//       }
//     });
//     setInterval(() => {
//       const nodes = this.data.nodes;
//       const count = 5;
//       const getRandom = array => array[parseInt(array.length * Math.random())];
//
//       for (let index = 0; index < count; index++) {
//         const node = getRandom(nodes);
//         const gravity = getRandom(this.gravities);
//         graph.update(node.id, {
//           gx: gravity[0],
//           gy: gravity[1],
//           color: gravity[2]
//         });
//       }
//       this.simulation.alpha(0.003).restart();
//     }, 100);
//   }
//
//   initGraph() {
//     const minInnerHeight = this.minInnerHeight;
//     const headerHeight = this.headerHeight;
//     this.graph = new G6.Graph({
//       container: this.options.containerName,
//       height: (Math.max(window.innerHeight, minInnerHeight) - headerHeight) * this.options.rate, // 画布高
//       // height: Math.max(window.innerHeight, minInnerHeight) * this.options.rate, // 画布高
//       // fitView: 'autoZoom',
//       animate: {
//         update: g => {
//           const element = g.element;
//           const endKeyFrame = g.endKeyFrame;
//           const props = endKeyFrame.props;
//           element.animate(Object.assign({
//             matrix: props.matrix
//           }, props.attrs), 3000, 'easeQuadOut');
//         }
//       }
//     });
//   }
//
//   initData() {
//     const gravities = this.gravities;
//     const data = {
//       nodes: []
//     };
//     gravities.forEach(function (gravity, index) {
//       const maxCount = 20 * (index + 1);
//       const minCount = 2 * (index + 1);
//       const nodeCount = parseInt(Math.random() * maxCount);
//
//       for (let idx = 0; idx < nodeCount; idx++) {
//         data.nodes.push({
//           size: 3 + 6 * Math.random(),
//           color: gravity[2],
//           gx: gravity[0],
//           gy: gravity[1],
//           x: gravity[0] + Math.random() * 5,
//           y: gravity[1] + Math.random() * 5
//         });
//       }
//     });
//     this.graph.read(data);
//     this.data = data;
//   }
//
//   initSimulation() {
//     const nodes = this.data.nodes;
//     const graph = this.graph;
//     this.simulation = d3.forceSimulation(nodes)
//       .force('charge', d3.forceManyBody())
//       .force('collision', d3.forceCollide().radius((model) => model.size / 2 + 2))
//       .on('tick', () => {
//         // const alpha = 1/node.gx - node.x;
//         nodes.forEach((node) => {
//           node.x += (node.gx - node.x) * 0.04;
//           node.y += (node.gy - node.y) * 0.04;
//         });
//         graph.preventAnimate(() => graph.updateNodePosition());
//       });
//   }
//
//   initGravities() {
//     const getGravities = this.options.getGravities;
//     this.gravities = getGravities(this.graph);
//   }
//
//   resizeGraph() {
//     const minInnerHeight = this.minInnerHeight;
//     const headerHeight = this.headerHeight;
//     const newHeight = Math.max(window.innerHeight , minInnerHeight) - headerHeight;
//     // const newHeight = Math.max(window.innerHeight, minInnerHeight);
//     // const newHeight = (Math.max(window.innerHeight, minInnerHeight) - headerHeight) * this.options.rate;
//     this.graph.changeSize(window.innerWidth, newHeight * this.options.rate);
//     this.graph.setFitView('cc');  // 自动居中
//   }
// }
