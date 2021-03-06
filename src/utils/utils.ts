export interface myState {
    lists: {
        [key: number]: string
    },
    cards: {
        [key: number]: {
            [key: string]: number | string
        }
    },
};

export interface HomeProps {
    openBoard?: any,
    closeBoard?: any,
    handleSetOpenBoard?: any,
    handleSetCloseBoard?: any,
};

export interface Action {
    type: string,
    payload: any,
    listTitle: string,
    listId: string | number
    cardId: string | number,
    cardDetails: string | number,
};

export const convertArrayToObject = (array: any, key: string) => {
    const initialValue = {};
    return array.reduce((obj: any, item: any) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initialValue)
};

export const convertArrayToObject2 = (array: any) => {
    const initialValue = {};
    return array.reduce((obj: any, item: any) => {
        return {
            ...obj,
            [item[0]]: item[1],
        };
    }, initialValue)
};

export const cloneObject = <T>(source: T): T => {
    return JSON.parse(JSON.stringify(source)) as T;
};