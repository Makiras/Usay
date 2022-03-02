import React from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Card, CardContent,
    Table, TableBody, TableRow, TableCell
} from '@mui/material';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import moment from 'moment';
import './index.css';



class Verify extends React.Component {

    constructor(props) {
        super(props);
        this.sign = null;
        this.state = {
            loading: false,
            error: false,
            message: '',
            data: null,
        };
    }

    getTimeColor(time) {
        var color;
        color = "green";
        color = moment.unix(this.state.data.sign_time).isBefore(moment().subtract(24, 'hours')) ? "#FFB300" : color;
        color = moment.unix(this.state.data.sign_time).isBefore(moment().subtract(7, 'days')) ? "#FF8A80" : color;
        return color;
    }

    getTableCess(color, content) {
        return (
            <TableCell sx={{ color: color, padding: '3px' }} align="left">{content}</TableCell>
        )
    }

    getData() {
        this.setState({ loading: true });
        var formData = new FormData();
        formData.append('sign', this.sign.value);
        axios.post('/api/verify', formData).then(res => {
            if (res.data.status === 'ok') {
                this.setState({
                    data: res.data.data,
                    message: res.data.status,
                });
                console.log(res.data.data);
            } else {
                this.setState({
                    error: true,
                    message: res.data.message,
                });
            }
        }, err => {
            if (err.response.data.message !== undefined) {
                this.setState({
                    error: true,
                    message: err.response.data.message,
                });
            } else {
                this.setState({
                    error: true,
                    message: err.message,
                });
            }
        });
        this.setState({
            loading: false,
        });
    }

    render() {
        return (
            <>
                <main>
                    <div className="verifyPaper" >
                        <h1>验证身份</h1>
                        <TextField
                            required
                            fullWidth
                            id="verify-input-field"
                            inputRef={(ref) => { this.sign = ref; }}
                            label="Required"
                            defaultValue=""
                            multiline={true}
                            style={{ marginTop: '20px', wordBreak: "break-all" }}
                        />
                        <div className="verify-button-container" style={{ marginTop: '20px', textAlign: "right", display: "grid", gridTemplateColumns: "auto 1fr" }}>
                            <div style={{ marginTop: '-15px', opacity: 0.6, textAlign: "left" }}>
                                <font size="2">请输入验证代码</font>
                            </div>
                            <div>
                                <Button variant="contained" color="primary" size="middle"
                                    disabled={this.state.loading === true ? true : false}
                                    onClick={() => { this.getData(); }}>
                                    {this.state.loading === true ? 'Loading...' : 'Verify'}
                                </Button>
                            </div>
                        </div>
                        <div className="verify-result" style={{
                            display: this.state.message === '' ? 'none' : 'inline', marginTop: '20px', textAlign: "left"
                        }}>
                            <div style={{ marginTop: '-30px', textAlign: "left", display: "grid", gridTemplateColumns: "auto 1fr" }}>
                                {this.state.message === 'ok' ? <>
                                    <div>
                                        <CheckCircleTwoToneIcon color="success" sx={{ fontSize: 30, color: "success" }}></CheckCircleTwoToneIcon>
                                    </div>
                                    <div style={{ marginTop: '2px', color: "green", fontSize: "20px" }}>
                                        <b>验证通过！</b>
                                    </div>
                                </> : <>
                                    <div>
                                        <CancelTwoToneIcon sx={{ fontSize: 30, color: "#D32F2F" }}></CancelTwoToneIcon>
                                    </div>
                                    <div style={{ marginTop: '2px', color: "#D32F2F", fontSize: "20px" }}>
                                        <b>验证失败！</b>
                                    </div>
                                </>
                                }
                            </div>
                            <div className="verify-result-message" style={{ marginTop: '20px' }}>
                                {this.state.message === 'ok' ? <>
                                    <div style={{ fontSize: "14px" }}>
                                        <Card>
                                            <CardContent>
                                                <font color="green">内含信息：</font>
                                                {this.state.data.comment}
                                            </CardContent>
                                        </Card>
                                        <Card style={{ marginTop: '20px' }}>
                                            <CardContent>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow >
                                                            {this.getTableCess("green", <b>{(this.state.data.stuid.length > 10) ? '识别码:' : '学号:'}</b>)}
                                                            {this.getTableCess("green", (this.state.data.stuid.length > 10) ? this.state.data.stuid.substring(8, 23) : this.state.data.stuid)}
                                                        </TableRow>
                                                        <TableRow sx={{ whiteSpace: 'nowrap', wordBreak: 'ellipsis' }}>
                                                            {this.getTableCess(this.getTimeColor(), <b>签发于:</b>)}
                                                            {this.getTableCess(this.getTimeColor(), moment.unix(this.state.data.sign_time).format('YYYY年MM月DD日 HH:mm:ss'))}
                                                        </TableRow>
                                                        {this.state.data.name !== undefined ? <TableRow>
                                                            {this.getTableCess("green", <b>姓名:</b>)}
                                                            {this.getTableCess("green", this.state.data.name)}
                                                        </TableRow> : null}
                                                        {this.state.data.gender !== undefined ? <TableRow>
                                                            {this.getTableCess("green", <b>性别:</b>)}
                                                            {this.getTableCess("green", this.state.data.gender)}
                                                        </TableRow> : null}
                                                        {this.state.data.grade !== undefined ? <TableRow>
                                                            {this.getTableCess("green", <b>年级:</b>)}
                                                            {this.getTableCess("green", this.state.data.grade)}
                                                        </TableRow> : null}
                                                        {this.state.data.school !== undefined ? <TableRow>
                                                            {this.getTableCess("green", <b>学院:</b>)}
                                                            {this.getTableCess("green", this.state.data.school)}
                                                        </TableRow> : null}
                                                        {this.state.data.major !== undefined ? <TableRow>
                                                            {this.getTableCess("green", <b>专业:</b>)}
                                                            {this.getTableCess("green", this.state.data.major)}
                                                        </TableRow> : null}
                                                        {this.state.data.class !== undefined ? <TableRow>
                                                            {this.getTableCess("green", <b>班级:</b>)}
                                                            {this.getTableCess("green", this.state.data.class)}
                                                        </TableRow> : null}
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </> : <>
                                    <div style={{ fontSize: "16px" }}>
                                        <Card>
                                            <CardContent sx={{ color: "#FF8A80" }}>
                                                错误：{this.state.message}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default Verify;

