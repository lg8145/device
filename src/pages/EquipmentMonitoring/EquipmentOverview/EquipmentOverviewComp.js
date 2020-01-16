import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Divider, Menu, Modal, Upload, Row, Col, Badge } from 'antd';
import Components from '../../../base/components'
import { IconFont } from '../../../base/components/IconFont';
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import DeviceWaring from './DeviceWaring'
import DevicesTwo from './DevicesTwo'
import DevicesProportion from './DevicesProportion'
import WaringTOP from './WaringTOP'
import MaintenanceRecord from './MaintenanceRecord'
import './index.scss'

const { SearchMore, FooterPagination, DeleteModal } = Components;
const colors = {
  '0': '#E52C00',
  '1': '#595959',
}
const statusName = ['未处理', '已处理']
@connect(state => ({
  equipmentOverviewModel: state.equipmentOverviewModel,
  warningRecordModel: state.warningRecordModel,
  equipmentListModel: state.equipmentListModel
}))
class EquipmentOverviewComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      code: ''
    }
    this.tableColumns = [
      {
        title: '预警时间',
        dataIndex: 'warningTime',
        key: 'warningTime'
      },
      {
        title: '预警信息',
        dataIndex: 'warningDescribe',
        key: 'warningDescribe'
      },
      {
        title: '处理状态',
        dataIndex: 'dealResult',
        key: 'dealResult',
        render: (text, record) => <span color={colors[record.dealResult]} text={statusName[record.dealResult]} ></span>
      }
    ];
  }
  componentDidMount() {
    this.props.dispatch({ type: 'warningRecordModel/getTableList', payload: { page: 1, pageSize: 5 } })
    this.props.dispatch({ type: 'maintenanceWorkModel/getTableList', payload: { page: 1, pageSize: 5 } })
    this.props.dispatch({ type: 'equipmentOverviewModel/watchChange' })
    this.props.dispatch({ type: 'equipmentListModel/getTableList' })//设备列表
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'equipmentOverviewModel/resetData' })
  }
  //查看详情
  onDetail = (code) => {
    this.setState({ visible: true }, () => {
      this.props.dispatch({ type: 'equipmentOverviewModel/getDetial', payload: code })
    })
  }
  onCancel = () => {
    this.setState({ visible: false })
  }
  onWarning = () => {
    this.props.dispatch({ type: 'global/addTabs', path: 'warningRecord' })
  }
  render() {
    const { tableLoading } = this.props.equipmentOverviewModel;
    const { listData, current } = this.props.warningRecordModel;
    const { datalist } = this.props.equipmentListModel
    const { visible, code } = this.state
    const statusName = ['运转正常', '运行异常', '预警', '关机']
    return (
      <div className="EquipmentOverview baseListStyle">
        <div className="top">
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <Row gutter={24}>
                <Col className="gutter-row" span={12}>
                  <div className="box-top">
                    <Col span={5}>
                      <IconFont type="iconshebeizongshu" className="iconCss" />
                    </Col>
                    <Col span={12}>
                      <div className="box-topTitle">设备总数</div>
                    </Col>
                    <Col span={3}>
                      <div className="box-topNub">{datalist.total ? datalist.total : 5}</div>
                    </Col>
                  </div>
                </Col>
                <Col className="gutter-row" span={12}>
                  <div className="box-top">
                    <Col span={5}>
                      <IconFont type="iconzhengchangyunhang" className="iconCss" />
                    </Col>
                    <Col span={12}>
                      <div className="box-topTitle">正常运行</div>
                    </Col>
                    <Col span={3}>
                      <div className="box-topNub">{datalist.total ? datalist.total - 2 : 3}</div>
                    </Col>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col className="gutter-row" span={12}>
                  <div className="box-top">
                    <Col span={5}>
                      <IconFont type="iconguzhangweixiu" className="iconCss" />
                    </Col>
                    <Col span={12}>
                      <div className="box-topTitle">故障维修</div>
                    </Col>
                    <Col span={3}>
                      <div className="box-topNub" style={{ color: '#E52C00' }}>1</div>
                    </Col>
                  </div>
                </Col>
                <Col className="gutter-row" span={12}>
                  <div className="box-top">
                    <Col span={5}>
                      <IconFont type="icontingji" className="iconCss" />
                    </Col>
                    <Col span={12}>
                      <div className="box-topTitle">停机</div>
                    </Col>
                    <Col span={3}>
                      <div className="box-topNub">1</div>
                    </Col>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <DeviceWaring />
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row" span={16}>
              <DevicesTwo />
            </Col>
            <Col className="gutter-row" span={8} style={{ paddingLeft: 20 }}>
              <DevicesProportion />
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row" span={12}>
              <WaringTOP />
            </Col>
            <Col className="gutter-row" span={12} style={{ paddingLeft: 20 }}>
              <div className="waringRecord">
                <div className="headerTab">预警记录
                {
                    listData.total > 5 && <div className="more" onClick={() => this.onWarning()}>查看更多</div>
                  }

                </div>
                <Divider type="horizontal" />
                <Table
                  rowKey={'code'}
                  loading={this.tableLoading}
                  columns={this.tableColumns}
                  pagination={false}
                  dataSource={listData.list || []}
                  width={'100%'}
                  className="tableCss"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row" span={24}>
              <MaintenanceRecord />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default EquipmentOverviewComp;
