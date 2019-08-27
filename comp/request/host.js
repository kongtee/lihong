const env = location.href.match(/^http:\/\/(\w+).xxx.xx.com/) || [];
let host = location.protocol + '//api.xxx.xx.com';

if (env[1] === 'dev') {
    host = 'http://devapi.xxx.xx.com';
} else if (env[1] === 'test') {
    host = 'http://testapi.xxx.xx.com';
} else if (env[1] === 'pre') {
    host = 'http://preapi.xxx.xx.com';
}

export default host;
