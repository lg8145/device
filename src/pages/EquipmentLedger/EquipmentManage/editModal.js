import React, { PureComponent } from 'react';
import { Tabs, Table, Radio, Divider, Form, Row, Col, Input, DatePicker, Select, Modal, Button } from 'antd';
import Components from '../../../base/components';
import moment from 'moment';
import ChoiceDevice from '../../RepairAddMaintain/maintenanceWork/checkChoose'
import validate from '../../../base/common/ValidateList';
const { Option } = Select;
const { FooterPagination, IconFont } = Components;
const { TabPane } = Tabs;
class EditModal extends PureComponent{
  constructor(props){
      super(props)
      this.state={
          showChoose:false,
          detail:props.detail,
          deviceCode:''
      }
  }
  onSubmit = (e) => {
      e.preventDefault()
      this.props.form.validateFieldsAndScroll((err, values) => {
          if (err) {
          return
          }
          values.deviceCode=this.state.deviceCode
          values = Object.assign({}, this.props.detail, values);
          this.props.onSubmit(values)

      })
  }
  handleCancel=()=>{
      this.setState({showChoose:false})
  }
  choose=()=>{
      this.setState({showChoose:true})
  }
  addData=(val)=>{
      let data=this.props.detail;
      data.deviceName=val.name;
      this.props.form.setFieldsValue({deviceName:val.name})
      this.setState({
          detail:data,
          deviceCode:val.code
      })
  }
  render(){
      const { getFieldDecorator } = this.props.form;
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
      const { detail } = this.state;
      return (
          <Modal
              title={this.props.title}
              visible={true}
              onCancel={this.props.onCancel}
              width={781}
              className="addEquipmentSpare baseModal"
              footer={[
                <Button key="1" onClick={this.props.onCancel}>取消</Button>,
                <Button key="2" onClick={this.onSubmit} type="primary">提交</Button>
              ]}
              >
              <div>
                  <Form>
                      <Row>
                          <Col span={12}>
                              <Form.Item {...formItemLayout} label="备件编号">
                                  {getFieldDecorator('code', {
                                      rules: [{ required: true, message: '请输入备件编号' },
                                      validate({type: 'deviceCode'}),{max:20,message:'最多20位字符'}],
                                      initialValue:detail.code?detail.code:''
                                  })(
                                      <Input placeholder="请输入" disabled={detail.code && true} />
                                  )}
                              </Form.Item>
                          </Col>
                          <Col span={12}>
                              <Form.Item {...formItemLayout} label="备件名称">
                                  {getFieldDecorator('name', {
                                      rules: [{ required: true,message: '请输入备件名称' },{max:20,message:'最多20位字符'}],
                                      initialValue:detail.name?detail.name:''
                                  })(
                                      <Input key="name" placeholder="请输入"/>
                                  )}
                              </Form.Item>
                          </Col>
                      </Row>
                      <Row>
                          <Col span={12}>
                              <Form.Item {...formItemLayout} label="规格型号">
                                  {getFieldDecorator('model', {
                                      rules: [{max:50,message: '最多50位字符' }],
                                      initialValue:detail.model ?detail.model:""
                                  })(
                                      <Input key="model" placeholder="请输入" />
                                  )}
                              </Form.Item>
                          </Col>
                          <Col span={12}>
                              <Form.Item {...formItemLayout} label="生产厂商">
                                  {getFieldDecorator('manufacturer', {
                                      rules: [{max:50,message: '最多50位字符' }],
                                      initialValue:detail.manufacturer?detail.manufacturer:''
                                  })(
                                      <Input key="manufacturer" placeholder="请输入" />
                                  )}
                              </Form.Item>
                          </Col>
                      </Row>
                      <Row>
                          <Col span={12}>
                              <Form.Item {...formItemLayout} label="关联设备">
                                  {getFieldDecorator('deviceCode', {
                                      initialValue:detail.deviceName?detail.deviceName:''
                                  })(
                                      <Input onClick={()=>this.choose()} readOnly="readOnly" suffix={ <IconFont type="icongonggongxuanzedankuang" onClick={()=>this.choose()}/>} />
                                  )}
                              </Form.Item>
                          </Col>
                          <Col span={12}>
                              <Form.Item {...formItemLayout} label="状态">
                                  {getFieldDecorator('status', {
                                      initialValue:detail.status?detail.status:0
                                  })(
                                      <Select>
                                          <Option value={0}>未使用</Option>
                                          <Option value={1}>已使用</Option>
                                          <Option value={2}>已报废</Option>
                                      </Select>
                                  )}
                              </Form.Item>
                          </Col>
                      </Row>
                  </Form>
              </div>
              <Modal
                  title='选择设备'
                  visible={this.state.showChoose}
                  footer={null}
                  width="40%"
                  onCancel={this.handleCancel}
                  className="baseTableModal"
                  >
                 <ChoiceDevice addData={this.addData} handleCancel={this.handleCancel}/>
              </Modal>
          </Modal> 
      )
  }
}
export default Form.create()(EditModal)
