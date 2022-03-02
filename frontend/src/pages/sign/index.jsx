import React from "react";
import axios from "axios";
import {
    TextField,
    Button,
    FormGroup, FormControlLabel, Checkbox,
    Card, CardContent, CardActions,
    Grid,
} from '@mui/material';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyTwoTone';
import copy from "copy-to-clipboard";
import './index.css';



class Sign extends React.Component {

    constructor(props) {
        super(props);
        this.comment = '';
        this.storage = window.localStorage;
        this.username = this.storage.getItem('username') || '';
        this.password = this.storage.getItem('password') || '';
        this.ref_username = null;
        this.ref_password = null;
        this.options = {
            'name': false,
            'gender': false,
            'stuid': false,
            'grade': false,
            'school': false,
            'major': false,
            'class': false,
        }
        this.state = {
            loading: false,
            error: false,
            message: '',
            data: null,
        };
    }

    getData() {
        this.username = this.username === '' ? this.ref_username.value : this.username;
        this.password = this.password === '' ? this.ref_password.value : this.password;
        this.comment = this.comment === null ? '' : this.comment.value;
        if (this.username.length === 0 || this.password.length === 0) {
            this.setState({
                error: true,
                message: 'Username and password are required'
            });
            return;
        }
        this.setState({
            loading: true,
            error: false,
            message: '',
            data: null,
        });
        this.storage.setItem('username', this.username);
        this.storage.setItem('password', this.password);
        var formData = new FormData();
        formData.append('username', this.username);
        formData.append('password', this.password);
        formData.append('comment', this.comment);
        var options = [];
        for (var key in this.options) {
            if (this.options[key])
                options.push(key);
        }
        formData.append('options', options);
        axios.post('/api/sign', formData).then(res => {
            if (res.data.status === 'ok') {
                this.setState({
                    error: false,
                    message: 'ok',
                    data: res.data.sign,
                });
            } else {
                this.setState({
                    error: true,
                    message: res.data.message,
                    data: null,
                });
            }
        }).catch(err => {
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
        }).finally(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <>
                <main>
                    <div className="signPaper" >
                        <h1>签发代码</h1>
                        {(this.username.length === 0 || this.password.length === 0) ? <>
                            <TextField
                                required
                                fullWidth
                                id="username-input-field"
                                inputRef={(ref) => { this.ref_username = ref; }}
                                label="学号"
                                defaultValue={this.username.value}
                                style={{ marginTop: '20px', wordBreak: "break-all" }}
                            />
                            <TextField
                                required
                                fullWidth
                                id="passsword-input-field"
                                inputRef={(ref) => { this.ref_password = ref; }}
                                label="信息门户密码"
                                type='password'
                                defaultValue={this.password.value}
                                style={{ marginTop: '20px', wordBreak: "break-all" }}
                            />
                        </> : <>
                            <Button variant="contained" color="primary" onClick={() => {
                                this.username = '';
                                this.password = '';
                                this.storage.removeItem('username');
                                this.storage.removeItem('password');
                                this.setState({
                                    error: false,
                                    data: null,
                                });
                            }}>
                                点击按钮重置{this.username}密码
                            </Button>
                        </>}
                        <div className="form-group" style={{ marginTop: '20px' }}>
                            <FormGroup>
                                <Grid container spacing={0}>
                                    <Grid item xs={4}>
                                        <FormControlLabel disabled control={<Checkbox size="small" onChange={(event) => { this.options.name = event.target.checked }} />} label="姓名" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel control={<Checkbox size="small" onChange={(event) => { this.options.stuid = event.target.checked }} />} label="学号" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel disabled control={<Checkbox size="small" />} label="性别" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel disabled control={<Checkbox size="small" />} label="学院" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel disabled control={<Checkbox size="small" />} label="年级" />
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel disabled control={<Checkbox size="small" />} label="专业" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel disabled control={<Checkbox size="small" />} label="班级" />
                                    </Grid>
                                </Grid>
                            </FormGroup>
                        </div>
                        <TextField
                            required
                            fullWidth
                            id="sign-input-field"
                            inputRef={(ref) => { this.comment = ref; }}
                            label="无可奉告"
                            defaultValue=""
                            multiline={true}
                            style={{ marginTop: '20px', wordBreak: "break-all" }}
                        />
                        <div className="sign-button-container" style={{ marginTop: '20px', textAlign: "right", display: "grid", gridTemplateColumns: "auto 1fr" }}>
                            <div style={{ marginTop: '-15px', opacity: 0.6, textAlign: "left" }}>
                                <font size="2">请输入要签名的发言</font>
                            </div>
                            <div>
                                <Button variant="contained" color="primary" size="middle"
                                    disabled={this.state.loading === true ? true : false}
                                    onClick={() => { this.getData(); }}>
                                    {this.state.loading === true ? 'Loading...' : 'Sign'}
                                </Button>
                            </div>
                        </div>
                        <div className="sign-result" style={{
                            display: this.state.message === '' ? 'none' : 'inline', marginTop: '20px', textAlign: "left"
                        }}>
                            <div style={{ marginTop: '-30px', textAlign: "left", display: "grid", gridTemplateColumns: "auto 1fr" }}>
                                {this.state.message === 'ok' ? <>
                                    <div>
                                        <CheckCircleTwoToneIcon color="success" sx={{ fontSize: 30, color: "success" }}></CheckCircleTwoToneIcon>
                                    </div>
                                    <div style={{ marginTop: '2px', color: "green", fontSize: "20px" }}>
                                        <b>签发成功！</b>
                                    </div>
                                </> : <>
                                    <div>
                                        <CancelTwoToneIcon sx={{ fontSize: 30, color: "#D32F2F" }}></CancelTwoToneIcon>
                                    </div>
                                    <div style={{ marginTop: '2px', color: "#D32F2F", fontSize: "20px" }}>
                                        <b>签发失败！</b>
                                    </div>
                                </>
                                }
                            </div>
                            <div className="verify-result-message" style={{ marginTop: '20px' }}>
                                {this.state.message === 'ok' ? <>
                                    <div style={{ fontSize: "14px" }}>
                                        <Card sx={{ color: '#388E3C' }}>
                                            <CardContent sx={{ wordBreak: 'break-all' }}>
                                                <p><b>身份代码:</b></p>
                                                {this.state.data}
                                            </CardContent>
                                            <CardActions style={{ flexDirection: 'row-reverse' }}>
                                                <Button size="small"
                                                    color="success"
                                                    variant="contained"
                                                    onClick={() => {
                                                        copy(this.state.data);
                                                    }}>
                                                    <FileCopyTwoToneIcon />复制结果
                                                </Button>
                                            </CardActions>
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

export default Sign;

