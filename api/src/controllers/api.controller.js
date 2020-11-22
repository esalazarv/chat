 const ApiRepository = () => {
    return {
        info(req, res) {
            return res.json({
                name: 'Chat API',
                version: '1.0.0'
            });
        },
    }
};

 export default ApiRepository;