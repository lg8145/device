import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Form, Input, Table, Button, message, Icon } from 'antd';
import { IconFont } from '../../../../base/components/IconFont';
import Validate from '../../../../base/common/ValidateList';
import Components from '../../../../base/components';
import { ReqApi, Urls, UserInfo } from '../../../../base/common';
import './index.scss'
const { DeleteModal } = Components;
@connect(state => ({ addmaintainPlanModel: state.addmaintainPlanModel }))
class AddMaintainPlanComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'addmaintainPlanModel/resetData' })
  }
  goBack = () => {
    const { detail } = this.props.addmaintainPlanModel
    if (detail.id) {
      this.props.dispatch({ type: 'global/addRemoveTabs', path: 'editmaintainPlan', targetPath: 'maintainPlan' })
    } else {
      this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addmaintainPlan', targetPath: 'maintainPlan' })
    }

  }
  save = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      if (this.props.addmaintainPlanModel.addTableList.length == 0) {
        message.error('明细行不能为空！');
        return false
      }
      this.props.addmaintainPlanModel.addTableList.map(item => delete item.updateDate)
      values = Object.assign({}, this.props.addmaintainPlanModel.detail, values, { detail: this.props.addmaintainPlanModel.addTableList })
      if (values.id) {//编辑
        return ReqApi.post({
          url: Urls.MaintenancePlan_update,
          pm: values
        }).then((data) => {
          message.success('编辑成功')
          this.props.dispatch({ type: 'addmaintainPlanModel/setDetail', payload: {} })
          this.props.dispatch({ type: 'spotCheckTemplateModel/getTableList' })
          this.props.dispatch({ type: 'global/addRemoveTabs', path: 'editmaintainPlan', targetPath: 'maintainPlan' })
          this.props.form.resetFields()
        })
      } else {//新增
        return ReqApi.post({
          url: Urls.MaintenancePlan_save,
          pm: values
        }).then((data) => {
          message.success('保存成功')
          this.props.dispatch({ type: 'addmaintainPlanModel/setDetail', payload: {} })
          this.props.dispatch({ type: 'addmaintainPlanModel/getTableList' })
          this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addmaintainPlan', targetPath: 'maintainPlan' })
          this.props.form.resetFields()
        })
      }
    })
  }
  deleteCol = (record, index) => {
    let _arr = this.props.addmaintainPlanModel.addTableList
    _arr.splice(index, 1)
    this.props.dispatch({ type: 'addmaintainPlanModel/setDeleteCol', payload: _arr })
  }
  addCol = () => {
    let { addTableList, id } = this.props.addmaintainPlanModel;
    // 最多新增三十行记录
    if (addTableList.length < 30) {
      addTableList.push({
        id,
        maintenanceItem: '',
        maintenanceMethod: '',
        maintenanceStandard: '',
      })
      id++
      this.props.dispatch({ type: 'addmaintainPlanModel/setAddTableList', payload: addTableList })
      this.props.dispatch({ type: 'addmaintainPlanModel/setId', payload: id })
    } else {
      message.warning('最多只能存在三十行记录！')
    }
  }
  handleChangeRow = (item, value, index) => {
    this.props.dispatch({ type: 'addmaintainPlanModel/handleChangeRow', payload: { item, value, index } })
  }
  render() {
    const { addTableList, detail } = this.props.addmaintainPlanModel;
    const { getFieldsError, getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 20 },
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
        title: '保养项目',
        dataIndex: 'maintenanceItem',
        width: 250,
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`maintenanceItem_${record.id}`, {
              initialValue: record.maintenanceItem || '',
              rules: [{ required: true, message: '请输入保养项目' }, { max: 50, message: '最多50字符!' }],
            })(
              <Input style={{ width: 200,height:26 }}
                placeholder="请输入"
                onChange={e => this.handleChangeRow('maintenanceItem', e.target.value, index)}
              />
            )}
          </Form.Item>
      }, {
        title: '保养方法',
        dataIndex: 'maintenanceMethod',
        width: 250,
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`maintenanceMethod_${record.id}`, {
              initialValue: record.maintenanceMethod || '',
              rules: [{ required: true, message: '请输入保养方法' }, { max: 50, message: '最多50字符!' }],
            })(
              <Input style={{ width: 200,height:26 }}
                placeholder="请输入"
                onChange={e => this.handleChangeRow('maintenanceMethod', e.target.value, index)}
              />
            )}
          </Form.Item>
      }, {
        title: '保养标准',
        dataIndex: 'maintenanceStandard',
        width: 400,
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`maintenanceStandard_${record.id}`, {
              initialValue: record.maintenanceStandard || '',
              rules: [{ required: true, message: '请输入保养标准' }, { max: 100, message: '最多100字符!' }],
            })(
              <Input style={{ width: 300,height:26 }}
                placeholder="请输入"
                onChange={e => this.handleChangeRow('maintenanceStandard', e.target.value, index)}
              />
            )}
          </Form.Item>
      }, {
        title: '操作',
        width: 130,
        render: (text, record, index) =>
          <a onClick={() => this.deleteCol(record, index)}>删除</a>
      },]
    return (
      <div className="AddMaintainPlan baseListStyle">
        <div className="header">
          <div onClick={this.goBack} className="back"><i className="devicefont iconfanhui" /></div>
          <div>
            <div className="headerCon"><span className="title">{detail.id ? '编辑保养计划' : '新建保养计划'}</span>
            </div>
          </div>
        </div>
        <div className="warp">
          <Form className="formDiv" style={{ paddingRight: 30 }}>
            <Row>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="保养计划名称">
                  {getFieldDecorator('maintenancePlanName', {
                    rules: [{ required: true, message: '请输入保养计划名称' },
                    { max: 20, message: '最多20个字符' }],
                    initialValue: detail.maintenancePlanName || ''
                  })(
                    <Input key="maintenancePlanName" placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item {...formItemLayout} label="描述">
                  {getFieldDecorator('maintenancePlanDescribe', {
                    rules: [{ max: 100, message: '最多100个字符' }],
                    initialValue: detail.maintenancePlanDescribe || ''
                  })(
                    <Input key="maintenancePlanDescribe" placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className="addRowBtn" >
            <Button onClick={this.addCol} ><Icon type="plus" style={{ fontSize: 11 }} />添加行</Button>
          </div>
          <Table
            rowKey={'id'}
            columns={columns}
            pagination={false}
            dataSource={addTableList || []}
          />
          <div className="addApply">
            <Button onClick={this.goBack}>取消</Button>
            <Button type="primary" onClick={this.save}>提交</Button>
          </div>
        </div>

      </div>
    )
  }
}
export default Form.create()(AddMaintainPlanComp)
