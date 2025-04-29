export const CURRENCY = 'лв.'
export const DATE_LOCALE = 'bg-BG'

export const STORAGE_KEYS = {
    DIARY_DATA: 'financial-diary-data',
    TRANSACTIONS: 'financial-diary-transactions',
}

export const DEFAULT_VALUES = {
    funds: 2000,
    basicExpenses: [
        {
            name: 'Кредити',
            expenses: [{ id: 'credits-1', name: 'Ипотека', amount: 500 }],
        },
        {
            name: 'Комунални услуги',
            expenses: [
                { id: 'communal-1', name: 'Ток', amount: 100 },
                { id: 'communal-2', name: 'Вода', amount: 30 },
                { id: 'communal-3', name: 'Парно', amount: 200 },
                { id: 'communal-4', name: 'Интернет', amount: 20 },
                { id: 'communal-5', name: 'Телевизия', amount: 20 },
                { id: 'communal-6', name: 'Телефон', amount: 20 },
            ],
        },
        {
            name: 'Абонаменти',
            expenses: [
                { id: 'subscriptions-1', name: 'YouTube Premium', amount: 28 },
                { id: 'subscriptions-2', name: 'Spotify Premium', amount: 15 },
            ],
        },
    ],
    otherExpenses: [
        {
            name: 'Жизнени нужди',
            expenses: [
                { id: 'life-1', name: 'Храна', amount: 500 },
                { id: 'life-2', name: 'Здраве', amount: 50 },
                { id: 'life-3', name: 'Спорт', amount: 100 },
            ],
        },
        {
            name: 'Други',
            expenses: [{ id: 'other-1', name: 'Неразпределени', amount: 100 }],
        },
    ],
    transactions: [],
}
