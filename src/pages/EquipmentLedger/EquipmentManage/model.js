import createListModel from '../../../models/creatListModel';
import { request, Urls } from '../../../base/common';

export default createListModel({
    namespace: 'equipmentManageModel',
    effects: {
        * getTableList({ payload }, { put, call, select }) {
            try {
                const { current, searchFields } = yield select(({ equipmentManageModel }) => equipmentManageModel)
                yield put({ type: 'setLoading', payload: true });
                const resdata = yield call(request.get, Urls.sparePartList, { ...current, ...searchFields })
                yield put({ type: 'setTableList', resdata });
                yield put({ type: 'setLoading', payload: false });
            } catch (err) {
                console.log('error===>', err.message);
            }
        },
        * watchChange({ payload }, { put, call, select, take }) {
            while (true) {
                yield take(['setCurrent', 'setSearch' ])
                yield put({ type: 'getTableList' });
            }
        },
    },
})
