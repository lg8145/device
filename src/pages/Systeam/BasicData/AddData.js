import React, { PureComponent } from 'react';
import { Tabs, Table, Radio, Divider, Form, Row, Col, Input, DatePicker, Select, Modal, Button } from 'antd';
import Components from '../../../base/components';
const { TextArea } = Input;
const { Option } = Select;
class EditModal extends PureComponent {
  constructor(props) {
    super(props)
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      values = Object.assign({}, this.props.detail, values);
      this.props.onSubmit(values, this.props.tableData)

    })
  }
  render() {
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
    const { detail, index } = this.props;
    return (
      <Modal
        title={this.props.title}
        visible={true}
        onCancel={this.props.onCancel}
        width={446}
        className="addEquipmentSpare edit-modal baseListStyle"
        footer={[
          <Button key="1" onClick={this.props.onCancel}>取消</Button>,
          <Button key="2" onClick={this.onSubmit} type="primary">提交</Button>
        ]}
      >
        <div>
          <Form>
            <Row>
              <Col span={24}>
                <Form.Item {...formItemLayout} label="名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入名称' }, { max: 20, message: '最多20字符' }],
                    initialValue: detail.name || ''
                  })(
                    <Input placeholder="请输入" style={{ width: 294 }} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            {index == 1 &&
              <Row>
                <Col span={24}>
                  <Form.Item {...formItemLayout} label="计量单位">
                    {getFieldDecorator('unitMeasure', {
                      rules: [{ required: true, message: '请输入计量单位' }, { max: 20, message: '最多20字符' }],
                      initialValue: detail.unitMeasure || ''
                    })(
                      <Input placeholder="请输入" style={{ width: 294 }}/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            }
            {index == 1 &&
              <Row>
                <Col span={24}>
                  <Form.Item {...formItemLayout} label="关联字段">
                    {getFieldDecorator('influxdbColumn', {
                      rules: [{ max: 20, message: '最多20字符' }],
                      initialValue: detail.influxdbColumn || ''
                    })(
                      <Input placeholder="请输入" style={{ width: 294 }}/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            }
            <Row>
              <Col span={24}>
                <Form.Item {...formItemLayout} label="描述">
                  {getFieldDecorator('systemDescribe', {
                    rules: [{ max: 100, message: '最多100个字符' }],
                    initialValue: detail.systemDescribe ? detail.systemDescribe : ''
                  })(
                    <TextArea rows={2} placeholder="请输入" style={{ width: 294 }}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    )
  }
}
export default Form.create()(EditModal)
