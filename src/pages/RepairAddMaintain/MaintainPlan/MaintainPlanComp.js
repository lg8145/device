import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Tag } from 'antd';
import Components from '../../../base/components'
import { ReqApi, Urls, UserInfo } from '../../../base/common';

const { SearchMore, FooterPagination, DeleteModal } = Components;

@connect(state => ({ maintainPlanModel: state.maintainPlanModel, addmaintainPlanModel: state.addmaintainPlanModel, planassociatedDeviceModel: state.planassociatedDeviceModel }))
class MaintainPlanComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,//弹框
      detail: {},
      title: '',
      id: ''
    }
    this.tableColumns = [
      {
        title: '保养计划名称',
        dataIndex: 'maintenancePlanName',
        key: 'maintenancePlanName'
      },
      {
        title: '描述',
        dataIndex: 'maintenancePlanDescribe',
        key: 'maintenancePlanDescribe',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        title: '操作',
        dataIndex: 'cz',
        key: 'cz',
        fixed: 'right',
        width: 250,
        render: (value, row, index) => {
          return (
            <div className="table-click">
              <a style={{ marginRight: 10 }} onClick={() => this.openModal(row, 'update')}>编辑</a>
              <DeleteModal deleteOk={() => this.deleteRow(row, index)}><a className="manage">删除</a></DeleteModal>
              <a onClick={() => this.onAssociatedDevice(row, index)} className="manage">关联设备</a>
            </div>
          )
        }
      }
    ];
  }

  componentDidMount() {
    this.props.dispatch({ type: 'maintainPlanModel/getTableList' })
    this.props.dispatch({ type: 'maintainPlanModel/watchChange' })
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'maintainPlanModel/resetData' })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'maintainPlanModel/setCurrent', payload: e })
  }
  onCancel = () => {
    this.setState({
      detail: {},
      visible: false
    })
  }
  //关联点检设备
  onAssociatedDevice = (record) => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'maintainPlan', targetPath: 'planassociatedDevice' })
    this.props.dispatch({ type: 'planassociatedDeviceModel/setDetail', payload: record })
    // this.props.dispatch({ type: 'planassociatedDeviceModel/getTableList', payload: record })
  }
  //编辑
  openModal = (record) => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'maintainPlan', targetPath: 'editmaintainPlan' })
    this.props.dispatch({ type: 'addmaintainPlanModel/setDetail', payload: record })
    this.props.dispatch({ type: 'addmaintainPlanModel/getDetailList', payload: record })
  }
  //删除
  deleteRow = (record) => {
    return ReqApi.post({
      url: Urls.MaintenancePlan_logicDelMaintenancePlan,
      pm: { maintenancePlanCode: record.maintenancePlanCode }
    }).then((data) => {
      message.success('删除成功')
      this.props.dispatch({ type: 'maintainPlanModel/getTableList' })
    })
  }
  //新建
  addRow = () => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'maintainPlan', targetPath: 'addmaintainPlan' })
  }
  render() {
    const { tableLoading, listData, current } = this.props.maintainPlanModel;
    return (
      <div className="baseListStyle tabHeight">
        <div className="addRowBtn">
          <Button type="primary" onClick={this.addRow}><Icon type="plus" />新建</Button>
        </div>
        <Table
          rowKey={'id'}
          loading={tableLoading}
          columns={this.tableColumns}
          pagination={false}
          dataSource={listData.list}
          width={'100%'}
        />
        <FooterPagination total={listData.total ? listData.total : 0} current={current} pageChange={this.pageChange} />
      </div>
    )
  }
}

export default MaintainPlanComp;
