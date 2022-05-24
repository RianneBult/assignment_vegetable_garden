const getYieldForPlant = (plant, environmentFactors) => {
    if (!plant.hasOwnProperty("factor")) {
        return plant.yield;
    };

    switch (environmentFactors.sun) {
        case "low":
            sun = (plant.yield / 100) * (100 + plant.factor.sun.low);
            break;
        case "medium":
            sun = (plant.yield / 100) * (100 + plant.factor.sun.medium);
            break;
        case "high":
            sun = (plant.yield / 100) * (100 + plant.factor.sun.high);
            break;
        default:
            break;
    };

    switch (environmentFactors.wind) {
        case "low":
            wind = (sun / 100) * (100 + plant.factor.wind.low);
            break;
        case "medium":
            wind = (sun / 100) * (100 + plant.factor.wind.medium);
            break;
        case "high":
            wind = (sun / 100) * (100 + plant.factor.wind.high);
            break;
        default:
            break;
    };

    switch (environmentFactors.temperature) {
        case "low":
            temperature = (wind / 100) * (100 + plant.factor.temperature.low);
            break;
        case "medium":
            temperature = (wind / 100) * (100 + plant.factor.temperature.medium);
            break;
        case "high":
            temperature = (wind / 100) * (100 + plant.factor.temperature.high);
            break;
        default:
            break;
    };
    return temperature;
};

const getYieldForCrop = (plant, environmentFactors) => {
    return getYieldForPlant(plant.crop, environmentFactors) * plant.numCrops;
};

const getTotalYield = ({ crops }, environmentFactors) => {
    const totalCrops = crops.map(crop => getYieldForCrop(crop, environmentFactors));
    const totalYield = totalCrops.reduce((prev, curr) => prev + curr, 0);
    return totalYield;
};

const getCostsForCrop = ({ crops }) => {
    const costs = crops.map(crop => crop.crop.yield * crop.numCrops * crop.crop.cost);
    return Number(costs);
};

const getRevenueForCrop = ({ crops }, environmentFactors) => {
    const revenue = crops.map(crop => getYieldForCrop(crop, environmentFactors) * crop.crop.salePrice);
    return Number(revenue);
};

const getProfitForCrop = ({ crops }, environmentFactors) => {
    const profit = getRevenueForCrop({ crops }, environmentFactors) - getCostsForCrop({ crops });
    return Math.round(profit * 10) / 10;
};

const getTotalProfit = ({ crops }, environmentFactors) => {
    const revenue = crops.map(crop => getYieldForCrop(crop, environmentFactors) * crop.crop.salePrice)
        .reduce((prev, curr) => prev + curr, 0);
    const costs = crops.map(crop => crop.crop.yield * crop.numCrops * crop.crop.cost)
        .reduce((prev, curr) => prev + curr, 0);

    return revenue - costs;
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
};