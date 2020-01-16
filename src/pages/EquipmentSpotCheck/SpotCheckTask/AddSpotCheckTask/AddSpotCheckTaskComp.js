import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Form, Input, Table, Button, message, DatePicker, Select, Checkbox } from 'antd';
import { IconFont } from '../../../../base/components/IconFont';
import Validate from '../../../../base/common/ValidateList';
import Components from '../../../../base/components';
import { ReqApi, Urls, UserInfo } from '../../../../base/common';
import MainteUser from '../../../RepairAddMaintain/maintenanceWork/mainteUser'
import './index.scss'
import moment from 'moment';
const { Option } = Select;
const { DeleteModal } = Components;
@connect(state => ({ addspotCheckTaskModel: state.addspotCheckTaskModel }))
class AddSpotCheckTaskComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showUser: false,
      detail: {},
      requiredShow: false,
      isApply: false
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  goBack = () => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addSpotCheckTask', targetPath: 'spotCheckTask' })
  }
  save = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      values.spotCheckTime = values.spotCheckTime.format('YYYY-MM-DD')
      values = Object.assign({}, this.props.addspotCheckTaskModel.detail, this.state.detail, values, { isRepair: this.state.isApply ? 1 : 0 }, { detail: this.props.addspotCheckTaskModel.addSpotCheckTaskData.detail })
      return ReqApi.post({
        url: Urls.SpotCheckTask_save,
        pm: values
      }).then((data) => {
        message.success('保存成功')
        this.props.dispatch({ type: 'addspotCheckTaskModel/setCheckDeviceDetail', payload: {} })
        // this.props.dispatch({ type: 'spotCheckTaskModel/getTableList' })
        this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addSpotCheckTask', targetPath: 'spotCheckTask' })
        this.props.form.resetFields()
      })
    })
  }
  handleCancel = () => {
    this.setState({ showUser: false })
  }
  addUser = (val) => {
    let data = this.state.detail;
    data.spotCheckByName = val.username;
    data.spotCheckBy = val.userId
    this.props.form.setFieldsValue({ spotCheckByName: val.username })
    this.setState({ detail: data })
  }
  chooseUser = () => {
    this.setState({ showUser: true })
  }
  handleChangeRow = (item, value, index) => {
    this.props.dispatch({ type: 'addspotCheckTaskModel/handleChangeRow', payload: { item, value, index } })
  }
  onChangeCheck = (key) => {
    if (key == 0) {
      this.setState({ requiredShow: false })
    } else {
      this.setState({ requiredShow: true })
    }

  }
  onChangeApply = () => {
    this.setState({ isApply: !this.state.isApply })
  }
  render() {
    const { addTableList, checkDeviceDetail, addSpotCheckTaskData } = this.props.addspotCheckTaskModel;
    const { detail, requiredShow, isApply } = this.state
    const { getFieldsError, getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    let columns = [
      {
        title: '行号',
        dataIndex: 'lineNo',
        width: 150,
        render: (text, record, index) => (index + 1),
      },
      {
        title: '点检项',
        dataIndex: 'checkItem',
        width: 250,
      }, {
        title: '点检方法',
        dataIndex: 'checkMethod',
        width: 250,
      }, {
        title: '点检结果',
        dataIndex: 'spotcheckDetailResult',
        width: 250,
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`spotcheckDetailResult_${record.id}`, {
              rules: [{ required: true, message: '请选择点检结果' }],
              initialValue: record.spotcheckDetailResult + '' || '',
            })(
              <Select>
                <Option value="0">合格</Option>
                <Option value="1">不合格</Option>
              </Select>
            )}
          </Form.Item>
      }, {
        title: '描述',
        dataIndex: 'spotcheckDetailDescribe',
        width: 400,
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`spotcheckDetailDescribe_${record.id}`, {
              initialValue: record.spotcheckDetailDescribe || '',
              rules: [{ max: 100, message: '最多100字符!' }],
            })(
              <Input style={{ width: 300 }}
                placeholder="请输入"
                onChange={e => this.handleChangeRow('spotcheckDetailDescribe', e.target.value, index)}
              />
            )}
          </Form.Item>
      }]
    return (
      <div className="AddSpotCheckTask baseListStyle">
        <div className="header">
          <div onClick={this.goBack} className="back"><i className="devicefont iconfanhui" /></div>
          <div>
            <div className="headerCon"><span className="title">设备点检单</span>
            </div>
          </div>
        </div>
        <div className="warp">
          <Form className="formDiv">
            <Row className="formDivTop">
              <Col span={8}>
                <Form.Item {...formItemLayout} label="设备编号">
                  {getFieldDecorator('deviceCode', {
                    initialValue: addSpotCheckTaskData.deviceCode || ''
                  })(
                    <span>{addSpotCheckTaskData.deviceCode}</span>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="设备名称">
                  {getFieldDecorator('deviceName', {
                    initialValue: addSpotCheckTaskData.deviceName || ''
                  })(
                    <span>{addSpotCheckTaskData.deviceName}</span>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="点检日期">
                  {getFieldDecorator('spotCheckTime', {
                    rules: [{ required: true, message: '请选择点检日期' }],
                    initialValue: moment()
                  })(
                    <DatePicker style={{ width: 272 }} />
                  )}
                </Form.Item>
              </Col>
              {/* <Col span={8}>
                <Form.Item {...formItemLayout} label="点检人">
                  {getFieldDecorator('spotCheckByName', {
                    rules: [{ required: true, message: '请选择点检人' }],
                    initialValue: detail.spotCheckByName || ''
                  })(
                    <Input style={{ width: '272px' }} readOnly placeholder="请输入" suffix={<IconFont type="icongonggongxuanzedankuang" onClick={() => this.chooseUser()} />} />
                  )}
                </Form.Item>
              </Col> */}
            </Row>
            <div className="result" >点检结果</div>
            <Table
              rowKey={'id'}
              columns={columns}
              pagination={false}
              dataSource={addSpotCheckTaskData.detail || []}
            />
            <div className="bottomDiv">
              <Row>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="点检结果">
                    {getFieldDecorator('spotResult', {
                      rules: [{ required: true, message: '请选择点检结果' }],
                      initialValue: ''
                    })(
                      <Select onSelect={this.onChangeCheck}>
                        <Option value="0">合格</Option>
                        <Option value="1">不合格</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                {
                  requiredShow && <Col span={8} style={{ paddingLeft: 10, marginTop: 18 }}>
                    <Checkbox checked={isApply} onChange={this.onChangeApply}>申请设备维修</Checkbox>
                    {/* <Form.Item {...formItemLayout}>
                      {getFieldDecorator('spotResult', {
                        initialValue: ''
                      })(
                        <Checkbox checked={isApply} onChange={this.onChangeApply}>申请设备维修</Checkbox>
                      )}
                    </Form.Item> */}
                  </Col>
                }
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item {...formItemLayout} label="故障现象描述">
                    {getFieldDecorator('faultDescription', {
                      rules: [{ required: requiredShow, message: '请输入故障现象描述' }],
                      initialValue: ''
                    })(
                      <Input.TextArea placeholder="请输入" />
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
        <Modal
          title='选择点检人'
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
export default Form.create()(AddSpotCheckTaskComp)
