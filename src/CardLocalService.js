import BalanceService from "./services/BalanceService";

class CardLocalService {
    saveCard = card => {
        const ids = this.getIds();
        if (!ids.includes(card.id)) {
            ids.push(card.id);
            this.setIds(ids);
            localStorage.setItem(card.id,JSON.stringify(card));
        }
    }
    getIds = () => {
        const ids = JSON.parse(localStorage.getItem('ids'));
        return ids ? ids : [];
    }
    setIds = ids => localStorage.setItem('ids',JSON.stringify(ids));
    getCard = id => JSON.parse(localStorage.getItem(id));
    getAllCards = () => {
        const ids = this.getIds();
        return ids.map( id => this.getCard(id));
    }
    updateCardBalance = card => BalanceService.getBalance({
            card: card.number,
            password: card.password,
        })
        .then( balance => {
            const newCard = {...card, balance };
            localStorage.setItem(card.id, JSON.stringify(newCard));
            return balance;
        })
        .catch(e => {
            console.error('asdas')
        });
    deleteCard = id => {
        localStorage.removeItem(id);
        const ids = this.getIds();
        const newIds = ids.filter(x => x !== id);
        this.setIds(newIds);
    }

}

export default new CardLocalService();