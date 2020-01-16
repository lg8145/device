import React from 'react';
import SpotCheckTemplateComp from '../../pages/EquipmentSpotCheck/SpotCheckTemplate/SpotCheckTemplateComp'
import AddSpotCheckTemplateComp from '../../pages/EquipmentSpotCheck/SpotCheckTemplate/AddSpotCheckTemplate/AddSpotCheckTemplateComp'
import AssociatedDeviceComp from '../../pages/EquipmentSpotCheck/SpotCheckTemplate/AssociatedDevice/AssociatedDeviceComp'
import SpotCheckTaskComp from '../../pages/EquipmentSpotCheck/SpotCheckTask/SpotCheckTaskComp'
import AddSpotCheckTaskComp from '../../pages/EquipmentSpotCheck/SpotCheckTask/AddSpotCheckTask/AddSpotCheckTaskComp'
import SpotCheckTaskDetailComp from '../../pages/EquipmentSpotCheck/SpotCheckTask/SpotCheckTaskDetail/SpotCheckTaskDetailComp'
import MaintainPlanComp from '../../pages/RepairAddMaintain/MaintainPlan/MaintainPlanComp'
import AddMaintainPlanComp from '../../pages/RepairAddMaintain/MaintainPlan/AddMaintainPlan/AddMaintainPlanComp'
import PlanAssociatedDeviceComp from '../../pages/RepairAddMaintain/MaintainPlan/AssociatedDevice/PlanAssociatedDeviceComp'
import MaintainRecordComp from '../../pages/RepairAddMaintain/MaintainRecord/MaintainRecordComp'
import MaintainRecordDetailComp from '../../pages/RepairAddMaintain/MaintainRecord/MaintainRecordDetail/MaintainRecordDetailComp'
import AddMaintainRecordComp from '../../pages/RepairAddMaintain/MaintainRecord/AddMaintainRecord/AddMaintainRecordComp'
import RepairApplyComp from '../../pages/RepairAddMaintain/RepairApply/RepairApplyComp'
import MaintenanceWork from '../../pages/RepairAddMaintain/maintenanceWork/index'
import AddWork from '../../pages/RepairAddMaintain/maintenanceWork/addWork'
import CheckWork from '../../pages/RepairAddMaintain/maintenanceWork/details'
import WarningRulesComp from '../../pages/EquipmentWarning/WarningRules/WarningRulesComp'
import WarningRulesAssociatedDeviceComp from '../../pages/EquipmentWarning/WarningRules/WarningRulesAssociatedDevice/WarningRulesAssociatedDeviceComp'
import AddWarningRulesComp from '../../pages/EquipmentWarning/WarningRules/AddWarningRules/AddWarningRulesComp'
import WarningRecordComp from '../../pages/EquipmentWarning/WarningRecord/WarningRecordComp'
import EauipmentList from '../../pages/EquipmentLedger/EquipmentList/index'
import EquipmentManages from '../../pages/EquipmentLedger/EquipmentManage/index'
import EquipmentTrain from '../../pages/EquipmentLedger/EquipmentTrain/index'
import BasicData from '../../pages/Systeam/BasicData/index'
import RealTimeComp from '../../pages/EquipmentMonitoring/RealTime/RealTimeComp'
import StatisticsWaringComp from '../../pages/Statistics/StatisticsWaring/StatisticsWaringComp'
import StatisticsFaultComp from '../../pages/Statistics/StatisticsWFault/StatisticsFaultComp'
import StatisticsEnergyComp from '../../pages/Statistics/StatisticsEnergy/StatisticsEnergyComp'
import EquipmentOverviewComp from '../../pages/EquipmentMonitoring/EquipmentOverview/EquipmentOverviewComp'
import FirstHook from '../../pages/EquipmentMonitoring/FirstHook/FirstHook'
export default {
  'spotCheckTemplate': { name: '点检模板', component: () => <SpotCheckTemplateComp /> },
  'addSpotCheckTemplate': { name: '新建点检模板', component: () => <AddSpotCheckTemplateComp /> },
  'editSpotCheckTemplate': { name: '编辑点检模板', component: () => <AddSpotCheckTemplateComp /> },
  'associatedDevice': { name: '关联设备', component: () => <AssociatedDeviceComp /> },
  'spotCheckTask': { name: '点检作业', component: () => <SpotCheckTaskComp /> },
  'addSpotCheckTask': { name: '新建点检作业', component: () => <AddSpotCheckTaskComp /> },
  'spotCheckTaskDetail': { name: '点检报告', component: () => <SpotCheckTaskDetailComp /> },
  'maintainPlan': { name: '保养计划', component: () => <MaintainPlanComp /> },
  'addmaintainPlan': { name: '新建保养计划', component: () => <AddMaintainPlanComp /> },
  'editmaintainPlan': { name: '编辑保养计划', component: () => <AddMaintainPlanComp /> },
  'planassociatedDevice': { name: '关联设备', component: () => <PlanAssociatedDeviceComp /> },//保养计划关联设备
  'maintainRecord': { name: '保养记录', component: () => <MaintainRecordComp /> },
  'maintainRecordDetail': { name: '保养记录详情', component: () => <MaintainRecordDetailComp /> },
  'addmaintainRecord': { name: '新建保养记录', component: () => <AddMaintainRecordComp /> },
  'repairApply': { name: '申请维修', component: () => <RepairApplyComp /> },
  'maintenanceWork': { name: '维修作业', component: () => <MaintenanceWork /> },
  'editWork': { name: '录入维修记录', component: () => <AddWork /> },
  'checkWork': { name: '查看', component: () => <CheckWork /> },
  'warningRules': { name: '预警规则', component: () => <WarningRulesComp /> },
  'warningRulesDevice': { name: '关联设备', component: () => <WarningRulesAssociatedDeviceComp /> },//预警规则关联设备
  'addWarningRules': { name: '新建预警规则', component: () => <AddWarningRulesComp /> },
  'editWarningRules': { name: '编辑预警规则', component: () => <AddWarningRulesComp /> },
  'warningRecord': { name: '预警记录', component: () => <WarningRecordComp /> },
  'equipmentList': { name: '设备列表', component: () => <EauipmentList /> },
  'equipmentManage': { name: '备件管理', component: () => <EquipmentManages /> },
  'equipmentTrain': { name: '文档管理', component: () => <EquipmentTrain /> },
  'basicData': { name: '基础数据', component: () => <BasicData /> },
  'realTime': { name: '实时监控', component: () => <RealTimeComp /> },
  'equipmentOverview': { name: '设备总览', component: () => <EquipmentOverviewComp /> },
  'statisticsWaring': { name: '设备预警分析', component: () => <StatisticsWaringComp /> },
  'statisticsWFault': { name: '设备故障分析', component: () => <StatisticsFaultComp /> },
  'statisticsEnergy': { name: '设备耗能统计', component: () => <StatisticsEnergyComp /> },
  'firstHook': { name: '海绵宝宝', component: () => <FirstHook /> },
}
