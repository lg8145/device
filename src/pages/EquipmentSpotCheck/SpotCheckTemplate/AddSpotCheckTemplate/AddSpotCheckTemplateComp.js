import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Form, Input, Table, Button, message, Icon } from 'antd';
import { IconFont } from '../../../../base/components/IconFont';
import Validate from '../../../../base/common/ValidateList';
import Components from '../../../../base/components';
import { ReqApi, Urls, UserInfo } from '../../../../base/common';
import './index.scss'
const { DeleteModal } = Components;
@connect(state => ({ addspotCheckTemplateModel: state.addspotCheckTemplateModel }))
class AddSpotCheckTemplateComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'addspotCheckTemplateModel/resetData' })
  }
  goBack = () => {
    const { detail } = this.props.addspotCheckTemplateModel
    if (detail.templateCode) {
      this.props.dispatch({ type: 'global/addRemoveTabs', path: 'editSpotCheckTemplate', targetPath: 'spotCheckTemplate' })
    } else {
      this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addSpotCheckTemplate', targetPath: 'spotCheckTemplate' })
    }

  }
  save = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      if (this.props.addspotCheckTemplateModel.addTableList.length == 0) {
        message.error('明细行不能为空！');
        return false
      }
      this.props.addspotCheckTemplateModel.addTableList.map(item => delete item.updateDate)
      values = Object.assign({}, this.props.addspotCheckTemplateModel.detail, values, { detail: this.props.addspotCheckTemplateModel.addTableList })
      if (values.templateCode) {//编辑
        return ReqApi.post({
          url: Urls.SpotCheckTemplate_update,
          pm: values
        }).then((data) => {
          message.success('编辑成功')
          this.props.dispatch({ type: 'addspotCheckTemplateModel/setDetail', payload: {} })
          this.props.dispatch({ type: 'spotCheckTemplateModel/getTableList' })
          this.props.dispatch({ type: 'global/addRemoveTabs', path: 'editSpotCheckTemplate', targetPath: 'spotCheckTemplate' })
          this.props.form.resetFields()
        })
      } else {//新增
        return ReqApi.post({
          url: Urls.SpotCheckTemplate_save,
          pm: values
        }).then((data) => {
          message.success('保存成功')
          this.props.dispatch({ type: 'addspotCheckTemplateModel/setDetail', payload: {} })
          this.props.dispatch({ type: 'addspotCheckTemplateModel/getTableList' })
          this.props.dispatch({ type: 'global/addRemoveTabs', path: 'addSpotCheckTemplate', targetPath: 'spotCheckTemplate' })
          this.props.form.resetFields()
        })
      }
    })
  }
  deleteCol = (record, index) => {
    let _arr = this.props.addspotCheckTemplateModel.addTableList
    _arr.splice(index, 1)
    this.props.dispatch({ type: 'addspotCheckTemplateModel/setDeleteCol', payload: _arr })
  }
  addCol = () => {
    let { addTableList, id } = this.props.addspotCheckTemplateModel;
    // 最多新增三十行记录
    if (addTableList.length < 30) {
      addTableList.push({
        id,
        checkItem: '',
        checkMethod: '',
        checkStandard: '',
      })
      id++
      this.props.dispatch({ type: 'addspotCheckTemplateModel/setAddTableList', payload: addTableList })
      this.props.dispatch({ type: 'addspotCheckTemplateModel/setId', payload: id })
    } else {
      message.warning('最多只能存在三十行记录！')
    }
  }
  handleChangeRow = (item, value, index) => {
    this.props.dispatch({ type: 'addspotCheckTemplateModel/handleChangeRow', payload: { item, value, index } })
  }
  render() {
    const { addTableList, detail } = this.props.addspotCheckTemplateModel;
    console.log('addTableList---', addTableList)
    const { getFieldsError, getFieldDecorator } = this.props.form;
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
        title: '点检项',
        dataIndex: 'checkItem',
        width: 250,
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`checkItem_${record.id}`, {
              initialValue: record.checkItem || '',
              rules: [{ required: true, message: '请输入点检项' }, { max: 50, message: '最多50字符!' }],
            })(
              <Input style={{ width: 200 }}
                placeholder="请输入"
                onChange={e => this.handleChangeRow('checkItem', e.target.value, index)}
              />
            )}
          </Form.Item>
      }, {
        title: '点检方法',
        dataIndex: 'checkMethod',
        width: 250,
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`checkMethod_${record.id}`, {
              initialValue: record.checkMethod || '',
              rules: [{ required: true, message: '请输入点检方法' }, { max: 50, message: '最多50字符!' }],
            })(
              <Input style={{ width: 200 }}
                placeholder="请输入"
                onChange={e => this.handleChangeRow('checkMethod', e.target.value, index)}
              />
            )}
          </Form.Item>
      }, {
        title: '点检标准',
        dataIndex: 'checkStandard',
        width: 400,
        render: (text, record, index) =>
          <Form.Item>
            {getFieldDecorator(`checkStandard_${record.id}`, {
              initialValue: record.checkStandard || '',
              rules: [{ required: true, message: '请输入点检标准' }, { max: 100, message: '最多100字符!' }],
            })(
              <Input style={{ width: 300 }}
                placeholder="请输入"
                onChange={e => this.handleChangeRow('checkStandard', e.target.value, index)}
              />
            )}
          </Form.Item>
      }, {
        title: '操作',
        width: 130,
        render: (text, record, index) =>
          <a onClick={() => this.deleteCol(record, index)}>删除</a>
        // <DeleteModal deleteOk={() => this.deleteCol(record, index)}><a>删除</a></DeleteModal>
      },]
    return (
      <div className="AddSpotCheckTemplate baseListStyle">
        <div className="header">
          <div onClick={this.goBack} className="back"><i className="devicefont iconfanhui" /></div>
          <div>
            <div className="headerCon"><span className="title">{detail.templateCode ? '编辑点检模板' : '新建点检模板'}</span>
            </div>
          </div>
        </div>
        <div className="warp">
          <Form className="formDiv">
            <Row>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="模板名称">
                  {getFieldDecorator('templateName', {
                    rules: [{ required: true, message: '请输入模板名称' },
                    { max: 20, message: '最多20个字符' }],
                    initialValue: detail.templateName || ''
                  })(
                    <Input key="templateName" placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item {...formItemLayout} label="描述">
                  {getFieldDecorator('templateDescribe', {
                    rules: [{ max: 100, message: '最多100个字符' }],
                    initialValue: detail.templateDescribe || ''
                  })(
                    <Input key="templateDescribe" placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className="addRowBtn" >
            <Button onClick={this.addCol}>添加行</Button>
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
export default Form.create()(AddSpotCheckTemplateComp)
