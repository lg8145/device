import createListModel from '../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../base/common';

export default createListModel({
  namespace: 'equipmentOverviewModel',
  initState: {
    currentFree: {
      page: 1,
      pageSize: 5
    },
    detail: {},
    deviceWaringTabActiveKey: 1,//设备预警tabkey
    deviceTwoTabActiveKey: 1,//设备两个tabkey
    waringTOPTabActiveKey: 0,
  },
  reducers: {
    setDetail(state, { payload }) {
      return {
        ...state,
        detail: payload
      }
    },
    setDeviceWaringTabActiveKey(state, { payload }) {
      return {
        ...state,
        deviceWaringTabActiveKey: payload
      }
    },
    setDeviceTwoTabActiveKey(state, { payload }) {
      return {
        ...state,
        deviceTwoTabActiveKey: payload
      }
    },
    setWaringTOPTabActiveKey(state, { payload }) {
      return {
        ...state,
        waringTOPTabActiveKey: payload
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
        const { current, searchFields } = yield select(({ equipmentOverviewModel }) => equipmentOverviewModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.monitor_getDeviceMonitorList, { ...current, ...searchFields })
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
        const { currentFree } = yield select(({ equipmentOverviewModel }) => equipmentOverviewModel)
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
