/**
 * 菜单配置
 * show：配置菜单权限，默认不需要配置
 * children: 二级目录
 */


export default [
  {
    path: 'equipmentMonitoring',
    name: '设备监控',
    icon: 'iconshebeijiankong1',
    children: [
      {
        path: 'equipmentOverview'
      },
      {
        path: 'realTime'
      },
      {
        path: 'firstHook'
      }
    ]
  },
  {
    path: 'equipmentLedger',
    name: '设备台账',
    icon: 'iconshebeitaizhang',
    children: [
      {
        path: 'equipmentList'
      },
      {
        path: 'equipmentManage'
      },
      {
        path: 'equipmentTrain'
      }
    ]
  },
  {
    path: 'equipmentSpotCheck',
    name: '设备点检',
    icon: 'iconshebeidianjian',
    children: [
      {
        path: 'spotCheckTemplate'
      },
      {
        path: 'spotCheckTask'
      },
    ]
  },
  {
    path: 'repairAddMaintain',
    name: '维修保养',
    icon: 'iconshebeiweixiu',
    children: [
      {
        path: 'maintainPlan'
      },
      {
        path: 'maintainRecord'
      },
      {
        path: 'repairApply'
      },
      {
        path: 'maintenanceWork'
      }
    ]
  },
  {
    path: 'equipmentWarning',
    name: '设备预警',
    icon: 'iconshebeiyujing',
    children: [
      {
        path: 'warningRules'
      },
      {
        path: 'warningRecord'
      }
    ]
  },
  {
    path: 'statistics',
    name: '统计报表',
    icon: 'icontongjibaobiao',
    children: [
      {
        path: 'statisticsEnergy'
      },
      {
        path: 'statisticsWFault'
      },
      {
        path: 'statisticsWaring'
      },
    ]
  },
  {
    path: 'systeam',
    name: '系统设置',
    icon: 'iconxitongshezhi1',
    children: [
      {
        path: 'basicData'
      },
    ]
  },
]
