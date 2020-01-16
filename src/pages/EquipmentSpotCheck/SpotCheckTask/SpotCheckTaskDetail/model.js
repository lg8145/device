import createListModel from '../../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../../base/common';

export default createListModel({
  namespace: 'spotCheckTaskDetailModel',
  initState: {
    spotCheckTaskDetail: {},//详情
  },
  reducers: {
    setSpotCheckTaskDetail(state, { payload }) {
      return {
        ...state,
        spotCheckTaskDetail: payload
      }
    },
    resetData(state) {
      return {
        ...state,
        spotCheckTaskDetail: {},//详情
      }
    }
  },
  effects: {
    //设备列表
    * getDetail({ payload }, { put, call, select }) {
      try {
        const { currentFree, searchFieldsFree } = yield select(({ spotCheckTaskDetailModel }) => spotCheckTaskDetailModel)
        const resdata = yield call(request.get, Urls.SpotCheckTask_getSpotCheckView, { ...currentFree, ...searchFieldsFree })
        yield put({ type: 'setSpotCheckTaskDetail', payload:resdata });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
  },
})
