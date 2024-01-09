import axios from 'axios'

function uploadFn(path,userForm) {
    const params = new FormData()
    for (var i in userForm) {
        params.append(i, userForm[i])
    }
    return axios.post(path, params, {
        headers: {
            // 提交的是一个表单文件
            "Content-Type": "multipart/form-data"
        }
    }).then(res=>res.data)
}

export default uploadFn;