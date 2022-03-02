import React from "react";
import './index.css';
import byrio_slogan from '../../asset/images/byrio-slogan.svg';

class DangderouslySet extends React.Component {
    constructor() {
        super()
        this.state = {
            Html: '<div class="vditor-reset" id="preview" sytle="word-break: break-all"><h1 id="关于">关于</h1><h2 id="进行发言">进行发言</h2><ol><li><p>输入您的<strong>信息门户</strong>账号密码，我们会将这个信息存储在浏览器<strong>本地</strong>的<code>localstorage</code>中，并在每次进行签名发言时提交给服务器，用于模拟登录信息门户，服务器<strong>不会记录</strong>任何密码或个人信息。暂时<strong>不持支持校友用户</strong>。</p></li><li><p>选择您愿意公开的身份信息，目前有如下几种信息可以选择公开，<strong>信息均从stu.bupt.edu.cn获取，默认均不公开</strong></p><table><thead><tr><th>敏感</th><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>普通</th></tr></thead><tbody><tr><td>姓名</td><td></td><td>性别</td></tr><tr><td>学号</td><td></td><td>学院</td></tr><tr><td>专业</td><td></td><td>年级</td></tr><tr><td>班级</td><td></td><td><strong>签名时间</strong><br>（必选）</td></tr><tr><td></td><td></td><td><strong>身份特征码</strong><br>(与学号二选一)</td></tr></tbody></table><p>PS：身份特征码是您学号的<strong>加盐循环hash</strong>，盐足够长以避免彩虹表爆破。该策略是为了在您不愿意公开身份时，避免他人伪造您的身份进行发言（例如A在论坛匿名发布了签名，但与B撞匿名ID，同时B开始盗用A的身份）</p></li><li><p>在消息框中输入您的留言</p><p>    建议在二手交易时<strong>附上自己用来交流的账号信息</strong>，或要求<strong>对方输入与你用来交流的账号信息</strong>。该策略是为了防止你的签名代码被他人进行中间人攻击（例如校外的B，对校内的A,C进行两头骗）</p><p>    公开场合发布时，<strong>建议限定该签名的作用域</strong>（例如该签名仅在XXX群/XXX贴中有用）。该策略是为了避免遭受伪造身份的攻击（例如A在论坛上发言，并附上签名，B盗用这个签名来证明自己是北邮人）。</p></li><li><p>服务器会将信息及签名进行<code>base85</code>编码后，回传。<strong>该途径没有加密功能，只是签名</strong></p></li></ol><h2 id="来查成分">来查成分</h2><ol><li>粘贴别人提供给你的base85编码，服务器会进行解析，并返回相关信息（公开的信息，留言）。</li><li>请注意<strong>签名时间</strong>，如果签名过早，被盗用的可能性较大。</li></ol><h2 id="我们">我们</h2></div>'
        }
    }
    render() {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.state.Html }}></div>
        )
    }
}

class About extends React.Component {
    render() {
        return (
            <>
                <main>
                    <div className="aboutPaper">
                        <DangderouslySet />
                        <ul>
                            <a href="https://github.com/byrio">
                                <img src={byrio_slogan} alt="byrio-slogan" width="200px" />
                            </a>
                        </ul>
                    </div>
                </main>
            </>
        );
    }
}

export default About;

