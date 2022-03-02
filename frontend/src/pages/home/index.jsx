import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink
} from "react-router-dom";
import { Card, CardActions, CardContent, Button, Stack } from '@mui/material';
import './index.css';

export class NaviCard extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
        </CardContent>
        <CardActions
          style={{ flexDirection: 'row-reverse' }}>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to={this.props.link}
            style={{ marginRight: '10px' }}
          >
            {this.props.button}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <>
        <main>
          <div className="cards">
            <Stack spacing={2}>
              <NaviCard title="进行发言" description="有选择地公布你的身份信息并发言" button="说" link="/sign" />
              <NaviCard title="来查成分" description="看看别人的发言和公布的认证身份" button="查" link="/verify" />
              <NaviCard title="如何使用" description="阅读教程，了解这个系统如何工作" button="看" link="/about" />
            </Stack>
          </div>
        </main>
      </>
    );
  }

}

export default Home;