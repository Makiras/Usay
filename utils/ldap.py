import ldap
from config import LDAP_USER, LDAP_PASSWORD, LDAP_SERVER, LDAP_BASE

def verify_user(stuid: str, password: str) -> bool:
    """
    Verify user credentials
    """
    ldap_filter = "uid=" + stuid

    try:
        ldap_conn = ldap.initialize(LDAP_SERVER)
        ldap_conn.simple_bind_s(LDAP_USER, LDAP_PASSWORD)
        ldap_result = ldap_conn.search_s(LDAP_BASE, ldap.SCOPE_SUBTREE, ldap_filter)
        if len(ldap_result) == 0:
            return False
        else:
            ldap_conn.unbind_s()
            ldap_conn.simple_bind_s(ldap_result[0]["dn"], password)
            return True
    except Exception as e:
        print(e)
        return False