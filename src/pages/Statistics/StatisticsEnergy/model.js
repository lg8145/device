import createListModel from '../../../models/creatListModel';
import { request, Urls } from '../../../base/common';

export default createListModel({
  namespace: 'statisticsEnergyModel',
  initState: {
    typeList: [],
    siteList: [],
    detail: {},
    engryList: [],
    tabActiveKey: 1,
  },
  effects: {
    * getTableList({ payload }, { put, call, select }) {
      try {
        const { current, searchFields } = yield select(({ statisticsEnergyModel }) => statisticsEnergyModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.Analysis_getMonthTotal, { ...payload })
        let str = '月'
        resdata.length > 0 && resdata.map((item, index) => {
          item.month = item.month + str
        })
        console.log('data---m--', resdata)
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
    * getEngryList({ payload }, { put, call, select }) {
      try {
        const { current } = yield select(({ statisticsEnergyModel }) => statisticsEnergyModel)
        const resdata = yield call(request.get, Urls.Analysis_getEngryList, { ...payload, })
        yield put({ type: 'setEngryList', resdata });
      } catch (err) {
        console.log('error===>', err.message);
      }
    }
  },
  reducers: {
    setEngryList(state, { resdata }) {
      return {
        ...state,
        engryList: resdata
      }
    },
    setTabActiveKey(state, { payload }) {
      return {
        ...state,
        tabActiveKey: payload
      }
    },
  }
})
