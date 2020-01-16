import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Form, Input, Table, Button, message, DatePicker, Select } from 'antd';
import { IconFont } from '../../../../base/components/IconFont';
import Validate from '../../../../base/common/ValidateList';
import Components from '../../../../base/components';
import { ReqApi, Urls, UserInfo } from '../../../../base/common';
import './index.scss'
import moment from 'moment';
const { Option } = Select;
const { DeleteModal } = Components;
@connect(state => ({ maintainRecordDetailModel: state.maintainRecordDetailModel }))
class MaintainRecordDetailComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  goBack = () => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'maintainRecordDetail', targetPath: 'maintainRecord' })
  }
  render() {
    const { maintainRecordDetail } = this.props.maintainRecordDetailModel;
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
      }]
    return (
      <div className="maintainRecordDetail baseListStyle">
        <div className="header">
          <div onClick={this.goBack} className="back"><i className="devicefont iconfanhui" /></div>
          <div>
            <div className="headerCon">
              <span className="title">设备保养单：{maintainRecordDetail.maintenanceRecordCode}</span>
            </div>
          </div>
        </div>
        <div className="warp">
          <Form >
            <div className="warp-detail">
            <Row>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="设备编号">
                  {getFieldDecorator('deviceCode', {
                    initialValue: maintainRecordDetail.deviceCode || ''
                  })(
                    <span>{maintainRecordDetail.deviceCode}</span>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="设备名称">
                  {getFieldDecorator('deviceName', {
                    initialValue: maintainRecordDetail.deviceName || ''
                  })(
                    <span>{maintainRecordDetail.deviceName}</span>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="日期">
                  {getFieldDecorator('maintenanceDate', {
                    initialValue: moment()
                  })(
                    <span>{maintainRecordDetail.maintenanceDate}</span>
                  )}
                </Form.Item>
              </Col>
              {/* <Col span={8}>
                <Form.Item {...formItemLayout} label="负责人">
                  {getFieldDecorator('spotCheckByName', {
                    initialValue: maintainRecordDetail.maintenanceBy || ''
                  })(
                    <span>{maintainRecordDetail.maintenanceBy}</span>
                  )}
                </Form.Item>
              </Col> */}
            </Row>
            </div>
            <div className="secondTitle">
              <div className="iconBule" />
              <span>保养记录</span>
            </div>
            <Table
              rowKey={'maintenanceRecordCode'}
              columns={columns}
              pagination={false}
              dataSource={maintainRecordDetail.detail || []}
            />
          </Form>
          <div className="addApply">
            <Button onClick={this.goBack}>返回</Button>
          </div>
        </div>

      </div>
    )
  }
}
export default Form.create()(MaintainRecordDetailComp)
