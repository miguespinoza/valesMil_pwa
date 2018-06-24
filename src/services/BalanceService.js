import axios from 'axios';

class BalanceService{
    getBalance = ({
        card,
        password,
    })=> fetch('https://valesmil2.azurewebsites.net/api/valesmil?code=1EcCTvok6a9XXKd6CjzoV2dziSIJgONKHQo5RTg105hnFPDTVTgT6g==', {
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
            return r.text()})
        .catch(error => {
            console.error(error);
            throw error;
        }); 
}

export default new BalanceService();