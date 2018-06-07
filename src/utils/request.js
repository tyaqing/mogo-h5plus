/**
 * http请求模块
 */
import axios from "axios";

exports.request = async function(data) {
  const conf = {
    headers: {
      // Authorization: "token"
    },
    ...data
  };
  return await axios(conf);
};
