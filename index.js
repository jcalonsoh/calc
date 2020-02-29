const { getPolicy } = require('./src/policy');
const Hapi = require('@hapi/hapi');

const url = "https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy";
const settings = { method: "Get" };

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (req, res) => {
            const policy = await getPolicy(url, settings);
            return res.response(policy['policy']).type('application/json');
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();