import { action, computed, makeObservable, observable } from "mobx"

class ListStore{
    items = []
    categories = []

    constructor(){
        makeObservable(this, {
            items: observable,
            categories: observable,
            addCategories: action,
            onAdd: action,
            total: computed,
        })
    }
    onAdd = (list: any) => {
        this.items = list
    }

    addCategories = (listCategories: any) => {
        this.categories = listCategories;
    }

    get total(){
        return this.items.length
    }
}

export const listStore = new ListStore()