export default {
    echo: {
        requestOptions: {
            api: 'echo',
            v: '1.0',
            data: {}
        },
        middleware: async (params) => {
            return params;
        }
    },
}