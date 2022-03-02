#-*-coding:utf-8-*-
from typing import Dict
from flask import redirect
from lxml import etree
from utils.captcha import recognize_captcha
import requests
import re

captchaIdReg = re.compile(r"    id: '(.*?)'")


def get_user_info(stuid: str, password: str) -> Dict:
    """
    Verify user credentials
    """
    r = requests.session()
    r.headers = {
        'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.3987.149 Safari/537.36',
    }

    # Get the login page
    url = "https://auth.bupt.edu.cn/authserver/login"
    res = r.get(url)
    if res.status_code != 200:
        return None
    login_page = etree.HTML(res.text)
    execution_id = login_page.xpath(
        "/html/body/div[1]/div/form/div[5]/input[2]").pop().attrib["value"]
    captcha_id = captchaIdReg.findall(res.text)

    # Simulate login oauth
    url = "https://auth.bupt.edu.cn/authserver/login"
    data = {
        "username": stuid,
        "password": password,
        "submit": "登录",
        "type": "username_password",
        "execution": execution_id,
        "_eventId": "submit",
    }
    if len(captcha_id) != 0:
        data["captcha"] = recognize_captcha(captcha_id[0])
    res = r.post(url, data=data)

    # Simulate login STU
    url = "https://stu.bupt.edu.cn/login?service=https://stu.bupt.edu.cn/new/index.html"
    res = r.get(url)  # redirect to login page
    if res.status_code != 200:
        return None

    # Get the user info
    if r.get(
            "https://stu.bupt.edu.cn/xsfw/sys/swpubapp/indexmenu/getAppConfig.do?appId=4585275700341858&appName=jbxxapp"
    ).status_code != 200:
        return None  # for the config
    url = "https://stu.bupt.edu.cn/xsfw/sys/jbxxapp/modules/infoStudent/getStuBatchInfo.do"
    data = {
        "requestParamStr": "{{\"XSBH\":\"{}\"}}".format(stuid),
    }
    res = r.post(url, data=data)
    if res.status_code != 200:
        return {"XH": stuid}

    user_info = res.json()["data"]
    return user_info


if __name__ == "__main__":
    get_user_info("2018000123", "000123456")
