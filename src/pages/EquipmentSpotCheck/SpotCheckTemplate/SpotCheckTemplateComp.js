import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Tag } from 'antd';
import Components from '../../../base/components'
import { ReqApi, Urls, UserInfo } from '../../../base/common';

const { SearchMore, FooterPagination, DeleteModal } = Components;

@connect(state => ({ spotCheckTemplateModel: state.spotCheckTemplateModel, addspotCheckTemplateModel: state.addspotCheckTemplateModel, associatedDeviceModel: state.associatedDeviceModel }))
class SpotCheckTemplateComp extends PureComponent {
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
        title: '模板编号',
        dataIndex: 'templateCode',
        key: 'templateCode'
      },
      {
        title: '模板名称',
        dataIndex: 'templateName',
        key: 'templateName'
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
    this.props.dispatch({ type: 'spotCheckTemplateModel/getTableList' })
    this.props.dispatch({ type: 'spotCheckTemplateModel/watchChange' })
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'spotCheckTemplateModel/resetData' })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'spotCheckTemplateModel/setCurrent', payload: e })
  }
  onCancel = () => {
    this.setState({
      detail: {},
      visible: false
    })
  }
  //关联点检设备
  onAssociatedDevice = (record) => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'spotCheckTemplate', targetPath: 'associatedDevice' })
    this.props.dispatch({ type: 'associatedDeviceModel/setDetail', payload: record })
    this.props.dispatch({ type: 'associatedDeviceModel/getTableList', payload: record })
  }
  openModal = (record) => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'spotCheckTemplate', targetPath: 'editSpotCheckTemplate' })
    this.props.dispatch({ type: 'addspotCheckTemplateModel/setDetail', payload: record })
    this.props.dispatch({ type: 'addspotCheckTemplateModel/getDetailList', payload: record })
  }
  deleteRow = (record) => {
    return ReqApi.post({
      url: Urls.SpotCheckTemplate_logicDel,
      pm: { templateCode: record.templateCode }
    }).then((data) => {
      message.success('删除成功')
      this.props.dispatch({ type: 'spotCheckTemplateModel/getTableList' })
    })
  }
  addRow = () => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'spotCheckTemplate', targetPath: 'addSpotCheckTemplate' })
  }
  render() {
    const { tableLoading, listData, current } = this.props.spotCheckTemplateModel;
    const { visible, detail } = this.state
    return (
      <div className="baseListStyle tabHeight">
        <div className="addRowBtn">
          <Button type="primary" onClick={this.addRow}><Icon type="plus" />新建模板</Button>
        </div>
        <Table
          rowKey={'templateCode'}
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

export default SpotCheckTemplateComp;
