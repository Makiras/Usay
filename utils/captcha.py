import ddddocr
import requests

ocr = ddddocr.DdddOcr()


def recognize_captcha(captcha_id: int) -> str:
    """
    Recognize captcha from img_url
    """
    res = requests.get(
        "https://auth.bupt.edu.cn/authserver/captcha?captchaId=" +
        str(captcha_id))
    if res.status_code != 200:
        return None
    captcha_text = ocr.classification(res.content)
    return captcha_text