import React, { PureComponent } from 'react';
import { Tabs, Table, Radio, Divider, Form, Row, Col, Input, DatePicker, Select, Modal, Button, Upload, Icon } from 'antd';
import Components from '../../../base/components';
import moment from 'moment';
import validate from '../../../base/common/ValidateList';
import { connect } from 'dva';
import { getBase64, beforeUpload } from '../../../base/common/method';
const { Option } = Select;
const { FooterPagination, IconFont, ChoiceDevice } = Components;
const { TabPane } = Tabs;
@connect(state => ({ equipmentListModel: state.equipmentListModel }))
class AddEquipment extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      // picUrl:'',
      showChoose: false,
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'equipmentListModel/getTypeList' });
    this.props.dispatch({ type: 'equipmentListModel/getTypeListAll' });
    this.props.dispatch({ type: 'equipmentListModel/getSiteList' });
    this.props.dispatch({ type: 'equipmentListModel/getWorkShop', payload: { page: 1, pageSizeL: 1000 } })
  }
  onSubmit = (e) => {

    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (err) {
        return
      }
      if (values.purchaseDate) values.purchaseDate = values.purchaseDate.format('YYYY-MM-DD');
      if (values.warranty) values.warranty = values.warranty.format('YYYY-MM-DD');

      values = Object.assign({}, values);
      this.props.onSubmit(values)

    })
  }
  choose = () => {
    this.setState({ showChoose: true })
  }
  handleCancel = () => {
    this.setState({ showChoose: false })
  }
  // handleChange = info => {
  //     if (info.file.status === 'uploading') {
  //       this.setState({ loading: true });
  //       return;
  //     }
  //     if (info.file.status === 'done') {
  //       getBase64(info.file.originFileObj, imageUrl =>
  //         this.setState({
  //             picUrl:imageUrl,
  //           loading: false,
  //         }),
  //       );
  //     }
  // };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { detail } = this.props;
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
    const dateFormat = 'YYYY-MM-DD';
    let date = new Date;
    // const uploadButton = (
    //     <div>
    //         <Icon type={this.state.loading ? 'loading' : 'plus'} />
    //         <div className="ant-upload-text">上传图片</div>
    //     </div>
    // );
    // const { picUrl } = this.state;
    const { typeList, typeListAll, workShopList } = this.props.equipmentListModel;
    return (
      <Modal
        title={this.props.title}
        visible={true}
        onCancel={this.props.onCancel}
        width={781}
        className="equipmentList baseModal"
        footer={[
          <Button key="1" onClick={this.props.onCancel}>取消</Button>,
          <Button key="2" onClick={this.onSubmit} type="primary">提交</Button>
        ]}
      >
        <div>
          <Form>
            {/* <Row>
                        <Col span={24}>
                            <Form.Item {...formItemLayout1} label="设备图片">
                                {
                                    getFieldDecorator('picUrl',{

                                    })(
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange}
                                        >
                                            {picUrl ? <img src={picUrl} alt="avatar"/> : uploadButton}
                                      </Upload>
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row> */}
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="设备编号">
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入设备编号' },
                    validate({type: 'deviceCode'}),{max:20,message:'最多20位字符'}],
                    initialValue: detail.code || ''
                  })(
                    <Input disabled={this.props.title == '编辑设备' ? true : false} style={{ width: 250 }} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="设备名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入设备名称' }, { max: 20, message: '最多输入20位字符' }],
                    initialValue: detail.name || ''
                  })(
                    <Input key="name" placeholder="请输入" style={{ width: 250 }}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="设备型号">
                  {getFieldDecorator('model', {
                    initialValue: detail.model || ''
                  })(
                    <Input placeholder="请输入" style={{ width: 250 }}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="生产厂商">
                  {getFieldDecorator('manufacturer', {
                    rules: [{ max: 50, message: '最多输入50位字符' }],
                    initialValue: detail.manufacturer || ''
                  })(
                    <Input key="manufacturer" placeholder="请输入生产厂商" style={{ width: 250 }}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="设备分类">
                  {
                    getFieldDecorator('categoryCode', {
                      initialValue: detail.categoryCode || ''
                    })(
                      <Select placeholder="请选择" style={{ width: 250 }}>
                        <Option value={''} key={''}>请选择</Option>
                        {typeListAll.map((i) => {
                          return <Option value={i.categoryCode} key={i.categoryCode}>{i.categoryName}</Option>
                        })}
                      </Select>
                    )}

                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="购入日期">
                  {getFieldDecorator('purchaseDate', {
                    initialValue: detail.purchaseDate ? moment(detail.purchaseDate) : moment(date, dateFormat)
                  })(
                    <DatePicker format={dateFormat} style={{ width: 250 }}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="所属产线">
                  {getFieldDecorator('productionLineCode', {
                    initialValue: detail.productionLineCode ? detail.productionLineCode : ''
                  })(
                    <Select placeholder="请选择" style={{ width: 250 }}>
                      <Option value={''} key={''}>请选择</Option>
                      {workShopList.map((i) => {
                        return <Option value={i.code} key={i.code}>{i.name}</Option>
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="保修期至">
                  {getFieldDecorator('warranty', {
                    initialValue: detail.warranty ? moment(detail.warranty) : moment(date, dateFormat)
                  })(
                    <DatePicker format={dateFormat} style={{ width: 250 }}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="安置地点">
                  {getFieldDecorator('location', {
                    rules: [{ max: 50, message: '最多输入50位字符' }],
                    initialValue: detail.location || ''
                  })(
                    <Input key="location" placeholder="请输入" style={{ width: 250 }}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="状态">
                  {getFieldDecorator('status', {
                    initialValue: detail.status ? detail.status : 1,
                  })(
                    <Select style={{ width: 250 }}>
                      <Option value={1}>正常</Option>
                      <Option value={2}>检修中</Option>
                      <Option value={3}>已报废</Option>
                    </Select>
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
export default Form.create()(AddEquipment)
