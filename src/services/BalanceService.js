import axios from 'axios';

const fakeAPI = 'http://private-094e16-valesmil.apiary-mock.com/api/valesmil';
const realAPI = 'https://valesmil2.azurewebsites.net/api/valesmil?code=1EcCTvok6a9XXKd6CjzoV2dziSIJgONKHQo5RTg105hnFPDTVTgT6g==';

class BalanceService{
    getBalance = ({
        card,
        password,
    })=> fetch( fakeAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            card,
            password,
        }),
    })
        .then(r => {
            debugger;
            const s = String(r.text());
            const n = Number(s.match(/\d+/g).map(Number))
            debugger;
            return n;
        })
        .catch(error => {
            console.error(error);
            throw error;
        }); 
}

export default new BalanceService();