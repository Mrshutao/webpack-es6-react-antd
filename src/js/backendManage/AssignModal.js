import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,message} from 'antd';
import HTTPService from './../Utils/HTTPService'
import Utils from './../Utils/Utils'

const FormItem = Form.Item;
const Option = Select.Option;
let httpService = new HTTPService();

export default class AssignModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            visible: false,
            devino:"",
            perid:"U000000058"
            
        }
    }

    showModal(){
        this.setState({
            visible: true,
        });
    }

    openModal(data,callback){
        console.log(data)
        this.setState({
            visible: true,
            devino:data.deviid,
            userid:data.userid,
            contet:data.contet
        })
        // this.showModal();
    }

    handleOk() {
        this.setState({ loading: true });
        // setTimeout(() => {
        // this.setState({ loading: false, visible: false });
        // }, 3000);
        this.assignTask();
    }

    handleCancel() {
        this.setState({ visible: false });
    }

    assignTask(){
        let self = this;
        let tranCode="deviFailDeal/toBrokDesginate"

        // this.setState({
        //     loading:true
        // })
        let input = {
            brokid:this.state.devino,
            userid:this.state.userid,
            perid:this.state.perid,
        }

        httpService.commHttp(tranCode,input,function(obj){
            let listnm = obj.listnm;
            self.setState({ 
                loading: true,
                visible: false
            });
        },function(obj){
            message.error(obj);
            self.setState({ loading: false });
        },function(){
            //message.error('This is a message of error');
            self.setState({ loading: false });
        })
    }

    render() {
        return (
        <div>
            <Modal
            visible={this.state.visible}
            title="故障任务指派"
            onOk={this.handleOk}
            onCancel={this.handleCancel.bind(this)}
            footer={[
                <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
                    指派
                </Button>,
            ]}
            >
                <Form layout='horizontal'>

                    <FormItem
                        label="设备编号："
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input value={this.state.devino} disabled/>
                    </FormItem>

                    
                    <FormItem
                        label="故障描述"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input type="textarea" rows={4} value={this.state.contet} disabled/>
                    </FormItem>

                    <FormItem
                        label="指派人员"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select defaultValue="U000000058" style={{ width: 150 }} onChange = {(perid)=> this.setState({perid})}>
                            <Option value="U000000058">吴朦朦</Option>
                            <Option value="U000000055">徐瑞锋</Option>
                        </Select>
                    </FormItem>                  

                </Form>
            </Modal>
        </div>
        );
    }
}