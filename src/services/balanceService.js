//const fakeAPI = 'http://private-094e16-valesmil.apiary-mock.com/api/valesmil?code=1EcCTvok6a9XXKd6CjzoV2dziSIJgONKHQo5RTg105hnFPDTVTgT6g==';
const realAPI = "https://valesmilapi2.azurewebsites.net/balance";

const BalanceService = {
  getBalance: ({ card, password }) => {
    return fetch(realAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ card, password })
    })
      .then(r => r.json())
      .catch(error => {
        throw error;
      });
  }
};

export default BalanceService;
