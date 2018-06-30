/**
 * http请求模块
 */
import axios from 'axios'

export async function request (data) {
  const conf = {
    headers: {
      // Authorization: "token"
    },
    ...data
  }
  return await axios(conf)
}
