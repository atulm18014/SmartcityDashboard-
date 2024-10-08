class EnergyRenewableConsumptionItem {
    constructor(init) {
        Object.assign(this, init);
    }
}

class EnergyRenewableConsumption extends Array {
    constructor(items = -1) {
        if (Array.isArray(items)) {
            super(...items);
        } else {
            const newItems = [
                new EnergyRenewableConsumptionItem({
                    location: 'China',
                    year: 2019,
                    hydro: 1269.5,
                    solar: 223,
                    wind: 405.2,
                    other: 102.8
                }),
                new EnergyRenewableConsumptionItem({
                    location: 'Europe',
                    year: 2019,
                    hydro: 632.54,
                    solar: 154,
                    wind: 461.3,
                    other: 220.3
                }),
                new EnergyRenewableConsumptionItem({
                    location: 'USA',
                    year: 2019,
                    hydro: 271.16,
                    solar: 108,
                    wind: 303.4,
                    other: 78.34
                }),
                new EnergyRenewableConsumptionItem({
                    location: 'Brazil',
                    year: 2019,
                    hydro: 399.3,
                    solar: 5.5,
                    wind: 55.83,
                    other: 56.25
                }),
                new EnergyRenewableConsumptionItem({
                    location: 'Canada',
                    year: 2019,
                    hydro: 381.98,
                    solar: 4.3,
                    wind: 34.17,
                    other: 10.81
                }),
            ];
            super(...newItems);
        }
    }
}

// Example usage
const energyConsumption = new EnergyRenewableConsumption();
console.log(energyConsumption);
