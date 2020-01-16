import React, { PureComponent } from 'react';
import { Tabs, Table, Radio, Divider, Form, Row, Col, Input, Select, DatePicker, Modal, List, Button, message } from 'antd';
import Components from '../../../base/components';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;
import { ReqApi, Urls } from '../../../base/common';
const { FooterPagination, IconFont } = Components;
import ChoiceDevice from './checkChoose'
import MainteUser from './mainteUser'
const { TabPane } = Tabs;
import { connect } from 'dva'
@connect(state => ({ global: state.global }))
class AddWork extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showChoose: false,
      showUser: false,
      detail: props.global.tabTrans.detail
    }
  }
  showCreatePage = () => {
    this.props.global.activeKey == 'addWork' && this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addWork', targetPath: 'maintenanceWork' })
    this.props.global.activeKey == 'editWork' && this.props.dispatch({ type: 'global/addRemoveTabs', path: 'editWork', targetPath: 'maintenanceWork' })
  }
  //   componentDidMount(){
  //     this.props.global.activeKey=='editWork'&&this.props.dispatch({ type: 'maintenanceWorkModel/getCheckDetails', payload: {code:this.props.global.tabTrans.detail.code}})
  //     this.setState({detail:this.props.maintenanceWorkModel.detail})
  // }
  choose = () => {
    this.setState({ showChoose: true })
  }
  addData = (val) => {
    let data = this.state.detail;
    data.deviceCode = val.code
    data.deviceName = val.name;
    data.model = val.model;
    this.props.form.setFieldsValue({ deviceName: val.name })
    this.setState({ detail: data })
  }
  addUser = (val) => {
    let data = this.state.detail;
    data.repairBy = val.username;
    this.props.form.setFieldsValue({ repairByName: val.username })
    this.setState({ detail: data, userID: val.userId })
  }
  handleCancel = () => {
    this.setState({ showChoose: false, showUser: false })
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      let getDetail = {
        ...this.props.global.tabTrans.detail,
        ...values,
        repairDate: values.repairDate.format('YYYY-MM-DD')
      }

      return ReqApi.post({
        url: Urls.RepairRecordSkip_update,
        pm: getDetail
      }).then((data) => {
        message.success('提交成功')
        this.props.dispatch({ type: 'global/addRemoveTabs', path: 'editWork', targetPath: 'maintenanceWork' })
      })
    })
  }
  chooseUser = () => {
    this.setState({ showUser: true })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY-MM-DD';
    let date = new Date;
    const { tabTrans, activeKey } = this.props.global;
    const { detail } = this.state
    return (
      <div className="maintenanceWork">
        <Form >
          <List className="my-list">
            <List.Item>
              <div className="title-back">
                <div className="icon-back" onClick={() => this.showCreatePage()}> <i className="devicefont iconfanhui" /></div>
                <div className="title-span">
                  <span style={{ paddingLeft: 25 }}>设备维修单：<span style={{ marginRight: 10 }}>{detail.code || ''}</span></span>
                </div>
              </div>
            </List.Item>
            <div className="detailcon">
              <Row className="formContent">
                <Col span={8}>
                  <Form.Item label="设备编号:">
                    <span>{detail.deviceCode}</span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="设备名称:">
                    <span>{detail.deviceName}</span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="设备型号:">
                    <span>{detail.model}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="formContent">
                {/* <Col span={8}>
                  <Form.Item label="保修人员:">
                    <span>{detail.deviceCode}</span>
                  </Form.Item>
                </Col> */}
                <Col span={8}>
                  <Form.Item label="申请维修日期:">
                    <span>{detail.applyRepairDate}</span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="要求维修日期:">
                    <span>{detail.requestRepairDate}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="formContent">
                <Col span={8} style={{ paddingBottom: 20 }}>
                  <Form.Item label="故障现象描述:">
                    <span>{detail.deviceCode}</span>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <List.Item>
              <div className="secondTitle">
                <div className="iconBule" />
                <span>维修记录</span>
              </div>
            </List.Item>

            <List.Item>
              <Row className="formContent">
                <Col span={8}>
                  <Form.Item label="维修项目">
                    {getFieldDecorator('repairItem', {
                      rules: [{ required: true, message: '请输入维修项目' }, { max: 50, message: '最多50个字符' }],
                      initialValue: detail.repairItem ? detail.repairItem : ''
                    })(
                      <Input placeholder="请输入" />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </List.Item>
          </List>
          <Row className="formContent">
            <Col span={8}>
              <Form.Item label="故障时限">
                {getFieldDecorator('faultTimeLimit', {
                  rules: [{ required: true, message: '请选择故障时限' }],
                  initialValue: detail.faultTimeLimit ? detail.faultTimeLimit : 0
                })(
                  <Radio.Group>
                    <Radio value={0}>保修期 </Radio>
                    <Radio value={1}>保修期外</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className="formContent">
            <Col span={8}>
              <Form.Item label="维修方式">
                {getFieldDecorator('repairMode', {
                  rules: [{ required: true, message: '请选择维修方式' }],
                  initialValue: detail.repairMode ? detail.repairMode : 0
                })(
                  <Radio.Group>
                    <Radio value={0}>厂内维修</Radio>
                    <Radio value={1}>拖外维修</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className="formContent">
            <Col span={12} style={{ paddingLeft: 0 }}>
              <Form.Item label="原因分析">
                {getFieldDecorator('causeAnalysis', {
                  rules: [{ max: 200, message: '最多200个字符' }],
                  initialValue: detail.causeAnalysis ? detail.causeAnalysis : ''
                })(
                  <TextArea rows={2} placeholder="请输入" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className="formContent">
            <Col span={12} style={{ paddingLeft: 0 }}>
              <Form.Item label="处理方式">
                {getFieldDecorator('processMode', {
                  rules: [{ max: 200, message: '最多200个字符' }],
                  initialValue: detail.processMode ? detail.processMode : ''
                })(
                  <TextArea rows={2} placeholder="请输入" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className="formContent">
            <Col span={12} style={{ paddingLeft: 0 }}>
              <Form.Item label="预防方法">
                {getFieldDecorator('preventionMethod', {
                  rules: [{ max: 200, message: '最多200个字符' }],
                  initialValue: detail.preventionMethod ? detail.preventionMethod : ''
                })(
                  <TextArea rows={2} placeholder="请输入" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className="formContent">
            <Col span={4} style={{ paddingLeft: 31 }}>
              <Form.Item label="维修成本">
                {getFieldDecorator('repairCost', {
                  initialValue: detail.repairCost ? detail.repairCost : ''
                })(
                  <Input addonAfter="元" style={{ width: '100px' }} />
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="维修工时">
                {getFieldDecorator('repairHour', {
                  initialValue: detail.repairHour ? detail.repairHour : ''
                })(
                  <Input addonAfter="小时" style={{ width: '100px' }} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className="formContent">
            {/* <Col span={8}>
              <Form.Item label="维修人员">
                {getFieldDecorator('repairBy', {
                  rules: [{ required: true, message: '请选择维修人员' }],
                  initialValue: detail.repairBy ? detail.repairBy : ''
                })(
                  <Input style={{ width: '272px' }} placeholder="请输入" suffix={<IconFont type="icongonggongxuanzedankuang" onClick={() => this.chooseUser()} />} />
                )}
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item label="维修日期">
                {getFieldDecorator('repairDate', {
                  rules: [{ required: true, message: '请选择维修日期' }],
                  initialValue: detail.repairDate ? moment(detail.repairDate, dateFormat) : moment(new Date())
                })(
                  <DatePicker />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className="formContent">
            <Col span={8}>
              <Form.Item label="维修状态">
                {getFieldDecorator('repairStatus', {
                  rules: [{ required: true, message: '请选择维修状态' }],
                  initialValue: detail.repairStatus ? detail.repairStatus : ''
                })(
                  <Radio.Group>
                    <Radio value={2}>维修中</Radio>
                    <Radio value={1}>已修复</Radio>
                    <Radio value={3}>无法修复</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div style={{ height: 54 }}></div>
        <div className="footerPagination list-footer">
          <div>
            <Button style={{ marginRight: 10 }} onClick={() => this.showCreatePage()}>取消</Button>
            <Button type="primary" onClick={this.onSubmit}>确定</Button>
          </div>
        </div>
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
export default Form.create()(AddWork)