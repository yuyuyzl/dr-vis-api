export default {
    echo: {
        //API定义
        requestOptions: {
            api: 'echo',
            v: '1.0',
            data: {}
        },
        //API实现
        middleware: async (params) => {
            return params;
        }
    },
}