import createListModel from '../../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../../base/common';

export default createListModel({
  namespace: 'addwarningRulesModel',
  initState: {
    id: 0,//
    addTableList: [],//新增表格
    detail: {},//详情
    detailList: [],//详情列表
    paramItemList: []
  },
  reducers: {
    setAddTableList(state, { payload }) {
      return {
        ...state,
        addTableList: payload,
      }
    },
    setParamItemList(state, { payload }) {
      return {
        ...state,
        paramItemList: payload,
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
        paramItemList: []
      }
    }
  },
  effects: {
    * handleChangeRow({ payload }, { put, call, select }) {
      const { addTableList } = yield select(({ addwarningRulesModel }) => addwarningRulesModel)
      let items = { ...addTableList[payload.index] };
      items[payload.item] = payload.value;
      if (payload.item == 'paramItem') {
        items.unitMeasure = payload.option.props.data.unitMeasure;
      }
      addTableList[payload.index] = items;
    },
    //参数项列表
    * getParamItemList({ payload }, { put, call, select }) {
      try {
        const { current } = yield select(({ addwarningRulesModel }) => addwarningRulesModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.ParameterTerm_getParamItermList)
        yield put({ type: 'setParamItemList', payload: resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },



    //详情明细列表
    * getDetailList({ payload }, { put, call, select }) {
      try {
        const { current } = yield select(({ addwarningRulesModel }) => addwarningRulesModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.WarningRules_getUpdateView, { code: payload.code })
        console.log('payload--resdata--', resdata)
        yield put({ type: 'setDetail', payload: resdata });
        yield put({ type: 'setAddTableList', payload: resdata.warningRulesDetails });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
  },
})
