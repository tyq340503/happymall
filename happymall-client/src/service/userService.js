import Util from 'util/util.js';
const _util = new Util();

export class UserService {
    login(info) {
        return _util.request({
            url: '/manage/user/login.do',
            type: 'post',
            data: info
        })
    };

    checkInfo(info) {
        if (typeof info.username != 'string' || info.usernmae == '') {
            return {
                status: false,
                msg: 'username can not be empty'
            }
        }

        if (typeof info.password != 'string' || info.password == '') {
            return {
                status: false,
                msg: 'password can not be empty'
            }
        }

        return {
            status: true
        }
    }

    logOut() {
        return _util.request({
            url: '/user/logout.do',
            type: 'post'
        })
    }

    loadUserList(pageNum) {
        return _util.request({
            url: '/manage/user/list.do',
            type: 'post',
            data: { pageNum: pageNum }
        })
    }
}