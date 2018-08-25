export class Util {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: (res) => {
                    // console.log(res);
                    if (res.status == 0) {
                        typeof resolve == 'function' && resolve(res.data, res.msg);
                    } else if (res.status == 10) {
                        this.doLogin();
                    } else {
                        typeof reject == 'function' && reject(res.data || res.msg);
                    }
                },
                error: (err) => {
                    typeof reject == 'function' && reject(err.statusText);
                }
            })
        })
    };

    doLogin() {
        window.location.href = '/login?redirect' + encodeURIComponent(window.location.pathname);
    };

    sendErr(err) {
        alert(err);
    };

    successTips(res) {
        alert(res);
    };
    
    getUrl(name) {
        let queryurl = window.location.search.split('?')[1] || ''
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = queryurl.match(reg);

        return result ? decodeURIComponent(result[2]) : null;
    }

} 