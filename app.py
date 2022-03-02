#-*-coding:utf-8-*-
from cmath import sin
from inspect import signature
import json
import hashlib
from base64 import b85encode, b85decode
from operator import le
from time import time
from flask import Flask, jsonify, request
from utils import sso
from config import SALT

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Sign your identity!'


@app.route('/sign', methods=['POST'])
def sign():
    username = request.form['username']
    password = request.form['password']
    comment = request.form['comment']
    options = request.form['options']
    if username == '' or password == '':
        return jsonify({'status': 'error', 'message': '用户名密码可不敢不填'}), 400
    if comment == '':
        comment = '无可奉告'

    print(username, password, comment, options)
    user_data = sso.get_user_info(username, password)
    if user_data is None:
        return jsonify({
            'status': 'error',
            'message': "用户名或密码可能错了, 也可能是用的人太多, 总之这次登录失败了"
        }), 500
    sign_data = {}

    # Get the user info
    if "name" in options:  # 姓名
        sign_data["name"] = user_data["XM"]
    if "gender" in options:  # 性别
        sign_data["gender"] = user_data["XBDM_DISPLAY"]
    if "stuid" in options:  # 学号
        sign_data["stuid"] = user_data["XH"]
    else:
        md5 = hashlib.md5()
        nbytes = user_data["XH"].encode("utf-8")
        for i in range(10):
            md5.update(SALT)
            nbytes = md5.digest()
            md5.update(nbytes)
        sign_data["stuid"] = md5.hexdigest()

    if "grade" in options:  # 年级
        sign_data["grade"] = "{}学制-{}级".format(user_data["XSLXDM_DISPLAY"],
                                               user_data["XZNJ"])
    if "school" in options:  # 学院
        sign_data["school"] = user_data["DWDM_DISPLAY"]
    if "major" in options:  # 专业
        sign_data["major"] = user_data["ZYDM_DISPLAY"]
    if "class" in options:  # 班级
        sign_data["class"] = user_data["BJDM"]

    sign_data["comment"] = comment
    sign_data["sign_time"] = int(time())

    # Generate signature
    sha256 = hashlib.sha256()
    data_bytes = json.dumps(sign_data, ensure_ascii=False).encode("utf-8")
    sha256.update(data_bytes)
    sha256.update(SALT)
    sha256.update(sign_data["sign_time"].to_bytes(8, 'big'))
    sign_bytes = sha256.digest()

    # Return the signature
    base85_sign = "{}/{}".format(
        b85encode(data_bytes).decode('utf-8'),
        b85encode(sign_bytes).decode('utf-8'))

    return jsonify({'status': 'ok', 'sign': base85_sign})


@app.route('/verify', methods=['POST'])
def verify():
    sign = request.form['sign']
    if sign == '':
        return jsonify({'status': 'error', 'message': '没有提供校验内容，无法验证'}), 400
    try:
        #Decode the signature
        sign = sign.replace(' ', '').replace('\n', '').replace('\r', '')
        raw_str, sign_str = sign.split('/')
        data_bytes = b85decode(raw_str)
        data_json = json.loads(b85decode(raw_str).decode('utf-8'))

        # Verify the signature
        correct_sha256 = hashlib.sha256()
        correct_sha256.update(data_bytes)
        correct_sha256.update(SALT)
        correct_sha256.update(data_json["sign_time"].to_bytes(8, 'big'))
        correct_sign_bytes = correct_sha256.digest()
        sign_bytes = b85decode(sign_str.encode('utf-8'))

        if sign_bytes != correct_sign_bytes:
            return jsonify({'status': 'error', 'message': '校验位错误，可能是内容被篡改或复制时丢失字符'}), 403
        else:
            return jsonify({'status': 'ok', 'data': data_json})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': '因为Base85结构受损验证失败'}), 403


if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(host="localhost", port=8080, debug=True)