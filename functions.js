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


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield
};