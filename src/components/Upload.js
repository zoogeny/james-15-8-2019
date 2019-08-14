import React from "react";
import PropTypes from 'prop-types';
import "./Upload.scss";

const Upload = (props) => {
    const handleFileSelect = (event, initiateUpload) => {
        const file = event.target.files[0]
        initiateUpload(file);
    };

    return (
        <form className="upload" method="post" encType="multipart/form-data">
            <input
                type="file"
                className="upload__input"
                name="upload"
                id="upload"
                accept=".jpg,.png"
                onChange={ event => handleFileSelect(event, props.initiateUpload) }>
            </input>
            <label htmlFor="upload" className="upload__label">UPLOAD</label>
        </form>
    );
}

Upload.propTypes = {
    initiateUpload: PropTypes.func
};

Upload.defaultProps = {
    initiateUpload: () => {}
};

export default Upload;
