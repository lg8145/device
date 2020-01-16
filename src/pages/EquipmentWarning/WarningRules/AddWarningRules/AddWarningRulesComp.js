import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select, Row, Col, Form, Input, Table, Button, message, Icon } from 'antd';
import { IconFont } from '../../../../base/components/IconFont';
import Validate from '../../../../base/common/ValidateList';
import { ReqApi, Urls } from '../../../../base/common';
import './index.scss'
const { Option } = Select;
@connect(state => ({ addwarningRulesModel: state.addwarningRulesModel, global: state.global }))
class AddWarningRulesComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detail: props.global.tabTrans.detail
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'addwarningRulesModel/getParamItemList' })
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'addwarningRulesModel/resetData' })
  }
  goBack = () => {
    const { detail } = this.props.addwarningRulesModel
    if (detail.code) {
      this.props.dispatch({ type: 'global/addRemoveTabs', path: 'editWarningRules', targetPath: 'warningRules' })
    } else {
      this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addWarningRules', targetPath: 'warningRules' })
    }

  }
  save = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      if (this.props.addwarningRulesModel.addTableList.length == 0) {
        message.error('明细行不能为空！');
        return false
      }
      this.props.addwarningRulesModel.addTableList.map(item => delete item.updateDate)
      values = Object.assign({}, this.props.addwarningRulesModel.detail, values, { warningRulesDetails: this.props.addwarningRulesModel.addTableList })
      if (values.code) {//编辑
        return ReqApi.post({
          url: Urls.WarningRules_update,
          pm: values
        }).then((data) => {
          message.success('编辑成功')
          this.props.dispatch({ type: 'addwarningRulesModel/setDetail', payload: {} })
          this.props.dispatch({ type: 'spotCheckTemplateModel/getTableList' })
          this.props.dispatch({ type: 'global/addRemoveTabs', path: 'editWarningRules', targetPath: 'warningRules' })
          this.props.form.resetFields()
        })
      } else {//新增
        return ReqApi.post({
          url: Urls.WarningRules_save,
          pm: values
        }).then((data) => {
          message.success('保存成功')
          this.props.dispatch({ type: 'addwarningRulesModel/setDetail', payload: {} })
          this.props.dispatch({ type: 'addwarningRulesModel/getTableList' })
          this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addWarningRules', targetPath: 'warningRules' })
          this.props.form.resetFields()
        })
      }
    })
  }
  deleteCol = (record, index) => {
    let _arr = this.props.addwarningRulesModel.addTableList
    _arr.splice(index, 1)
    this.props.dispatch({ type: 'addwarningRulesModel/setDeleteCol', payload: _arr })
  }
  addCol = () => {
    let { addTableList, id } = this.props.addwarningRulesModel;
    // 最多新增三十行记录
    if (addTableList.length < 30) {
      addTableList.push({
        id,
        paramItem: '',
        operator: '',
        numericalValue: '',
        earlyWarningTip: '',
        executionFrequency: ''
      })
      id++
      this.props.dispatch({ type: 'addwarningRulesModel/setAddTableList', payload: addTableList })
      this.props.dispatch({ type: 'addwarningRulesModel/setId', payload: id })
    } else {
      message.warning('最多只能存在三十行记录！')
    }
  }
  handleChangeRow = (item, value, index, option) => {
    this.props.dispatch({ type: 'addwarningRulesModel/handleChangeRow', payload: { item, value, index, option } })
  }

  render() {
    const { addTableList, paramItemList, detail } = this.props.addwarningRulesModel;
    const { tabTrans, activeKey } = this.props.global;
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
        // width: 100,
        render: (text, record, index) => (index + 1),
      },
      {
        title: '参数项',
        dataIndex: 'paramItem',
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`paramItem_${record.id}`, {
              initialValue: record.paramItem || '',
              rules: [{ required: true, message: '请选择参数项' }],
            })(
              <Select
                style={{ minWidth: 90 }}
                onChange={(value, option) => this.handleChangeRow('paramItem', value, index, option)}
              >
                {paramItemList.length > 0 && paramItemList.map((item, ind) => <Select.Option key={ind} value={item.code} data={item}>{item.name}</Select.Option>)}
              </Select>
            )}
          </Form.Item>
      }, {
        title: '运算符',
        dataIndex: 'operator',
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`operator_${record.id}`, {
              initialValue: record.operator + '' || '',
              rules: [{ required: true, message: '请选择运算符' }],
            })(
              <Select
                style={{ minWidth: 90 }}
                onChange={(value) => this.handleChangeRow('operator', value, index)}
              >
                <Select.Option value={'0'}>大于</Select.Option>
                <Select.Option value={'1'}>小于</Select.Option>
              </Select>
            )}
          </Form.Item>
      }, {
        title: '数值',
        dataIndex: 'numericalValue',
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`numericalValue_${record.id}`, {
              initialValue: record.numericalValue + '' || '',
              rules: [{ required: true, message: '请输入数值' }],
            })(
              <Input 
              // style={{ minWidth: 90 }}
                placeholder="请输入"
                onChange={e => this.handleChangeRow('numericalValue', e.target.value, index)}
              />
            )}
          </Form.Item>
      }, {
        title: '计量单位',
        dataIndex: 'unitMeasure',
        // width: 150,
      }, {
        title: '预警提示',
        dataIndex: 'earlyWarningTip',
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`earlyWarningTip_${record.id}`, {
              initialValue: record.earlyWarningTip || '',
              rules: [{ required: true, message: '请输入预警提示' }, { max: 100, message: '最多100字符!' }],
            })(
              <Input
                placeholder="请输入"
                onChange={e => this.handleChangeRow('earlyWarningTip', e.target.value, index)}
              />
            )}
          </Form.Item>
      }, {
        title: '预警执行频率',
        dataIndex: 'executionFrequency',
        className:'executionFrequencyCss',
        // width: 500,
        render: (text, record, index) =>
          <div>
            <div className="tableFrequency">每</div>
            <Form.Item className="tableFrequency0">
              {getFieldDecorator(`executionFrequency_${record.id}`, {
                initialValue: record.executionFrequency || '',
                rules: [{ required: true, message: '请选择预警执行频率' }],
              })(
                <Select style={{ width: 110,height:26,lineHeight:26 }}
                  onChange={value => this.handleChangeRow('executionFrequency', value, index)}
                >
                  <Select.Option value={5}>5分钟</Select.Option>
                  <Select.Option value={10}>10分钟</Select.Option>
                  <Select.Option value={15}>15分钟</Select.Option>
                  <Select.Option value={30}>30分钟</Select.Option>
                  <Select.Option value={60}>1小时</Select.Option>
                  <Select.Option value={120}>2小时</Select.Option>
                  <Select.Option value={240}>4小时</Select.Option>
                </Select>
              )}
            </Form.Item>
            <div className="tableFrequency">执行一次</div>
          </div>
      }, {
        title: '操作',
        width: 110,
        render: (text, record, index) =>
          <a onClick={() => this.deleteCol(record, index)}>删除</a>
      },]
    return (
      <div className="AddWarningRules baseListStyle">
        <div className="header">
          <div onClick={this.goBack} className="back"><i className="devicefont iconfanhui" /></div>
          <div>
            <div className="headerCon"><span className="title">{activeKey == 'addWarningRules' ? '新建预警规则' : '编辑预警规则'}</span>
            </div>
          </div>
        </div>
        <div className="warp">
          <Form className="formDiv">
            <Row>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="预警规则名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入预警规则名称' },
                    { max: 20, message: '最多20个字符' }],
                    initialValue: detail.name || ''
                  })(
                    <Input key="name" placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
              <Col span={16} style={{ paddingRight: 30 }}>
                <Form.Item {...formItemLayout} label="预警规则描述">
                  {getFieldDecorator('rulesDescribe', {
                    rules: [{ max: 100, message: '最多100个字符' }],
                    initialValue: detail.rulesDescribe || ''
                  })(
                    <Input key="rulesDescribe" placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className="addRowBtn" >
            <Button onClick={this.addCol}><Icon type="plus" style={{ fontSize: 11 }} />添加行</Button>
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
export default Form.create()(AddWarningRulesComp)
