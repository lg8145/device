import { UserInfo } from '../cache/userInfo'
import { Utils } from '../index';
import { ENV } from '../constants/environment'
import { message } from 'antd'

/**
 * 头部信息
 * @returns {Object}
 */
function getHeaders(){
  return {
    'Content-Type': 'application/json',
  }
}

const handlerReq = req =>
  req
    .then(response => response.json())
    .then(response => {
      if (response.status == '2000') {
        return Promise.resolve(response.data)
      } else if (
        response.status === 4013 ||
        response.status === 4014 ||
        response.status === 4015 ||
        response.status === 4020
      ) {
        message.error('token失效，请重新登录')
        UserInfo.delCookie();
        window.location.href = window.location.origin + '/login';
      } else {
        message.error(`${response.message[0].msg}`)
        return Promise.reject(response)
      }
    })

const ReqApi = {
  get({ url, pm }) {
    const headers = getHeaders()
    let nocache = new Date()
    if (typeof url === 'function') {
      url = ENV === 'node' ? url().toLowerCase() : url()
    }
    if (typeof pm === 'string') {
      return handlerReq(
        fetch(
          url + `?nocache=${nocache.getTime()}&${pm}`,
          Object.assign({
            method: 'GET',
            headers,
            credentials: 'include'
          })
        )
      )
    } else {
      return handlerReq(
        fetch(
          url + `?nocache=${nocache.getTime()}&${Utils.JSON2Str(pm)}`,
          Object.assign({
            method: 'GET',
            headers,
            credentials: 'include'
          })
        )
      )
    }
  },

  post({ url, pm }) {
    const headers = getHeaders()
    if (typeof url === 'function') {
      url = ENV === 'node' ? url().toLowerCase() : url()
    }
    if (typeof pm === 'object') {
      return handlerReq(
        fetch(
          url,
          Object.assign(
            {
              method: 'POST',
              headers,
              credentials: 'include',
              body: JSON.stringify(pm),
            }
          )
        )
      )
    } else {
      throw new Error(
        'ReqApi: Wrong Type of Arguments, should be Object, now is ' +
          typeof pm
      )
    }
  },
}

export { ReqApi }
