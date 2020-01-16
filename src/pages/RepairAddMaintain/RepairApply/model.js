import createListModel from '../../../models/creatListModel';
import { request, Urls } from '../../../base/common';

export default createListModel({
  namespace: 'repairApplyModel',
  initState: {
    currentFree: {
      page: 1,
      pageSize: 5
    },
    searchFieldsFree:{},
    typeList: [],
    siteList: [],
    detail: {}
  },
  reducers: {
    setCurrent(state, { payload }) {
      return {
        ...state,
        searchFieldsFree: payload,
        currentFree: {
          page: 1,
          pageSize: 5
        }
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
        const { currentFree, searchFieldsFree } = yield select(({ repairApplyModel }) => repairApplyModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.device_list, { ...currentFree, ...searchFieldsFree })
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
    * handleSearch({ payload, types }, { put, call, select }) {
      yield put({ type: 'setFreeSearch', payload });
      return yield put({ type: 'getTableList' });
    },
  },

})
