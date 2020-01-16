import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Modal, Input, Row, Col, Pagination } from 'antd';
@connect(state => ({ statisticsWaringModel: state.statisticsWaringModel }))
class WaringDataDetail extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.columnsWarning = [
      {
        title: '预警时间',
        dataIndex: 'warningTime',
        key: 'warningTime',
      }, {
        title: '监控项',
        dataIndex: 'itemName',
        key: 'ititemNameem',
      }, {
        title: '监控值',
        dataIndex: 'value',
        key: 'value',
      }, {
        title: '预警阀值',
        dataIndex: 'warningValue',
        key: 'warningValue',
      }, {
        title: '警告',
        dataIndex: 'warningDescribe',
        key: 'warningDescribe',
      }
    ]
    this.colors = {
      '0': '#23BC08',
      '1': '#F49505',
      '2': '#E52C00'
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'statisticsWaringModel/WaringDataDetail' })
  }
  componentWillUnmount() {
    // this.props.dispatch({ type: 'realTimeModel/resetFreeSearch' })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'statisticsWaringModel/pageChange', payload: e })
  }
  render() {
    const { waringDataDetailList,detail } = this.props.statisticsWaringModel
    console.log('waringDataDetailList--', waringDataDetailList)
    const colors = [
      '#23BC08',//运转正常
      '#E52C00',//运行异常
      '#F49505',//预警
      '#BFBFBF'//关机
    ]
    return (
      <Modal
        className="WaringDataDetailModal"
        width={900}
        title={'预警记录'}
        wrapClassName="vertical-center-modal"
        visible={true}
        footer={null}
        onCancel={this.props.onCancel}
      >
        <div className="topcon">
          <Row>
            <Col className="gutter-row coldiv" span={8}><span className="coldivT">设备编号：</span><span className="coldivC">{detail.deviceCode}</span></Col>
            {/* <Col className="gutter-row" span={4}><span className="coldivC">{detail.deviceCode}</span></Col> */}
            <Col className="gutter-row coldiv" span={8}><span className="coldivT">设备名称：</span><span className="coldivC">{detail.deviceName}</span></Col>
            {/* <Col className="gutter-row" span={4}><span className="coldivC">{detail.deviceName}</span> </Col> */}
            <Col className="gutter-row coldiv" span={8}><span className="coldivT">设备型号：</span><span className="coldivC">{detail.model}</span></Col>
            {/* <Col className="gutter-row" span={4}><span className="coldivC">{detail.model}</span> </Col> */}
          </Row>
        </div>
        <Table
          rowKey={'code'}
          columns={this.columnsWarning}
          pagination={false}
          dataSource={waringDataDetailList.list || []}
        />
        <Pagination
          className="_pagination"
          defaultPageSize={5}
          showQuickJumper
          size="small"
          showSizeChanger={false}
          onChange={(page, pageSize) => this.pageChange({ page, pageSize })}
          defaultCurrent={1}
          showTotal={(total, range) => `为您找到 ${waringDataDetailList.total} 条记录`}
          total={waringDataDetailList.total}
        />
      </Modal>
    )
  }
}

export default WaringDataDetail