const fakeAPI = 'http://private-094e16-valesmil.apiary-mock.com/api/valesmil?code=1EcCTvok6a9XXKd6CjzoV2dziSIJgONKHQo5RTg105hnFPDTVTgT6g==';
const realAPI = "https://valesmilapi2.azurewebsites.net/balance";

const BalanceService = {
  makeBalanceRequest: ({ card, password }) => ({
      url: fakeAPI,
      method: "POST",
      send: { card, password },
      category: "balance"
  })
};

export default BalanceService;
