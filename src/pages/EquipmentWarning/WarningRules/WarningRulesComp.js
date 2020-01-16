import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Tag } from 'antd';
import Components from '../../../base/components'
import { ReqApi, Urls, UserInfo } from '../../../base/common';
// import CheckDeviceModal from './AddSpotCheckTask/CheckDeviceModal'

const { SearchMore, FooterPagination, DeleteModal } = Components;

@connect(state => ({ warningRulesModel: state.warningRulesModel, warningRulesassociatedDeviceModel: state.warningRulesassociatedDeviceModel }))
class WarningRulesComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.tableColumns = [
      {
        title: '预警规则名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '预警规则描述',
        dataIndex: 'warningRulesDescribe',
        key: 'warningRulesDescribe'
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
    this.props.dispatch({ type: 'warningRulesModel/getTableList' })
    this.props.dispatch({ type: 'warningRulesModel/watchChange' })
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'warningRulesModel/resetData' })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'warningRulesModel/setCurrent', payload: e })
  }
  //关联点检设备
  onAssociatedDevice = (detail) => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'warningRules', targetPath: 'warningRulesDevice',trans: { path: 'warningRulesDevice', detail } })
    this.props.dispatch({ type: 'warningRulesassociatedDeviceModel/getTableList', payload: detail })
  }
  //编辑
  openModal = (detail) => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'warningRules', targetPath: 'editWarningRules',trans: { path: 'editWarningRules', detail } })
    this.props.dispatch({ type: 'addwarningRulesModel/setDetail', payload: detail })
    this.props.dispatch({ type: 'addwarningRulesModel/getDetailList', payload: detail })
  }
  deleteRow = (record) => {
    return ReqApi.post({
      url: Urls.WarningRules_logicDelWarning,
      pm: { code: record.code }
    }).then((data) => {
      message.success('删除成功')
      this.props.dispatch({ type: 'warningRulesModel/getTableList' })
    })
  }
  addRow = () => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'warningRules', targetPath: 'addWarningRules' })
  }
  render() {
    const { tableLoading, listData, current } = this.props.warningRulesModel;
    return (
      <div className="baseListStyle tabHeight">
        <div className="addRowBtn">
          <Button type="primary" onClick={this.addRow}><Icon type="plus" />新建</Button>
        </div>
        <Table
          rowKey={'code'}
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

export default WarningRulesComp;
