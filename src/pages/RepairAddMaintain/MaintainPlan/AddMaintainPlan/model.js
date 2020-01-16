import createListModel from '../../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../../base/common';

export default createListModel({
  namespace: 'addmaintainPlanModel',
  initState: {
    id: 0,//
    addTableList: [],//新增表格
    detail: {},//详情
  },
  reducers: {
    setAddTableList(state, { payload }) {
      return {
        ...state,
        addTableList: payload,
      }
    },
    setDeleteCol(state, { payload }) {
      return {
        ...state,
        addTableList: payload,
      }
    },
    setId(state, { payload }) {
      return {
        ...state,
        id: payload
      }
    },
    setLineNo(state, { payload }) {
      return {
        ...state,
        id: payload
      }
    },
    setDetail(state, { payload }) {
      return {
        ...state,
        detail: payload
      }
    },
    resetData(state) {
      return {
        ...state,
        id: 0,//
        addTableList: [],//新增表格
        detail: {},//详情
        detailList: [],//详情列表
      }
    }
  },
  effects: {
    * handleChangeRow({ payload }, { put, call, select }) {
      const { addTableList } = yield select(({ addmaintainPlanModel }) => addmaintainPlanModel)
      let items = { ...addTableList[payload.index] };
      items[payload.item] = payload.value;
      addTableList[payload.index] = items;
    },
    //详情明细列表
    * getDetailList({ payload }, { put, call, select }) {
      try {
        const { current } = yield select(({ addmaintainPlanModel }) => addmaintainPlanModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.MaintenancePlan_skipUpdate, { maintenancePlanCode: payload.maintenancePlanCode })
        console.log('payload--resdata--', resdata)
        yield put({ type: 'setAddTableList', payload: resdata.detail });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
  },
})
