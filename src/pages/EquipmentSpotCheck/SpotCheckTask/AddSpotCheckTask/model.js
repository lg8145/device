import createListModel from '../../../../models/creatListModel';
import { request, Urls, ReqApi } from '../../../../base/common';

export default createListModel({
  namespace: 'addspotCheckTaskModel',
  initState: {
    id: 0,//
    checkDeviceDetail: {},//选择设备详情
    addSpotCheckTaskData: {},//选择设备获取作业数据
    detailList: [],//详情列表
    currentFree: {
      page: 1,
      pageSize: 5
    }
  },
  reducers: {
    setFreeSearch(state, { payload }) {
      return {
        ...state,
        searchFieldsFree: payload,
        currentFree: {
          page: 1,
          pageSize: 5
        }
      }
    },
    setCheckDeviceDetail(state, { payload }) {
      return {
        ...state,
        checkDeviceDetail: payload
      }
    },
    setAddSpotCheckTaskData(state, { payload }) {
      return {
        ...state,
        addSpotCheckTaskData: payload
      }
    },
    setCurrentFree(state, { payload }) {
      return {
        ...state,
        currentFree: payload
      }
    },
    resetData(state) {
      return {
        ...state,
        id: 0,//
        addTableList: [],//新增表格
        checkDeviceDetail: {},//选择设备详情
        addSpotCheckTaskData: {},//选择设备获取作业数据
        detailList: [],//详情列表
        currentFree: {
          page: 1,
          pageSize: 5
        }
      }
    }
  },
  effects: {
    //设备列表
    * getDeviceAlllist({ payload }, { put, call, select }) {
      try {
        const { currentFree, searchFieldsFree } = yield select(({ addspotCheckTaskModel }) => addspotCheckTaskModel)
        const resdata = yield call(request.get, Urls.device_list, { ...currentFree, ...searchFieldsFree})
        yield put({ type: 'setTableList', resdata });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    * pageChange({ payload, types }, { put, call, select }) {
      yield put({ type: 'setCurrentFree', payload });
      return yield put({ type: 'getDeviceAlllist' });
    },
    * handleSearch({ payload, types }, { put, call, select }) {
      yield put({ type: 'setFreeSearch', payload });
      return yield put({ type: 'getDeviceAlllist' });
    },
    //选取设备后调获取点检作业数据
    * getTaskList({ payload }, { put, call, select }) {
      try {
        const resdata = yield call(request.get, Urls.SpotCheckTask_getDetail, { deviceCode: payload.code })
        yield put({ type: 'setAddSpotCheckTaskData', payload: resdata });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },

    * handleChangeRow({ payload }, { put, call, select }) {
      const { addSpotCheckTaskData } = yield select(({ addspotCheckTaskModel }) => addspotCheckTaskModel)
      let items = { ...addSpotCheckTaskData.detail[payload.index] };
      items[payload.item] = payload.value;
      addSpotCheckTaskData.detail[payload.index] = items;
    },
    //详情明细列表
    * getDetailList({ payload }, { put, call, select }) {
      try {
        const { current } = yield select(({ addspotCheckTaskModel }) => addspotCheckTaskModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.SpotCheckTemplate_getDetailList, { spotCheckTemplateCode: payload.templateCode })
        console.log('payload--resdata--', resdata)
        yield put({ type: 'setAddTableList', payload: resdata });
        yield put({ type: 'setLoading', payload: false });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
  },
})
