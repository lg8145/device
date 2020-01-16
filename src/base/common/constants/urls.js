/**
 * 所有的接口；
 * 注意分类
 */

const Urls = {
  /* 公共接口 */
  login: '/cem/login', //登录
  provinceList: '/cem/province/list', //省份列表
  cityList: '/cem/city/list', //城市列表
  countyList: '/cem/county/list', //区县列表
  ParameterTerm_getParamItermList: '/device/ParameterTerm/getParamItermList',//获取参数项编码名称单位列表

  getUserList: '/device/deviceCommon/getUserList',//新增申请维修

  //基础数据
  deviceCategoryName: '/device/deviceCategory/list',//所有设备分类
  // siteName: '/wdmp/Site/getAllCodeAndName', // 获取所有站点
  workshopgetAllName: '/device/productionLine/list',  // 获取所有车间信息

  deviceCategoryList: '/device/deviceCategory/list', //设备分类列表
  deviceCategorySave: '/device/deviceCategory/save',//设备分类新增
  deviceCategoryUpdate: '/device/deviceCategory/update', //设备分类修改
  deviceCategoryLogicCategory: '/device/deviceCategory/updateStatus',//设备分类禁用/启用
  deviceCategoryLogicDelCategory: '/device/deviceCategory/logicCategory',//分类删除


  ParameterTerm_List: '/device/ParameterTerm/list', //参数项列表
  ParameterTermSave: '/device/ParameterTerm/save', //参数项新增
  ParameterTermUpdate: '/device/ParameterTerm/updateParameterTerm',//参数项修改
  paramLogicDel: '/device/ParameterTerm/updateStatus',//参数项禁用/启用
  ParameterTermLogicDel: '/device/ParameterTerm/logicDelTerm',//参数项删除


  workshopList: '/device/productionLine/list',//车间列表
  workshopSave: '/device/productionLine/save',//车间新增
  workshopUpdate: '/device/productionLine/update',//车间修改
  workshopUpdateStatus: '//device/productionLine/updateStatus',//车间禁用/启用
  workshopLogicDel: '/device/productionLine/logicDel',//车间删除


  // 设备台账
  deviceList: '/device/device/list',//设备列表
  deviceSave: '/device/device/save',//设备新增
  deviceUpdate: '/device/device/update',//设备修改
  deviceLogicDel: '/device/device/logicDel', //设备删除
  getAllDeviceCode: '/wdmp/device/getAllDeviceCode', //获取所有设备编号

  sparePartList: '/device/sparePart/list', //备件列表
  sparePartSave: '/device/sparePart/save', //备件新增
  sparePartUpdate: '/device/sparePart/update', //备件修改
  sparePartLogicDel: '/device/sparePart/logicDel', //备件删除

  /** 设备台账-文档管理*/
  equipmentTrain_list: '/device/FileUpload/list', //列表
  deviceDocumenDelete: '/device/FileUpload/physcisDel', //删除
  device_getCategoryCount: '/device/device/getCategoryCount', //获取分类及分类下设备数量

  /** 设备点检-点检模板*/
  SpotCheckTemplate_list: '/device/SpotCheckTemplate/list',//列表
  SpotCheckTemplate_logicDel: '/device/SpotCheckTemplate/logicDel',//-删除
  SpotCheckTemplate_save: '/device/SpotCheckTemplate/save',//新增
  SpotCheckTemplate_update: '/device/SpotCheckTemplate/update',//编辑
  SpotCheckTemplate_getDetailList: '/device/SpotCheckTemplate/getDetail',//详情明细列表
  SpotCheckTemplate_physicsDelDetail: '/device/SpotCheckTemplate/physicsDelDetail',//详情明细列表-删除
  SpotCheckTemplate_getRelationList: '/device/relationDevice/getRelationList',//关联设备列表
  device_list: '/device/device/list',//设备列表
  SpotCheckTemplate_saveRelationDevice: '/device/relationDevice/saveRelationDevice',//关联设备新增
  /** 设备点检-点检作业*/
  SpotCheckTask_list: '/device/SpotCheck/list',//列表
  SpotCheckTask_getDetail: '/device/SpotCheck/getDetail',//点检明细
  SpotCheckTask_save: '/device/SpotCheck/save',//新增点检
  SpotCheckTask_getSpotCheckView: '/device/SpotCheck/getSpotCheckView',//查看点检报告
  /** 维修和保养-保养计划*/
  MaintenancePlan_list: '/device/MaintenancePlanSkip/list',//列表
  MaintenancePlan_save: '/device/MaintenancePlan/save',//新增
  MaintenancePlan_update: '/device/MaintenancePlan/update',//编辑
  MaintenancePlan_logicDelMaintenancePlan: '/device/MaintenancePlan/logicDelMaintenancePlan',//删除
  MaintenancePlan_skipUpdate: '/device/MaintenancePlanSkip/skipUpdate',//详情
  /** 维修和保养-保养记录*/
  MaintenanceRecord_list: '/device/MaintenanceRecordSkip/list',//列表
  MaintenanceRecord_skipView: '/device/MaintenanceRecordSkip/skipView',//详情
  MaintenanceRecord_saveMaintenanceRecord: '/device/MaintenanceRecord/saveMaintenanceRecord',//新增
  MaintenanceRecord_skipSavePage: '/device/MaintenanceRecordSkip/skipSavePage',//新增里明细
  /** 维修和保养-维修记录*/
  RepairRecordSkip_list: '/device/RepairRecordSkip/list',//列表
  RepairRecordSkip_skipView: '/device/RepairRecordSkip/skipView',//查看
  RepairRecordSkip_logicDel: '/device/RepairRecord/logicDel',//删除
  RepairRecordSkip_update: '/device/RepairRecord/update',//录入维修
  RepairRecordSkip_saveRepairApply: '/device/RepairRecord/saveRepairApply',//新增申请维修

  /** 设备预警-预警规则*/
  WarningRules_list: '/device/EarlyWarningRulesSkip/list',//列表
  WarningRules_save: '/device/EarlyWarningRules/save',//新增
  WarningRules_update: '/device/EarlyWarningRules/update',//编辑
  WarningRules_getUpdateView: '/device/EarlyWarningRulesSkip/getUpdateView',//编辑明细
  WarningRules_logicDelWarning: '/device/EarlyWarningRules/logicDelWarning',//删除
  /** 设备预警-预警记录*/
  WarnRecordSkip_list: '/device/warnRecordSkip/list',//列表
  /** 设备监控-实时监控*/
  monitor_getDeviceMonitorList: '/device/monitor/getDeviceMonitorList',//列表
  monitor_getDeviceMonitorDeatil: '/device/monitor/getDeviceMonitorDeatil',//详情
  /** 统计报表-预警分析*/
  Analysis_getWarningDeviceCount: '/device/Analysis/getWarningDeviceCount',//预警分析预警设备数量
  Analysis_getProductionLinePercentage: '/device/Analysis/getProductionLinePercentage',//预警分析产线预警占比
  Analysis_warningProductionLineDevice: '/device/Analysis/warningProductionLineDevice',//预警分析车间预警柱状数据
  Analysis_warningData: '/device/Analysis/warningData',//预警分析数据列表
  Analysis_warningDataDetail: '/device/Analysis/warningDataDetail',//预警分析数据详情
  Analysis_getMonthTotal: '/device/Energy/getMonthTotal',//耗能分析月耗能统计
  Analysis_getEngryList: '/device/Energy/getEngryList',//耗能分析月耗能设备列表
}

export { Urls }
