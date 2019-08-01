// export {
//   utils
// }
//
// class utils {
//   /**
//    * 获取字符串真实长度
//    * 英文1位 / 中文2位
//    * @param str
//    * @returns {number}
//    */
//   static getStrRealLength(str) {
//     if (!str) return 0;
//     const getSingleStrLen = s => {
//       const charCode = s.charCodeAt(0);
//       return (charCode >= 0 && charCode <= 128) ? 1 : 2;
//     };
//     return str.split('').map(s => getSingleStrLen(s)).reduce((pre, curr) => pre + curr, 0);
//   };
//
//   /**
//    * 根据真实长度截取字符串
//    * @param str
//    * @param len
//    * @returns {*}
//    */
//   static cutString(str, len) {
//     let str_length = 0;
//     let str_cut = '';
//     let str_len = str.length;
//     for (let i = 0; i < str_len; i++) {
//       let a = str.charAt(i);
//       str_length++;
//       if (escape(a).length > 4) {
//         //中文字符的长度经编码之后大于4
//         str_length++;
//       }
//       str_cut = str_cut.concat(a);
//       if (str_length >= len) {
//         str_cut = str_cut.concat("...");
//         return str_cut;
//       }
//     }
//     //如果给定字符串小于指定长度，则返回源字符串；
//     if (str_length < len) {
//       return str;
//     }
//   }
//
//   /**
//    * 判断是否为 chrome 浏览器
//    * @returns {boolean}
//    */
//   static isChrome() {
//     const ua_str = navigator.userAgent.toLowerCase();
//     const isChrome = /.*(chrome)\/([\w.]+).*/
//     return isChrome.test(ua_str)
//   }
// }
