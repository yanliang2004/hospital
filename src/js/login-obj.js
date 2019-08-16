var nonce;

var uname, pw;

var fn;

function init(loginFn) {
    fn = loginFn;
}

function setNonce(value) {

    nonce = value;

    console.log('nonce: ' + nonce);

    if (isUserPassReady()) {
        login();
    }

}

function setUserPass(vUser, vPass) {
    uname = vUser;
    pw = vPass;

    if (isNonceReady()) {
        login();
    }
}

function isNonceReady() {
    return nonce;
}

function isUserPassReady() {
    return uname && pw;
}

// fn(uname, loginHash)
function login() {

    var pwh = md5(uname + ':' + pw);

    var loginHash = md5(pwh + ':' + nonce);

    fn(uname, loginHash);

    console.log('uname: ', uname, ', loginHash: ', loginHash);

}

export default {
    init: init,
    setNonce: setNonce,
    setUserPass: setUserPass
};
