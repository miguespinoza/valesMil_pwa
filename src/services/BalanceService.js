import axios from 'axios';

const fakeAPI = 'http://private-094e16-valesmil.apiary-mock.com/api/valesmil?code=1EcCTvok6a9XXKd6CjzoV2dziSIJgONKHQo5RTg105hnFPDTVTgT6g==';
const realAPI = 'https://valesmil2.azurewebsites.net/api/valesmil?code=1EcCTvok6a9XXKd6CjzoV2dziSIJgONKHQo5RTg105hnFPDTVTgT6g==';

class BalanceService{
    getBalance = ({
        card,
        password,
    })=> {
        console.log(`card: ${card} = password: ${password}`);
        return axios.post(realAPI,
            {card, password},
            {headers: {'Content-Type': 'application/json'}}
        )
        .then(r => r.data)
        .catch(error => {
            console.error(error);
            throw error;
        })
    }
}

export default new BalanceService();