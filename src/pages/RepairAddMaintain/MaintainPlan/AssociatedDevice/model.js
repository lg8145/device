import createListModel from '../../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../../base/common';

export default createListModel({
  namespace: 'planassociatedDeviceModel',
  initState: {
    detail: {},
    currentFree: {
      page: 1,
      pageSize: 5
    },
    searchFieldsFree: {},
    deviceAllList: {},
    selectedRowKeysAll: [],//添加设备列表选择
    selectedRowsAll: [],
    associatedDeviceData: [],
    selectedRowKeysDevice: [],
    selectedRowsDevice: [],//关联设备列表选择
  },
  reducers: {
    setDetail(state, { payload }) {
      return {
        ...state,
        detail: payload
      }
    },
    setAssociatedDeviceData(state, { payload }) {
      return {
        ...state,
        associatedDeviceData: payload
      }
    },
    setDeviceAllList(state, { payload }) {
      return {
        ...state,
        deviceAllList: payload
      }
    },
    setFreeSearch(state, { payload }) {
      return {
        ...state,
        searchFieldsFree: payload,
        currentFree: {
          page: 1,
          pageSize: 5
        }
      }
    },
    setCurrentFree(state, { payload }) {
      return {
        ...state,
        currentFree: payload
      }
    },
    setAddDeviceVal(state, { payload }) {
      return {
        ...state,
        selectedRowsAll: payload.selectedRows
      }
    },
    setSelectedRowsDevice(state, { payload }) {
      return {
        ...state,
        selectedRowKeysDevice: payload.selectedRowKeys,
        selectedRowsDevice: payload.selectedRows
      }
    },
    resetFreeSearch(state, { payload }) {
      return {
        ...state,
        searchFieldsFree: {},
        currentFree: {
          page: 1,
          pageSize: 5
        }
      }
    },
  },
  effects: {
    * getTableList({ payload }, { put, call, select }) {
      try {
        const { current,detail } = yield select(({ planassociatedDeviceModel }) => planassociatedDeviceModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.SpotCheckTemplate_getRelationList, { ...current, relationFlag: 2,maintenancePlanCode:detail.maintenancePlanCode })
        yield put({ type: 'setTableList', resdata });
        yield put({ type: 'setAssociatedDeviceData', payload: resdata.list });
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
    //设备列表
    * getDeviceAlllist({ payload }, { put, call, select }) {
      try {
        const { currentFree, searchFieldsFree } = yield select(({ planassociatedDeviceModel }) => planassociatedDeviceModel)
        const resdata = yield call(request.get, Urls.device_list, { ...currentFree, ...searchFieldsFree, relationFlag: 2 })
        yield put({ type: 'setDeviceAllList', payload: resdata });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * pageChange({ payload, types }, { put, call, select }) {
      yield put({ type: 'setCurrentFree', payload });
      return yield put({ type: 'getDeviceAlllist' });
    },
    * handleSearch({ payload, types }, { put, call, select }) {
      yield put({ type: 'setFreeSearch', payload });
      return yield put({ type: 'getDeviceAlllist' });
    },
  },
})
