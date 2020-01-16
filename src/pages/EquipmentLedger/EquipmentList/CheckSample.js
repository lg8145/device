import React, { PureComponent } from 'react';
import { Tabs, Table, Radio, Descriptions, Badge, List, Pagination } from 'antd';
import Components from '../../../base/components';
const { FooterPagination } = Components;
const { TabPane } = Tabs;
import './index.scss'
class CheckSample extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { data } = this.props;
    let detail = data[0].deviceCalibration || {};
    let list = data[0].workConditionDivisionsList || {};
    const columns = [
      {
        key: '1',
        title: '行号',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        key: '2',
        title: '档位范围',
        dataIndex: 'fileRange'
      },
      {
        key: '3',
        title: '阈值带宽',
        dataIndex: 'bandWith'
      },
      {
        key: '4',
        title: '样本数',
        dataIndex: 'sampleNum'
      },
      {
        key: '5',
        title: <div>P<span className="sub-span">上</span></div>,
        dataIndex: 'pUp'
      },
      {
        key: '6',
        title: <div>P<span className="sub-span">下</span></div>,
        dataIndex: 'pDown'
      },
      {
        key: '7',
        title: "取样时间",
        dataIndex: 'sampleDate'
      },
      {
        key: '8',
        title: <div>P<span className="sub-span">n标</span></div>,
        dataIndex: 'pnMark'
      },
    ]

    return (
      <div>
        <Descriptions>
          <Descriptions.Item label="设备名称">{detail.deviceName || ''}</Descriptions.Item>
          <Descriptions.Item label="设备编号">{detail.deviceCode || ''}</Descriptions.Item>
          <Descriptions.Item label="最大量程">{detail.maxRange || ''}</Descriptions.Item>
          <Descriptions.Item label="划分档数">{detail.divideNum || ''}</Descriptions.Item>
          <Descriptions.Item label="采样周期">{detail.sampleCycle || ''}</Descriptions.Item>
          <Descriptions.Item label={<span>AD<span className="sub-span">1初始</span></span>}>{detail.adoneInitial || ''}</Descriptions.Item>
          <Descriptions.Item label={<span>AD<span className="sub-span">2初始</span></span>}>{detail.adtwoInitial || ''}</Descriptions.Item>
        </Descriptions>
        <Table
          rowKey={'deviceCode'}
          // loading={tableLoading}
          columns={columns}
          pagination={false}
          dataSource={list.list}
          width={'100%'}
          height={'100%'}
        />
        <div className="footer-modal">
          <span>为您找到{list.list.total ? list.list.total : 0}笔记录</span>
          <Pagination className="footer-modal-page" size="small" total={list.list.total ? list.list.total : 0} showSizeChanger showQuickJumper />
        </div>

        {/* <FooterPagination total={list.list.total ? list.list.total : 0} current={0} /> */}
      </div>
    )
  }
}
export default CheckSample