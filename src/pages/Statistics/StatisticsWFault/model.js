import createListModel from '../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../base/common';

export default createListModel({
  namespace: 'statisticsFaultModel',
  initState: {
    currentFree: {
      page: 1,
      pageSize: 5
    },
    detail: {},
    tabActiveKey: 1,//设备两个tabkey
  },
  reducers: {
    setDetail(state, { payload }) {
      return {
        ...state,
        detail: payload
      }
    },
    setTabActiveKey(state, { payload }) {
      return {
        ...state,
        tabActiveKey: payload
      }
    },
    resetData(state) {
      return {
        ...state,
        currentfree: { //分页
          page: 1,
          pageSize: 5
        },
        detail: {}
      }
    }
  },
  effects: {
  },
})
