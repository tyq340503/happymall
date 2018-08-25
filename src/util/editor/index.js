// const FileUpload = require('react-fileupload');
import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';

class Editor extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.loadEditor()
    }
    componentWillReceiveProps(props) {
        let change = this.props.defaultDetail != props.default;
        if (change) {
            return;
        }
        this.editor.setValue(props.detail);
    }
    loadEditor() {
        let element = this.refs['textarea'];

        this.editor = new Simditor({
            textarea: $(element),
            upload: {
                url: '/manage/product/richtext_img'
            }
            //optional options
        });
        this.bindEvent();
    }

    bindEvent() {
        this.editor.on('valueChanged', (e) => {
            this.props.valueChanged(this.editor.getValue);
        })
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
            <div >
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}