import createListModel from '../../../models/creatListModel';
import { request, Urls } from '../../../base/common';

export default createListModel({
  namespace: 'maintenanceWorkModel',
  initState: {
    typeList: [],
    siteList: [],
    detail: {},
    userList: {},
    tablePage5List: {}
  },
  effects: {
    * getTableList({ payload }, { put, call, select }) {
      try {
        const { current, searchFields } = yield select(({ maintenanceWorkModel }) => maintenanceWorkModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.RepairRecordSkip_list, { ...current, ...searchFields,...payload })
        yield put({ type: 'setTableList', resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * watchChange({ payload }, { put, call, select, take }) {
      while (true) {
        yield take(['setCurrent', 'setSearch'])
        yield put({ type: 'getTableList' });
      }
    },
    * getCheckDetails({ payload }, { put, call, select }) {
      try {
        const resdata = yield call(request.get, Urls.skipView)
        yield put({ type: 'setCheckDetails', resdata })
      } catch (err) {
        console.log('error===>', err.message)
      }
    },
    * getUserList({ payload }, { put, call, select }) {
      try {
        const { current } = yield select(({ maintenanceWorkModel }) => maintenanceWorkModel)
        const resdata = yield call(request.get, Urls.getUserList, { ...current, })
        yield put({ type: 'setUserList', resdata });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    //首页展示使用
    * getTablePage5List({ payload }, { put, call, select }) {
      try {
        const { current, searchFields } = yield select(({ maintainRecordModel }) => maintainRecordModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.RepairRecordSkip_list, { ...payload })
        yield put({ type: 'setTablePage5List', payload: resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
  },
  reducers: {
    setTablePage5List(state, { payload }) {
      return {
        ...state,
        tablePage5List: payload,
      }
    },
    setCheckDetails(state, { resdata }) {
      return {
        ...state,
        detail: resdata
      }
    },
    setUserList(state, { resdata }) {
      return {
        ...state,
        userList: resdata
      }
    }
  }
})
