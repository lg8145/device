import createListModel from '../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../base/common';

export default createListModel({
  namespace: 'realTimeModel',
  initState: {
    currentFree: {
      page: 1,
      pageSize: 5
    },
    detail: {}
  },
  reducers: {
    setDetail(state, { payload }) {
      return {
        ...state,
        detail: payload
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
    * getTableList({ payload }, { put, call, select }) {
      try {
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.monitor_getDeviceMonitorList)
        yield put({ type: 'setTableList', resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * watchChange({ payload }, { put, call, select, take }) {
      while (true) {
        yield take(['setSearch', 'setCurrent'])
        yield put({ type: 'getTableList' });
      }
    },
    * getDetial({ payload }, { put, call, select }) {
      try {
        const { currentFree } = yield select(({ realTimeModel }) => realTimeModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.monitor_getDeviceMonitorDeatil, { code: payload })
        yield put({ type: 'setDetail', payload: resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
  },
})
