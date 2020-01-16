import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Form, Checkbox, Table, Button, message, DatePicker, Select } from 'antd';
import { IconFont } from '../../../../base/components/IconFont';
import Validate from '../../../../base/common/ValidateList';
import Components from '../../../../base/components';
import { ReqApi, Urls, UserInfo } from '../../../../base/common';
import './index.scss'
import moment from 'moment';
const { Option } = Select;
const { DeleteModal } = Components;
@connect(state => ({ spotCheckTaskDetailModel: state.spotCheckTaskDetailModel }))
class SpotCheckTaskDetailComp extends PureComponent {
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
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'spotCheckTaskDetail', targetPath: 'spotCheckTask' })
  }
  render() {
    const { spotCheckTaskDetail } = this.props.spotCheckTaskDetailModel;
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
        dataIndex: 'spotcheckDetailResultName',
        width: 250,
      }, {
        title: '描述',
        dataIndex: 'spotcheckDetailDescribe',
        width: 400,
      }]
    return (
      <div className="SpotCheckTaskDetail baseListStyle">
        <div className="header">
          <div onClick={this.goBack} className="back"><i className="devicefont iconfanhui" /></div>
          <div>
            <div className="headerCon">
              <span className="title">设备点检单</span>
              <div className="orderStatus">{spotCheckTaskDetail.spotResultName ? <span style={{ color: '#23BC08' }}>已检</span> : <span>未检</span>}</div>
            </div>
          </div>
        </div>
        <div className="warp">
          <Form className="formDiv">
            <Row className="formDivTop">
              <Col span={8}>
                <Form.Item {...formItemLayout} label="设备编号">
                  {getFieldDecorator('deviceCode', {
                    initialValue: spotCheckTaskDetail.deviceCode || ''
                  })(
                    <span>{spotCheckTaskDetail.deviceCode}</span>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="设备名称">
                  {getFieldDecorator('deviceName', {
                    initialValue: spotCheckTaskDetail.deviceName || ''
                  })(
                    <span>{spotCheckTaskDetail.deviceName}</span>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="点检日期">
                  {getFieldDecorator('spotCheckTime', {
                    initialValue: moment()
                  })(
                    <span>{spotCheckTaskDetail.spotCheckTime}</span>
                  )}
                </Form.Item>
                </Col>
              {/* <Col span={8}>
                <Form.Item {...formItemLayout} label="点检人">
                  {getFieldDecorator('spotCheckByName', {
                    initialValue: spotCheckTaskDetail.spotCheckByName || ''
                  })(
                    <span>{spotCheckTaskDetail.spotCheckByName}</span>
                  )}
                </Form.Item>
              </Col> */}
            </Row>
            <div className="result" >点检结果</div>
            <Table
              rowKey={'spotCheckCode'}
              columns={columns}
              pagination={false}
              dataSource={spotCheckTaskDetail.detail || []}
            />
            <div className="bottomDetail">
              <span className="bottomDetail-title">点检结果：</span>
              <span className="bottomDetail-con">{spotCheckTaskDetail.spotResultName}</span>
              {spotCheckTaskDetail.spotResult == 1 && <Checkbox checked={spotCheckTaskDetail.isRepair == 0 ? false : true} disabled={true} style={{ paddingLeft: 15 }}>申请设备维修</Checkbox>}

              <div className="bottomDetail-b">
                <span className="bottomDetail-title">故障现象描述：</span><span className="bottomDetail-con">{spotCheckTaskDetail.faultDescription}</span>
              </div>
            </div>
            {/* <div className="bottomDetail">
              <span className="bottomDetail-title">故障现象描述：</span><span className="bottomDetail-con">{spotCheckTaskDetail.faultDescription}</span>
            </div> */}
          </Form>
          <div className="addApply">
            <Button onClick={this.goBack}>返回</Button>
          </div>
        </div>

      </div>
    )
  }
}
export default Form.create()(SpotCheckTaskDetailComp)
