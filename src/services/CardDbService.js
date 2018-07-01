import moment from 'moment';
import currency from 'currency.js';

import BalanceService from './BalanceService';

// service intended to save the cards data using IndexedDB

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

class CardDbService{
    constructor(){
        if (!('indexedDB' in window)) {
            throw 'This browser doesn\'t support IndexedDB';
        }
        this.indexedDB = window.indexedDB;
    }

    

    init = () => {
        // Open (or create) the database
        const openRequest = this.indexedDB.open("ValesMilDatabase", 2);

        // Create the schema
        openRequest.onupgradeneeded = function() {
            var db = openRequest.result;
            var cardStore = db.createObjectStore("CardStore", {keyPath: "id"});
            var balanceStore = db.createObjectStore("BalanceStore", { autoIncrement : true });
            balanceStore.createIndex('cardId', 'cardId', {unique: false});
        };

        openRequest.onerror = function(event) {
            // Hacer algo con request.errorCode!
            console.error(event);
        };
        openRequest.onsuccess = event => {
        // Hacer algo con request.result!
            console.debug('indexedBD opened');
            this.db = openRequest.result
            this.onDbOpened();
        };
    }

    getWriteTx = stores => {
        const tx = this.db.transaction(stores, 'readwrite');
        tx.oncomplete = function(event) {
            console.debug('transaction complete');
        };
        
        tx.onerror = function(event) {
            // Don't forget to handle errors!
            console.error(event)
        };
        return tx;
    }

    getReadTx = stores => {
        const tx = this.db.transaction(stores);
        tx.oncomplete = function(event) {
            console.debug('transaction complete');
        };
        
        tx.onerror = function(event) {
            // Don't forget to handle errors!
            console.error(event)
        };
        return tx;
    }

    saveCard = card => {
        const tx = this.getWriteTx(['CardStore']);
        const store = tx.objectStore('CardStore');
        const request = store.add(card);
        request.onsuccess = (e) => console.debug('card saved');
        request.onerror = (e) => console.error(e);
    }
    deleteCard = id => {
        const tx = this.getWriteTx(['CardStore']);
        const store = tx.objectStore('CardStore');
        const request = store.delete(id);
        request.onsuccess = (e) => console.debug('card deleted');
        request.onerror = (e) => console.error(e);
    }
    getCard = id => {
        const tx = this.getReadTx(['CardStore']);
        const store = tx.objectStore('CardStore');
        store.get(id);
        return tx.complete();
    }
    getAllCards = onSuccess => {
        const tx = this.getReadTx(['CardStore']);
        const store = tx.objectStore('CardStore');
        const request = store.getAll();
        request.onsuccess = onSuccess;
    }
    getCardBalanceHistory = (id, onSuccess) => {
        const tx = this.getReadTx(['BalanceStore']);
        const store = tx.objectStore('BalanceStore');
        const request = store.index('cardId').getAll(id);
        request.onsuccess = onSuccess;
    }
    updateCardBalance = (card) => BalanceService.getBalance({
            card: card.number,
            password: card.password,
        })
        .then( balanceText => {
            const balance = currency(balanceText);
            const tx = this.getWriteTx(['BalanceStore']);
            const store = tx.objectStore('BalanceStore');
            const today = moment();
            const request = store.add({ timestamp: today.format("l"), balance: balance.value, cardId: card.id });
            request.onsuccess = (e) => { console.debug('balance saved'); }
            request.onerror = (e) => {  console.error('error'); }
            return balance.value;
        })
        .catch(e => {
            console.error('asdas')
        });

        
    
}

export default new CardDbService();