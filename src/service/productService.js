import Util from 'util/util.js';
const _util = new Util();

export class ProductService {
    login(info) {
        return _util.request({
            url: '/manage/user/login.do',
            type: 'post',
            data: info
        })
    };

    checkInfo(info) {
        if (typeof info.name != 'string' || info.nmae == '') {
            return {
                status: false,
                msg: 'product name can not be empty'
            }
        }

        if (typeof info.price != 'string' || info.price == '') {
            return {
                status: false,
                msg: 'price can not be empty'
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

    loadProductList(pageNum) {
        return _util.request({
            url: '/manage/product/list.do',
            type: 'post',
            data: { pageNum: pageNum }
        })
    }

    setStatus(info) {
        return _util.request({
            url: '/manage/product/set_sale_status.do',
            type: 'post',
            data: info
        })
    }

    getSearch(info) {

        return _util.request({
            url: '/manage/product/search.do',
            type: 'post',
            data: info
        })
    }

    getClass(classId) {
        let data = {
            categoryId: classId || 0
        };
        return _util.request({
            url: '/manage/category/get_category.do',
            type: 'post',
            data: data
        })
    }

    checkProduct(product) {
        let result = {
            status: true,
            msg: 'approve'
        }

        let check = checkInfo(product);
        if (!check) {
            return result;
        } else {
            return check;
        }
    }

    saveProduct(data) {
        return _util.request({
            url: '/manage/product/save.do',
            type: 'post',
            data: data
        })
    }

    editProduct(id) {
        return _util.request({
            url: '/manage/product/detail.do',
            type: 'post',
            data: id || 0
        })
    }
}