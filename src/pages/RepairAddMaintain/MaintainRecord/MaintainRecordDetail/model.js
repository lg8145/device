import createListModel from '../../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../../base/common';

export default createListModel({
  namespace: 'maintainRecordDetailModel',
  initState: {
    maintainRecordDetail: {},//详情
  },
  reducers: {
    setmaintainRecordDetail(state, { payload }) {
      return {
        ...state,
        maintainRecordDetail: payload
      }
    },
    resetData(state) {
      return {
        ...state,
        maintainRecordDetail: {},//详情
      }
    }
  },
  effects: {
  },
})
