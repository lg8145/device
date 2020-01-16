import React, { PureComponent } from 'react';
import './index.scss'
import { Tabs, Table, Radio, Modal, Row, Col, Form, Button, Input, Icon, Divider, message, Badge } from 'antd';
import Components from '../../../base/components';
import AddWork from './addWork'
import Details from './details'
import { connect } from 'dva';
import { ReqApi, Urls } from '../../../base/common';
const { FooterPagination, SearchMore, DeleteModal } = Components;
const { TabPane } = Tabs;
@connect(state => ({ maintenanceWorkModel: state.maintenanceWorkModel, global: state.global }))
class MaintenanceWork extends PureComponent {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.dispatch({ type: 'maintenanceWorkModel/getTableList' })
    this.props.dispatch({ type: 'maintenanceWorkModel/watchChange' });
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'maintenanceWorkModel/resetData' })
  }
  toggle = (record) => {
    return ReqApi.get({
      url: Urls.RepairRecordSkip_skipView,
      pm: { code: record.code }
    }).then((data) => {
      this.setState({ detail: data }, () => {
        this.props.dispatch({ type: 'global/addRemoveTabs', path: 'maintenanceWork', targetPath: 'editWork', trans: { path: 'editWork', detail: data } })
      })
    })
  };
  add = () => {
    let detail = {};
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'maintenanceWork', targetPath: 'repairApply' })
  };
  onSubmit = (values) => {

  }
  toggleDetails = (detail) => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'maintenanceWork', targetPath: 'checkWork', trans: { path: 'checkWork', detail } })
    // return ReqApi.get({
    //     url:Urls.skipView,
    //     pm:{code:record.code}
    // }).then((data)=>{
    //   let detail=data;

    // })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'maintenanceWorkModel/setCurrent', payload: e })
  }
  handleSearchForm = (e) => {
    this.props.dispatch({ type: 'maintenanceWorkModel/setSearch', payload: e })
  }
  deleteRow = (record) => {
    return ReqApi.post({
      url: Urls.RepairRecordSkip_logicDel,
      pm: { code: record.code }
    }).then((data) => {
      message.success('删除成功')
      this.props.dispatch({ type: 'maintenanceWorkModel/getTableList' })
    })

  }
  render() {
    const colors = {
      '0': '#05A9F4',//申请维修
      '1': '#23BC08',//已维修
      '2': '#F49505',//维修中
      '3': '#E52C00',//无法修复
    }
    const columns = [
      {
        key: 1,
        title: '维修单号',
        dataIndex: 'code'
      },
      {
        key: 2,
        title: '申请维修日期',
        dataIndex: 'applyRepairDate',
      },
      {
        key: 3,
        title: '设备编号',
        dataIndex: 'deviceCode',
      },
      {
        key: 4,
        title: '设备名称',
        dataIndex: 'deviceName',
      },
      {
        key: 5,
        title: '设备型号',
        dataIndex: 'model',
      },
      {
        key: 6,
        title: '维修项目',
        dataIndex: 'repairItem',
      },
      {
        key: 7,
        title: '维修方式',
        dataIndex: 'repairModeName',
      },
      {
        key: 8,
        title: '状态',
        dataIndex: 'repairStatusName',
        render: (text, record) => {
          return <Badge color={colors[record.repairStatus]} text={record.repairStatusName} style={{ fontSize: 12 }} />
        }
      },
      {
        key: 9,
        title: '操作',
        dataIndex: '',
        render: (text, record) => (
          <span>
            {(record.repairStatus == 1 || record.repairStatus == 3) && <span><a onClick={() => this.toggleDetails(record)}>查看</a><Divider type="vertical" /></span>}
            {(record.repairStatus == 2 || record.repairStatus == 0) && <span><a onClick={() => this.toggle(record)}>录入维修记录</a><Divider type="vertical" /></span>}
            {record.repairStatus == 0 && <DeleteModal deleteOk={() => this.deleteRow(record)}><a>删除</a></DeleteModal>}
          </span>
        ),
      },
    ];
    const searchItems = [
      {
        label: '设备编号',
        type: 'Input',
        id: 'deviceCode'
      },
      {
        label: '设备名称',
        type: 'Input',
        id: 'deviceName'
      },
      {
        label: '设备型号',
        type: 'Input',
        id: 'model'
      },
      {
        label: '维修单号',
        type: 'Input',
        id: 'code'
      },
      {
        label: '维修项目',
        type: 'Input',
        id: 'repairItem'
      },
      {
        label: '维修方式',
        type: 'Select',
        enums: [
          { catCode: '-1', catName: '全部' },
          { catCode: 0, catName: '场内维修' },
          { catCode: 1, catName: '托外维修' },
        ],
        id: 'repairMode'
      },
      {
        label: '时间范围',
        type: 'RangePicker',
        id: 'date',
        dateKeyNames: ['startDate', 'endDate'],
      },
      {
        label: '状态',
        type: 'Select',
        enums: [
          { catCode: '-1', catName: '全部' },
          { catCode: 0, catName: '申请维修' },
          { catCode: 1, catName: '已修复' },
          { catCode: 2, catName: '维修中' },
          { catCode: 3, catName: '无法修复' },
        ],
        id: 'repairStatus'
      },

    ];
    const { tableLoading, listData, current } = this.props.maintenanceWorkModel;
    return (
      <div className="maintenanceWork tabHeight">
        <div className="baseListStyle">
          <div className="headDiv">
            <SearchMore
              searchItems={searchItems}
              onSearch={e => this.handleSearchForm(e)}
              onReset={() => this.handleSearchForm({})}
            />
          </div>
          <div className="addRowBtn">
            <Button type="primary" onClick={this.add}><Icon type="plus" />新建</Button>
          </div>

          <Table
            rowKey={'code'}
            loading={tableLoading}
            columns={columns}
            pagination={false}
            dataSource={listData.list}
            width={'100%'}
            height={'100%'}
          />

          <FooterPagination total={listData.total ? listData.total : 0} current={current} pageChange={this.pageChange} />

        </div>

      </div>

    )
  }

}
export default MaintenanceWork