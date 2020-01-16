import createListModel from '../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../base/common';

export default createListModel({
  namespace: 'warningRecordModel',
  initState: {
  },
  reducers: {
  },
  effects: {
    * getTableList({ payload }, { put, call, select }) {
      try {
        const { current, searchFields } = yield select(({ warningRecordModel }) => warningRecordModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.WarnRecordSkip_list, { ...current, ...searchFields, ...payload })
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
