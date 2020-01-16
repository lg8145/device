import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Form, Input, Table, Button, message, DatePicker, Select } from 'antd';
import { IconFont } from '../../../../base/components/IconFont';
import Validate from '../../../../base/common/ValidateList';
import Components from '../../../../base/components';
import { ReqApi, Urls, UserInfo } from '../../../../base/common';
import MainteUser from '../../maintenanceWork/mainteUser'
import './index.scss'
import moment from 'moment';
const { Option } = Select;
const { DeleteModal } = Components;
@connect(state => ({ addmaintainRecordModel: state.addmaintainRecordModel }))
class AddMaintainRecordComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showUser:false,
      detail:{}
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  goBack = () => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addmaintainRecord', targetPath: 'maintainRecord' })
  }
  save = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      values.maintenanceDate = values.maintenanceDate.format('YYYY-MM-DD')
      values = Object.assign({}, this.props.addmaintainRecordModel.detail,this.state.detail, values, { detail: this.props.addmaintainRecordModel.addMaintainRecordData.detail })
      // console.log('values--',values.detail)
      if(values.detail.length > 0){
        if(values.detail.some((item, index) =>item.maintenanceDescribe!=='')){
          // 
        } else {
          message.warning('保养记录的描述不能都为空！')
          return false
        }
      }
      //item.maintenanceDescribe
      return ReqApi.post({
        url: Urls.MaintenanceRecord_saveMaintenanceRecord,
        pm: values
      }).then((data) => {
        message.success('保存成功')
        this.props.dispatch({ type: 'addmaintainRecordModel/setCheckDeviceDetail', payload: {} })
        // this.props.dispatch({ type: 'spotCheckTaskModel/getTableList' })
        this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addmaintainRecord', targetPath: 'maintainRecord' })
        this.props.form.resetFields()
      })
    })
  }
  handleCancel = () => {
    this.setState({ showUser: false })
  }
  addUser = (val) => {
    let data = this.state.detail;
    data.maintenanceByName = val.username;
    data.maintenanceBy = val.userId
    this.props.form.setFieldsValue({maintenanceByName:val.username})
    this.setState({ detail: data })
  }
  chooseUser = () => {
    this.setState({ showUser: true })
  }
  handleChangeRow = (item, value, index) => {
    this.props.dispatch({ type: 'addmaintainRecordModel/handleChangeRow', payload: { item, value, index } })
  }
  render() {
    const { addTableList, checkDeviceDetail, addMaintainRecordData } = this.props.addmaintainRecordModel;
    const { getFieldsError, getFieldDecorator } = this.props.form;
    const {detail}=this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 18 },
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
        title: '保养项目',
        dataIndex: 'maintenanceItem',
        width: 250,
      }, {
        title: '保养方法',
        dataIndex: 'maintenanceMethod',
        width: 250,
      }, {
        title: '保养标准',
        dataIndex: 'maintenanceStandard',
        width: 250,
      }, {
        title: '描述',
        dataIndex: 'maintenanceDescribe',
        width: 400,
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`maintenanceDescribe_${record.id}`, {
              initialValue: record.maintenanceDescribe || '',
              rules: [{ max: 100, message: '最多100字符!' }],
            })(
              <Input style={{ width: 300 }}
                placeholder="请输入"
                onChange={e => this.handleChangeRow('maintenanceDescribe', e.target.value, index)}
              />
            )}
          </Form.Item>
      }]
    return (
      <div className="AddMaintainRecord baseListStyle">
        <div className="header">
          <div onClick={this.goBack} className="back"><i className="devicefont iconfanhui" /></div>
          <div>
            <div className="headerCon"><span className="title">设备保养单</span>
            </div>
          </div>
        </div>
        <div className="warp">
          <Form>
            <div className="warp-detail">
              <Row>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="设备编号">
                    {getFieldDecorator('deviceCode', {
                      initialValue: addMaintainRecordData.deviceCode || ''
                    })(
                      <span>{addMaintainRecordData.deviceCode}</span>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="设备名称">
                    {getFieldDecorator('deviceName', {
                      initialValue: addMaintainRecordData.deviceName || ''
                    })(
                      <span>{addMaintainRecordData.deviceName}</span>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="日期">
                    {getFieldDecorator('maintenanceDate', {
                      rules: [{ required: true, message: '请选择日期' }],
                      initialValue: moment()
                    })(
                      <DatePicker style={{ width: 272 }} />
                    )}
                  </Form.Item>
                </Col>
                {/* <Col span={8}>
                  <Form.Item {...formItemLayout} label="负责人">
                    {getFieldDecorator('maintenanceByName', {
                      rules: [{ required: true, message: '请选择负责人' }],
                      initialValue: detail.maintenanceByName || ''
                    })(
                      <Input style={{ width: '272px' }} readOnly placeholder="请输入" suffix={<IconFont type="icongonggongxuanzedankuang" onClick={() => this.chooseUser()} />} />
                    )}
                  </Form.Item>
                </Col> */}
              </Row>
              {/* <Row>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="日期">
                    {getFieldDecorator('maintenanceDate', {
                      rules: [{ required: true, message: '请选择日期' }],
                      initialValue: moment()
                    })(
                      <DatePicker style={{ width: 272 }} />
                    )}
                  </Form.Item>
                </Col>
              </Row> */}
            </div>
            <div className="secondTitle">
              <div className="iconBule" />
              <span>保养记录</span>
            </div>
            <Table
              rowKey={'id'}
              columns={columns}
              pagination={false}
              dataSource={addMaintainRecordData.detail || []}
            />
          </Form>
          <div className="addApply">
            <Button onClick={this.goBack}>取消</Button>
            <Button type="primary" onClick={this.save}>提交</Button>
          </div>
        </div>
        <Modal
          title='选择负责人'
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
export default Form.create()(AddMaintainRecordComp)
