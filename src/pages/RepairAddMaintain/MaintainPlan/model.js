import createListModel from '../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../base/common';

export default createListModel({
  namespace: 'maintainPlanModel',
  initState: {
  },
  reducers: {
  },
  effects: {
    * getTableList({ payload }, { put, call, select }) {
      try {
        const { current } = yield select(({ maintainPlanModel }) => maintainPlanModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.MaintenancePlan_list, { ...current })
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
  },
})
