const {assert, expect} = require('chai')

const KryptoBird = artifacts.require('./KryptoBird')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('KryptoBird', (accounts) => {
    let contract;

    before(async () => {
        contract = await KryptoBird.deployed();
    })
    
    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = contract.address;

            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, 0x0);
        })

        it('has a name', async () => {
            const name = await contract.name();

            assert.equal(name, 'KryptoBird');
        })

        it('has a symbol', async () => {
            const symbol = await contract.symbol();

            assert.equal(symbol, 'KBIRDZ');
        })
    })

    describe('minting', async () => {
        it('creates a new token', async () => {
            const result = await contract.mint('https...1');
            const totalSupply = await contract.totalSupply();

            // success
            assert.equal(totalSupply, 1);

            const event = result.logs[0].args;

            assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'from is the contract');
            assert.equal(event._to, accounts[0], 'to is msg.sender');

            // failure
            await contract.mint('https...1').should.be.rejected;
        })
    })

    describe('indexing', async () => {
        it('lists KryptoBirdz', async () => {
            await contract .mint('http...2');
            await contract .mint('http...3');
            await contract .mint('http...4');

            const totalSupply = await contract.totalSupply();

            let result = [];
            let KryptoBird;

            for (i = 1; i <= totalSupply; i++) {
                KryptoBird = await contract.kryptoBirdz(i - 1);

                result.push(KryptoBird);
            }

            let expected = ['https...1', 'http...2', 'http...3', 'http...4'];

            assert.equal(result.join(','), expected.join(','));
        })
    }) 

})