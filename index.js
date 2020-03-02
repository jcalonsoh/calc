const path = require("path");

const { getPolicy } = require(path.resolve('./src/policy'));
const Hapi = require('@hapi/hapi');

const url = "https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy";
const settings = { method: "Get" };

const { getCoverage } = require(path.resolve('./src/coverage'));

const Worker = require(path.resolve('./src/worker'));

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
            const workers = policy['policy']['workers'];
            const coverage = await getCoverage;
            const health = coverage['health'];
            const dental = coverage['dental'];
            const age_limit = coverage['age_limit'];
            const company_percentage = policy['policy']['company_percentage'];
            const has_dental_care = policy['policy']['has_dental_care'];

            let getCovWrkr = [];

            workers.forEach(function (element) {
                if (element['childs'] >= 2) {
                    var price_health = health['two'];
                    var price_dental = dental['two'];
                } else if (element['childs'] === 1) {
                    var price_health = health['one'];
                    var price_dental = dental['one'];
                } else {
                    var price_health = health['cero'];
                    var price_dental = dental['cero'];
                }
                const wrkr = new Worker(element['age'], element['childs'], price_health, price_dental, has_dental_care, company_percentage, age_limit);
                getCovWrkr.push(wrkr.getCoverage());
            });
            let result = {
                "workers": getCovWrkr,
                "age_limit": age_limit,
                "company_percentage": company_percentage,
                "has_dental_care": has_dental_care,
            };
            console.log(JSON.stringify(result));
            return res.response(JSON.stringify(result, null, 4)).type('application/json');
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