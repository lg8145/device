
import createListModel from '../../../models/creatListModel';
import { request, Urls } from '../../../base/common';

export default createListModel({
  namespace: 'basicDataModel',
  initState: {
    parameterTermList: [],
    workshopList: []
  },
  effects: {
    * getTableList({ payload }, { put, call, select }) {
      try {
        const { current, searchFields } = yield select(({ basicDataModel }) => basicDataModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.deviceCategoryList, { ...current, ...searchFields })
        yield put({ type: 'setTableList', resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * getParameterTermList({ payload }, { put, call, select }) {
      try {
        const { current, searchFields } = yield select(({ basicDataModel }) => basicDataModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.ParameterTerm_List, { ...current, ...searchFields })
        yield put({ type: 'parameterTermList', resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * getWorkshopList({ payload }, { put, call, select }) {
      try {
        const { current, searchFields } = yield select(({ basicDataModel }) => basicDataModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.workshopList, { ...current, ...searchFields })
        yield put({ type: 'setworkshopList', resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * watchChange({ payload }, { put, call, select, take }) {
      while (true) {
        yield take(['setCurrent', 'setSearch'])
        yield put({ type: 'getTableList' });
        yield put({ type: 'getParameterTermList' });
        yield put({ type: 'getWorkshopList' });
      }
    },
  },
  reducers: {
    parameterTermList(state, { resdata }) {
      return {
        ...state,
        parameterTermList: resdata
      }
    },
    setworkshopList(state, { resdata }) {
      return {
        ...state,
        workshopList: resdata
      }
    }
  }
})