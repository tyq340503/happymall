// const FileUpload = require('react-fileupload');
import React from 'react';
import FileUpload from 'util/upload/FileUpload.js';


class Upload extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        /*set properties*/
        const options = {
            baseUrl: '/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            uploadSuccess: (res) => this.props.onSuccess(res.data),
            uploadError: this.props.onErr
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options} >
                <button ref="chooseBtn">choose</button>
                <button ref="uploadBtn">upload</button>
            </FileUpload>
        )
    }
}