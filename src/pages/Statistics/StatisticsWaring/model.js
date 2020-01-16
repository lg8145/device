import createListModel from '../../../models/creatListModel';
import { request, Urls } from '../../../base/common';

export default createListModel({
  namespace: 'statisticsWaringModel',
  initState: {
    tabActiveKey: 0,
    WaringTabActiveKey: 0,
    waringDeviceList: {},//预警设备排名
    waringLineList: [],//预警占比
    lineListData: [],//车间
    lineList: {},//车间
    waringProductionLineDeviceList: [],
    waringDataDetailList: [],
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
        detail: payload,
      }
    },
    settabActiveKey(state, { payload }) {
      return {
        ...state,
        tabActiveKey: payload,
      }
    },
    setWaringTabActiveKey(state, { payload }) {
      return {
        ...state,
        WaringTabActiveKey: payload,
      }
    },
    setWaringDeviceList(state, { payload }) {
      return {
        ...state,
        waringDeviceList: payload,
      }
    },
    setLineList(state, { payload }) {
      return {
        ...state,
        lineList: payload,
      }
    },
    setLineListData(state, { payload }) {
      return {
        ...state,
        lineListData: payload,
      }
    },
    setWaringLineList(state, { payload }) {
      return {
        ...state,
        waringLineList: payload,
      }
    },
    setWaringProductionLineDeviceList(state, { payload }) {
      return {
        ...state,
        waringProductionLineDeviceList: payload,
      }
    },
    setWaringDataDetailList(state, { payload }) {
      return {
        ...state,
        waringDataDetailList: payload,
      }
    },
    setCurrentFree(state, { payload }) {
      return {
        ...state,
        currentFree: payload
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
        const { current, searchFields } = yield select(({ warningRecordModel }) => warningRecordModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.Analysis_warningData, { ...current, ...searchFields })
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
    * getWaringDeviceList({ payload }, { put, call, select }) {
      try {
        const { tabActiveKey } = yield select(({ statisticsWaringModel }) => statisticsWaringModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.Analysis_getWarningDeviceCount, { searchFlag: tabActiveKey, ...payload })
        yield put({ type: 'setWaringDeviceList', payload: resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * getWaringLineList({ payload }, { put, call, select }) {
      try {
        const { tabActiveKey } = yield select(({ statisticsWaringModel }) => statisticsWaringModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.Analysis_getProductionLinePercentage, { searchFlag: tabActiveKey })
        yield put({ type: 'setWaringLineList', payload: resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * getLineList({ payload }, { put, call, select }) {
      try {
        const { currentFree, searchFieldsFree } = yield select(({ statisticsWaringModel }) => statisticsWaringModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.workshopList, { ...currentFree, ...payload })
        yield put({ type: 'setLineList', payload: resdata });
        console.log('resdata--', resdata)
        if (resdata.page === 1) {
          let data = resdata.list
          data.unshift({ code: '', name: '全部产线' })
          yield put({ type: 'setLineListData', payload: data });
        }
        let data = resdata.list
        yield put({ type: 'setLineListData', payload: data });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * getWaringProductionLineDeviceList({ payload }, { put, call, select }) {
      try {
        const { tabActiveKey } = yield select(({ statisticsWaringModel }) => statisticsWaringModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.Analysis_warningProductionLineDevice, { searchFlag: tabActiveKey, ...payload })
        yield put({ type: 'setWaringProductionLineDeviceList', payload: resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * getWaringDataDetail({ payload }, { put, call, select }) {
      try {
        const { detail, currentFree } = yield select(({ statisticsWaringModel }) => statisticsWaringModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.Analysis_warningDataDetail, { ...currentFree, deviceCode: detail.deviceCode })
        yield put({ type: 'setWaringDataDetailList', payload: resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * pageChange({ payload, types }, { put, call, select }) {
      yield put({ type: 'setCurrentFree', payload });
      return yield put({ type: 'getWaringDataDetail' });
    },
  },

})
