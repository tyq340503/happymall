import Util from 'util/util.js';
const _util = new Util();

export class UtilService {
    getCount() {
        return _util.request({
            url: '/manage/statistic/base_count.do'
            // type: 'post',
            // data: info
        })
    };

}