import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';
import { IconFont } from '../base/components/IconFont';
import menuList from '../base/config/menuList';
import tabsConfig from '../base/config/tabsConfig';
const { SubMenu } = Menu;
@connect(state => ({ global: state.global }))
class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.renderMenu = this.creatMenu()
  }
  componentDidMount() {
    this.props.dispatch({ type: 'global/addTabs', path: 'equipmentOverview' })
  }
  jump(path) {//路由跳转
    this.props.dispatch({ type: 'global/addTabs', path: path })
  }
  creatMenu() {
    return menuList.map((item, index) => {
      const itemTab = tabsConfig[item.path]
      return (
        <SubMenu
          key={index}
          title={
            <span>
              {item.icon ? <i className={`devicefont ${item.icon}`} style={{ padding: '0 5px' }} /> : ''}
              <span>{item.name}</span>
            </span>
          }
        >
          {
            item.children ? item.children.map((i, ind) => {
              return <Menu.Item
                key={i.path}
                onClick={() => this.jump(i.path)}
              >
                <span>{tabsConfig[i.path].name}</span>
              </Menu.Item>
            })

              :
              <Menu.Item
                key={index}
                onClick={() => this.jump(item.path)}
              >
                {item.icon ? <IconFont type={item.icon} /> : ''}
                <span>{itemTab.name}</span>
              </Menu.Item>
          }

        </SubMenu>
        // <Menu.Item
        //   key={index}
        //   onClick={() => this.jump(item.path)}
        // >
        //   {item.icon ? <IconFont type={item.icon} /> : ''}
        //   <span>{itemTab.name}</span>
        // </Menu.Item>
      )
    })
  }
  render() {
    return (
      <React.Fragment>
        <Menu theme="dark" mode="vertical">
          {this.renderMenu}
        </Menu>
      </React.Fragment>
    )
  }
}

export default NavLeft
