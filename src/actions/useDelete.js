const API_URL = process.env.REACT_APP_API_URL;

const useDelete = (handleDeleteSuccess: () => {}, errorHandler: () => {}) => {
    const initiateDelete = async (id) => {
        const url = new URL(`${ API_URL }/delete/${ id }`);
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (response.status >= 400) {
            errorHandler("Unable to delete file");
            return;
        }

        let jsonResponse;
        try {
            jsonResponse = await response.json();
        } catch(error) {
            errorHandler("Unable to parse delete repsonse");
            return;
        }

        handleDeleteSuccess(jsonResponse);
    }

    return { initiateDelete };
};

export default useDelete;
