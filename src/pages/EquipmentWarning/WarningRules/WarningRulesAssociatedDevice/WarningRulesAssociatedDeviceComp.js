import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Form, Input, Table, Button, message, Icon } from 'antd';
import { IconFont } from '../../../../base/components/IconFont';
import Validate from '../../../../base/common/ValidateList';
import Components from '../../../../base/components';
import { ReqApi, Urls, UserInfo } from '../../../../base/common';
import AssociatedDeviceModal from './AssociatedDeviceModal'
import './index.scss'
const { DeleteModal } = Components;
@connect(state => ({ warningRulesassociatedDeviceModel: state.warningRulesassociatedDeviceModel, global: state.global }))
class WarningRulesAssociatedDeviceComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.columns = [
      {
        title: '设备编号',
        dataIndex: 'code',
        width: 150,
      },
      {
        title: '设备名称',
        dataIndex: 'name',
        width: 250,
      }, {
        title: '设备类别',
        dataIndex: 'categoryName',
        width: 250,
      }, {
        title: '设备型号',
        dataIndex: 'model',
        width: 400,
      }, {
        title: '生产厂商',
        dataIndex: 'manufacturer',
        width: 400,
      }, {
        title: '操作',
        width: 130,
        render: (text, record, index) =>
          <a onClick={() => this.deleteCol(record, index)}>删除</a>
      },]
  }
  componentDidMount() {
    // this.props.dispatch({ type: 'warningRulesassociatedDeviceModel/getTableList' })
  }
  componentWillUnmount() {
  }
  goBack = () => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'warningRulesDevice', targetPath: 'warningRules' })
  }
  save = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      const { tabTrans } = this.props.global;
      let { associatedDeviceData } = this.props.warningRulesassociatedDeviceModel
      let deviceCode = [], newStr = {};
      associatedDeviceData.map(item => deviceCode.push(item.code))
      newStr = deviceCode.toString()
      values = Object.assign({}, { earlyWarningRulesCode: tabTrans.detail.code }, values, { deviceCode: newStr })
      return ReqApi.post({
        url: Urls.SpotCheckTemplate_saveRelationDevice,
        pm: values
      }).then((data) => {
        message.success('保存成功')
        this.props.dispatch({ type: 'spotCheckTemplateModel/getTableList' })
        this.props.dispatch({ type: 'global/addRemoveTabs', path: 'warningRulesDevice', targetPath: 'warningRules' })
        this.props.form.resetFields()
      })
    })
  }
  deleteCol = (record, index) => {
    let _arr = this.props.warningRulesassociatedDeviceModel.associatedDeviceData
    _arr.splice(index, 1)
    this.props.dispatch({ type: 'warningRulesassociatedDeviceModel/setAssociatedDeviceData', payload: _arr })
  }
  addCol = () => {
    this.props.dispatch({ type: 'warningRulesassociatedDeviceModel/getDeviceAlllist' })
    this.setState({ visible: true })
  }
  deleteAll = () => {
    let { selectedRowsDevice, associatedDeviceData } = this.props.warningRulesassociatedDeviceModel
    let array = associatedDeviceData;
    selectedRowsDevice.map((i, index) => {
      array = array.filter(item => item.code != i.code)
    })
    this.props.dispatch({ type: 'warningRulesassociatedDeviceModel/setAssociatedDeviceData', payload: array })
  }
  onCancel = () => {
    this.setState({ visible: false })
  }
  handleChangeRow = (item, value, index) => {
    this.props.dispatch({ type: 'addspotCheckTemplateModel/handleChangeRow', payload: { item, value, index } })
  }
  onChange = (selectedRowKeys, selectedRows) => {
    this.props.dispatch({ type: 'warningRulesassociatedDeviceModel/setSelectedRowsDevice', payload: { selectedRowKeys, selectedRows } })
  }
  render() {
    const { associatedDeviceData } = this.props.warningRulesassociatedDeviceModel;
    const { tabTrans } = this.props.global;
    const { visible } = this.state
    const rowSelection = {
      type: 'checkbox',
      onChange: (selectedRowKeys, selectedRows) => this.onChange(selectedRowKeys, selectedRows)
    };
    return (
      <div className="AssociatedDeviceComp baseListStyle">
        <div className="header">
          <div onClick={this.goBack} className="back"><i className="devicefont iconfanhui" /></div>
          <div>
            <div className="headerCon"><span className="title">{tabTrans.detail.name}</span>
            </div>
          </div>
        </div>
        <div className="warp">
          <div className="addRowBtn" >
            <Button onClick={this.addCol}>添加行</Button>
            <Button type="danger" onClick={this.deleteAll}>删除</Button>
          </div>
          <Table
            rowKey={'code'}
            columns={this.columns}
            pagination={false}
            dataSource={associatedDeviceData || []}
            rowSelection={rowSelection}
          />
          <div className="addApply">
            <Button onClick={this.goBack}>取消</Button>
            <Button type="primary" onClick={this.save}>提交</Button>
          </div>
        </div>
        {visible && <AssociatedDeviceModal onCancel={this.onCancel} />}
      </div>
    )
  }
}
export default Form.create()(WarningRulesAssociatedDeviceComp)
