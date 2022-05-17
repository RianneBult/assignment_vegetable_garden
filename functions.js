const getYieldForPlant = plant => {
    return plant.yield;
};

const getYieldForCrop = plant => {
    return getYieldForPlant(plant.crop) * plant.numCrops;
};



module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    // getTotalYield
};