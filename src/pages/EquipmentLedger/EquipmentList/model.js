import createListModel from '../../../models/creatListModel';
import { request, Urls } from '../../../base/common';

export default createListModel({
  namespace: 'equipmentListModel',
  initState: {
    typeList: [],
    typeListAll: [],
    siteList: [],
    workShopList: [],
    datalist: {},
    currentFree: {
      page: 1,
      pageSize: 5
    }
  },
  effects: {
    * getTableList({ payload }, { put, call, select }) {
      try {
        const { current, searchFields } = yield select(({ equipmentListModel }) => equipmentListModel)
        yield put({ type: 'setLoading', payload: true });
        const resdata = yield call(request.get, Urls.deviceList, { ...current, ...searchFields,...payload })
        yield put({ type: 'setTableList1', payload: resdata });
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
    // 获取所有设备分类
    * getTypeList({ }, { put, call, select }) {
      try {
        const resdata = yield call(request.get, Urls.device_getCategoryCount);
        resdata.unshift({ categoryCode: '', categoryName: '全部设备' })
        yield put({ type: 'setTypeList', payload: resdata });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    // 获取所有设备分类
    * getTypeListAll({ }, { put, call, select }) {
      try {
        const resdata = yield call(request.get, Urls.device_getCategoryCount);
        let data = resdata
        yield put({ type: 'setTypeListAll', payload: data });
      } catch (err) {
        console.log('error===>', err.message);
      }
    },
    // 获取所有站点
    // * getSiteList({},{put, call, select}){
    //     try {
    //         const resdata = yield call(request.get,Urls.siteName)
    //         let data=resdata.unshift({code:'',name:'全部'})
    //         yield put({ type: 'setSiteList',resdata});
    //     } catch (err) {
    //         console.log('error===>',err.message)
    //     }
    // },
    //获取所有车间信息
    * getWorkShop({ payload }, { put, call, select }) {
      try {
        const resdata = yield call(request.get, Urls.workshopList, { ...payload })
        yield put({ type: 'setWorkShop', payload: resdata.list })
      } catch (err) {
        console.log('error===>', err.message)
      }
    },
  },
  reducers: {
    setTableList1(state, { payload }) {
      return {
        ...state,
        datalist: payload
      }
    },
    setTypeList(state, { payload }) {
      return {
        ...state,
        typeList: payload
      }
    },
    setTypeListAll(state, { payload }) {
      return {
        ...state,
        typeListAll: payload
      }
    },
    setSiteList(state, { resdata }) {
      return {
        ...state,
        siteList: resdata
      }
    },
    setWorkShop(state, { payload }) {
      return {
        ...state,
        workShopList: payload
      }
    },
  }
})
