const getYieldForPlant = plant => {
    return plant.yield;
};

const getYieldForCrop = plant => {
    return getYieldForPlant(plant.crop) * plant.numCrops;
};

const getTotalYield = ({ crops }) => {
    const totalCrops = crops.map(crop => getYieldForCrop(crop));
    const totalYield = totalCrops.reduce((prev, curr) => prev + curr, 0);
    return totalYield;
};

const getCostsForCrop = ({ crops }) => {
    const costs = crops.map(crop => getYieldForCrop(crop) * crop.crop.cost);
    return Math.round(costs);
};

const getRevenueForCrop = ({ crops }) => {
    const revenue = crops.map(crop => getYieldForCrop(crop) * crop.crop.salePrice);
    return Math.round(revenue);
};

const getProfitForCrop = ({ crops }) => {
    const revenue = crops.map(crop => getYieldForCrop(crop) * crop.crop.salePrice);
    const costs = crops.map(crop => getYieldForCrop(crop) * crop.crop.cost);
    return Math.round(revenue - costs);
};

const getTotalProfit = ({ crops }) => {
    const revenue = crops.map(crop => getYieldForCrop(crop) * crop.crop.salePrice);
    const costs = crops.map(crop => getYieldForCrop(crop) * crop.crop.cost);
    const totalRevenue = revenue.reduce((prev, curr) => prev + curr, 0);
    const totalCosts = costs.reduce((prev, curr) => prev + curr, 0);
    return Math.round(totalRevenue - totalCosts);
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