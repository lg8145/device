import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Form, Input, Table, Button, message, DatePicker, Select } from 'antd';
import { IconFont } from '../../../base/components/IconFont';
import Validate from '../../../base/common/ValidateList';
import Components from '../../../base/components';
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import ChoiceDevice from './checkChoose'
import MainteUser from '../maintenanceWork/mainteUser'
import './index.scss'
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;
const { DeleteModal } = Components;
@connect(state => ({ repairApplyModel: state.repairApplyModel }))
class RepairApplyComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showChoose: false,
      showUser: false,
      detail: {}
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  save = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      values.applyRepairDate = values.applyRepairDate.format('YYYY-MM-DD')
      if (values.requestRepairDate) {
        values.requestRepairDate = values.requestRepairDate.format('YYYY-MM-DD')
      }
      if (values.requestRepairDate && values.requestRepairDate < values.applyRepairDate) {
        message.info('要求修复日期大于申请维修日期！')
        return false
      }
      values = Object.assign({}, this.props.repairApplyModel.detail, this.state.detail, values)
      return ReqApi.post({
        url: Urls.RepairRecordSkip_saveRepairApply,
        pm: values
      }).then((data) => {
        message.success('保存成功')
        this.props.dispatch({ type: 'global/addRemoveTabs', path: 'repairApply', targetPath: 'maintenanceWork' })
        this.props.form.resetFields()
      })
    })
  }
  choose = () => {
    this.setState({ showChoose: true })
  }
  addData = (val) => {
    this.setState({ detail: val, deviceCode: val.code })
    this.props.form.setFieldsValue({ deviceCode: val.code, deviceName: val.name, model: val.model })
  }
  handleCancel = () => {
    this.setState({ showChoose: false, showUser: false })
  }
  addUser = (val) => {
    let data = this.state.detail;
    data.applyRepairByName = val.username;
    data.applyRepairBy = val.userId
    this.setState({ detail: data })
  }
  chooseUser = () => {
    this.setState({ showUser: true })
  }
  goBack = () => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'repairApply', targetPath: 'maintenanceWork' })
  }
  render() {
    // const { detail } = this.props.repairApplyModel;
    const { detail } = this.state
    const { getFieldsError, getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 16 },
      },
    };
    return (
      <div className="repairApply baseListStyle" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="header">
          <div className="headerCon"><span className="title">申请维修</span>
          </div>
        </div>
        <div className="warp">
          <Form>
            <div className="warp-detail">
              <Row>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="设备编号">
                    {getFieldDecorator('deviceCode', {
                      rules: [{ required: true, message: '请输入设备编号' }],
                      initialValue: detail.code || ''
                    })(
                      <Input style={{ width: 272 }} placeholder="请输入" readOnly suffix={<IconFont type="icongonggongxuanzedankuang" onClick={() => this.choose()} />} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="设备名称">
                    {getFieldDecorator('deviceName', {
                      initialValue: detail.name || ''
                    })(
                      <Input disabled={true} style={{ width: 272 }} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="设备型号">
                    {getFieldDecorator('model', {
                      initialValue: detail.model || ''
                    })(
                      <Input disabled={true} style={{ width: 272 }} />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="申请维修日期">
                    {getFieldDecorator('applyRepairDate', {
                      rules: [{ required: true, message: '请选择日期' }],
                      initialValue: moment()
                    })(
                      <DatePicker style={{ width: 272 }} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="要求维修日期">
                    {getFieldDecorator('requestRepairDate', {
                      // initialValue: moment()
                    })(
                      <DatePicker style={{ width: 272 }} allowClear={false} />
                    )}
                  </Form.Item>
                </Col>
                {/* <Col span={8}>
                  <Form.Item {...formItemLayout} label="申请维修人员">
                    {getFieldDecorator('applyRepairByName', {
                      rules: [{ required: true, message: '请选择维修人员' }],
                      initialValue: detail.applyRepairByName || ''
                    })(
                      <Input style={{ width: '272px' }} placeholder="请输入" suffix={<IconFont type="icongonggongxuanzedankuang" onClick={() => this.chooseUser()} />} />
                    )}
                  </Form.Item>
                </Col> */}
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item {...formItemLayout} label="故障现象描述">
                    {getFieldDecorator('faultDescribe', {
                      rules: [{ required: true, message: '请输入故障现象描述' }, { max: 200, message: '最多200个字符' }],
                      initialValue: ''
                    })(
                      <TextArea placeholder="请输入" />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
          <div className="addApply">
            <Button onClick={this.goBack}>取消</Button>
            <Button type="primary" onClick={this.save}>提交</Button>
          </div>
        </div>
        <div style={{ backgroundColor: '#fff', height: '100%' }}></div>
        <Modal
          title='选择设备'
          visible={this.state.showChoose}
          footer={null}
          width="40%"
          onCancel={this.handleCancel}
        >
          <ChoiceDevice addData={this.addData} handleCancel={this.handleCancel} />
        </Modal>
        <Modal
          title='选择维修人员'
          visible={this.state.showUser}
          footer={null}
          width="40%"
          onCancel={this.handleCancel}
        >
          <MainteUser addData={this.addUser} handleCancel={this.handleCancel} />
        </Modal>
      </div>
    )
  }
}
export default Form.create()(RepairApplyComp)
