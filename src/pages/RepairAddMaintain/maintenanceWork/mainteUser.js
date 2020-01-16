import React, { PureComponent } from 'react';
import { Tabs,Table ,Radio, Divider,Input} from 'antd';
import Components from '../../../base/components';
const { Search } = Input;
const { TabPane } = Tabs;
import { connect } from 'dva';
const { FooterPagination} = Components;
import './index.scss'
@connect(state => ({ maintenanceWorkModel: state.maintenanceWorkModel }))
class MainteUser extends PureComponent{
    constructor(props){
        super(props)
    }
    addEp=(record)=>{ 
        this.props.addData(record);
        this.props.handleCancel()
    }
    componentDidMount() {
        this.props.dispatch({ type: 'maintenanceWorkModel/getUserList' })
        this.props.dispatch({ type: 'maintenanceWorkModel/watchChange' });
    }
    pageChange = e => {
        this.props.dispatch({ type: 'maintenanceWorkModel/setCurrent', payload: e })
    }
    render(){
        const columns=[
            {
                key:'1',
                title:'用户名',
                dataIndex:'username'
            },
            {
                key:'2',
                title:'用户ID',
                dataIndex:'userId'
            },
            {
                key:'3',
                title:'操作',
                render: (text, record) => (
                    <span>
                        <a onClick={()=>this.addEp(record)}>选取</a>
                    </span>
                ),
            },
        ]
        const {userList, current} = this.props.maintenanceWorkModel;
        return (
            <div className="choose-footer">
                 <Table
                    rowKey={'userId'}
                    columns={columns}
                    pagination={false}
                    dataSource={userList.list}
                    width={'100%'}
                    height={'100%'}
                />
                 <FooterPagination total={userList.total ? userList.total : 0} current={current} pageChange={this.pageChange}/>
            </div>
        )
    }
}
export default MainteUser