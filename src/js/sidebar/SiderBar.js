import React,{Component} from 'react';
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;
import {Link,browserHistory,router} from 'react-router';
import "./../../css/sidebar.css";

export default class Sider extends Component {

    constructor(params){
        super(params)
        this.state = {
            theme: 'dark',
            current: '1',
        }

        this.tree = [
            {
              id:100,
              text: "后台管理",
              icon:"appstore-o",
              nodes: [
                {
                  id:1001,
                  text: "行员信息管理",
                  href: "/home/ManagePerson"
                }, {
                  id:1002,     
                  text: "网点信息管理",
                  href: "/home/BranchManage"
                }, {
                  id:1003,
                  text: "设备信息管理",
                  href: "/home/manageDevice"
                },
                {
                  id:1004,       
                  text: "调查问券管理",
                  href: "/home/manageSurvey"
                },{
                  id:1005,    
                  text: "设备故障处理",
                  href: "/home/deviceProcess"
                },{
                  id:1006,
                  text: "发送信息",
                  href: "/home/sendmsg"
                },
                {
                  id:1007,
                  text: "网点检查管理",
                  icon:"safety",
                  nodes:[
                    {
                      id:1101,
                      text: "网点检查指标",
                      href: "/home/checkStandard"
                    }, {
                      id:1102,
                      text: "网点参数指标",
                      href: "/home/standardManage"
                    }
                  ]
                },{
                  id:1008,
                  text: "网点资讯管理",
                  icon:"copy",
                  nodes:[
                    {
                      id:1201,
                      text: "添加资讯",
                      href: "/home/addInformation"
                    }, {
                      id:1202,
                      text: "资讯管理",
                      href: "/home/InfomationManage"
                    }
                  ]
                },{
                  id:1009,
                  text: "金融学堂管理",
                  href: "/home/CourseManage"
                }
              ]
            }, {
              id:2000,
              text: "数据分析",
              icon:"line-chart",
              nodes: [
                {
                  id:2101,
                  text: "网点人员结构分析",
                  href: "/home/personStrcAnalysis"
                }, {
                  id:2102,
                  text: "业务系统",
                  href: "/home/businessSystem"
                }, {
                  id:2103,
                  text: "自动化编译部署",
                  href: "/home/AutoDeploy"
                }, {
                  id:2104,
                  text: "新增用户",
                  href: "/home/addPerson"
                }
              ]
            }, {
              id:3000,
              text: "运营报表",
              icon:"database",
              nodes: [
                {
                  id:3101,
                  text: "向导",
                  href: "/home/wizard"
                }
              ]
            }
          ]
    }


  handleClick(e){
    console.log('click', e);
    //browserHistory.push(e.href);

    this.setState({
      current: e.key,
    });
  }

  //生成主菜单和二级菜单
  generateMenu(data){
    let menu;
    let menuArr = data;
    if(menuArr == undefined || menuArr.length<1){
			return null;
		}else{
      menu = menuArr.map((value,index)=>{
            let subMenu;
            if(value.nodes){
              subMenu = this.generateMenu(value.nodes);
              value = (<SubMenu key={value.id}  title={<span><Icon type={value.icon}/><span>{value.text}</span></span>}>
                      {subMenu}
                    </SubMenu>)

            } else {
              value = (<Menu.Item key={value.id}><Link to={{pathname: value.href, state: { title: value.text }}}>{value.text}</Link></Menu.Item>)
            }
            return value;

      })

    }
    return menu;
  }


  render() {
    let menuArr = this.tree;
    let menu  = this.generateMenu(menuArr);

    return (
      <div>
        <Menu
          theme={'dark'}
          onClick={(e)=>this.handleClick(e)}
          style={{ width: 230 }}
          defaultOpenKeys={['100']}
          selectedKeys={[this.state.current]}
          mode="inline"
          className = "sidebar">
            {menu}
        </Menu>
      </div>
    );
  }


}
