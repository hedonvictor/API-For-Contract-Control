const { sequelize, Profile, Contract, Job } = require('../../models');


async function seedDatabase() {

    const count = await Profile.count();
    if(count > 0) {
        console.log('Registros ja existentes, seeder não executado');
        return;
    }

    try {
        await sequelize.sync({ force: true });

        const profile = await Profile.create({
            name: 'Hédon',
            profession: 'Developer',
            balance: 1000,
            type: 'client',
        });

        const contract = await Contract.create({
            terms: 'Contrato 1',
            clientId: profile.id,
            contractorId: profile.id,
            operationDate: new Date(),
            status: 'active',
        });

        await Job.create({
            contractId: contract.id,
            description: 'Job 1',
            operationDate: new Date(),
            price: 200,
            paid: false,
        });

        console.log('Dados criados com sucesso!');
    } catch (error) {
        console.error('Erro ao criar os dados:', error);
    }
}

module.exports = { seedDatabase };