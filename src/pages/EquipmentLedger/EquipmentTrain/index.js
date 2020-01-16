import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Components from '../../../base/components';
import { Table, Icon, Button, message, Form, Row, Col, Upload } from 'antd';
import { ReqApi, Urls,UserInfo } from '../../../base/common';
const { FooterPagination, DeleteModal } = Components;
import './index.scss'
@connect(state => ({ equipmentTrain: state.equipmentTrain }))
class EquipmentTrain extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addVisible: false,
      accountVisible: false,
      detail: {},
      detailAccount: {},
      tenantCode: '',
      // tokenId: ''
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'equipmentTrain/getTableList' })
    this.props.dispatch({ type: 'equipmentTrain/watchChange' })
    // let val = document.cookie
    // let newArr = val.split('=')
    // this.setState({ tokenId: newArr[1] })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'equipmentTrain/setCurrent', payload: e })
  }
  //将onChange事件的文件值受控给表单
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  fileChange = ({ fileList }) => {
    fileList = fileList.slice(-1);
    fileList = fileList.map((file) => {
      if (file.response && file.response.data) {
        const { id, fileName, fileURL } = file.response.data;
        file.url = fileURL;
        file.name = fileName;
        file.uid = id;
      }
      return file;
    });

    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.code === 2000;
      }
      return true;
    });
    this.props.dispatch({ type: 'equipmentTrain/getTableList' })
  }
  deleteRow = (record) => {
    return ReqApi.get({
      url: Urls.deviceDocumenDelete,
      pm: { id: record.id }
    }).then((data) => {
      message.success('删除成功')
      this.props.dispatch({ type: 'equipmentTrain/getTableList' })
    })
  }
  render() {
    const { tableLoading, listData, current } = this.props.equipmentTrain;
    const tableColumns = [
      {
        title: '设备相关文档',
        dataIndex: 'name',
        key: 'name',
        render: (value, record, index) => {
          return (
            <a href={`/device/FileUpload/downloadFile?id=${record.id}&tokenId=${UserInfo.getCookie('tokenId')}`}>{value}</a>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'cz',
        key: 'cz',
        fixed: 'right',
        width: 160,
        render: (value, record, index) => {
          return (
            <div className="table-click">
              <a href={`/device/FileUpload/downloadFile?id=${record.id}&tokenId=${UserInfo.getCookie('tokenId')}`} style={{ marginRight: 10 }} >下载</a>
              <DeleteModal deleteOk={() => this.deleteRow(record, index)}><a>删除</a></DeleteModal>
            </div>
          )
        }
      }
    ];
    const { getFieldDecorator } = this.props.form
    return (
      <div className="EquipmentTrain baseListStyle tabHeight">
        {/* <div className="topCon">
          <span className="currentTitle">设备培训</span>
        </div> */}
        <div className="addRowBtn" style={{ marginLeft: 24, padding:'11px 0px' }}>
          <Form>
            <Row>
              <Col span={8}>
                <Form.Item >
                  {getFieldDecorator('deviceCode', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                    initialValue: []
                  })(
                    <Upload
                      className="avatar-uploader"
                      accept=".doc,.docx,.pdf"
                      name="file"
                      showUploadList={false}
                      data={{ module: 'importexcle' }}
                      headers={{
                        authorization: "authorization-text",
                        tokenId: UserInfo.getCookie('tokenId'),
                      }}
                      action="/device/FileUpload/upload"
                      onChange={this.fileChange} >
                      <Button><Icon type="upload" />上传文档</Button>
                    </Upload>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <Table
          rowKey={'id'}
          loading={tableLoading}
          columns={tableColumns}
          pagination={false}
          dataSource={listData.list}
          width={'100%'}
        />
        <FooterPagination total={listData.total ? listData.total : 0} current={current} pageChange={this.pageChange} />
      </div>
    )
  }
}
export default Form.create()(EquipmentTrain)
