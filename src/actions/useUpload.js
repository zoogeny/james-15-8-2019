const API_URL = process.env.REACT_APP_API_URL;

const ALLOWED_TYPES = {
    "image/jpeg": true,
    "image/png": true
};

const MAX_SIZE = 10 * 1024 * 1024;

const useUpload = (handleUploadSuccess: () => {}, errorHandler: () => {}) => {
    const initiateUpload = async (file) => {

        if (!(file.type in ALLOWED_TYPES)) {
            errorHandler("Selected file type not allowed");
            return;
        }

        if (file.size > MAX_SIZE) {
            const prettyErrorMaxSize = `${ Math.floor(MAX_SIZE / 1024 / 1024) }MB`;
            errorHandler(`Selected file above max file size of ${ prettyErrorMaxSize }.`);
            return;
        }

        const url = new URL(`${ API_URL }/upload`);

        const data = new FormData();
        data.append("upload", file);

        let response;
        try {
            response = await fetch(url, {
                method: "POST",
                body: data // This is your file object
            });
        } catch(error) {
            errorHandler("Unable to connect to server");
            return;
        }

        let responseJson;

        if (response.status >= 400) {
            try {
                responseJson = await response.json();
            } catch (error) {
                responseJson = ""
            }

            const responseError = responseJson.error ? `: ${ responseJson.error }` : "";
            errorHandler(`Unable to upload file ${ responseError }`);

            return;
        }

        try {
            responseJson = await response.json();
        } catch(error) {
            errorHandler("Invalid response from server during upload");
            return;
        }

        handleUploadSuccess(responseJson);
    }

    return { initiateUpload };
};

export default useUpload;
