const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
} = require("./functions");

describe("getYieldForPlant", () => {
    test("Get yield for plant with no environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
        };
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for plant with multiple environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: 20,
                    high: 40,
                },
                temperature: {
                    low: -50,
                    medium: -20,
                    high: 30,
                },
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temperature: "high",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(23.4);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });

    test("Get yield for crop, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: 20,
                    high: 40,
                },
                temperature: {
                    low: -50,
                    medium: -20,
                    high: 30,
                },
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temperature: "high",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(23.4);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });

    test("Calculate total yield with multiple crops, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: 20,
                    high: 40,
                },
                temperature: {
                    low: -50,
                    medium: -20,
                    high: 30,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                    low: 20,
                    medium: 40,
                    high: 60,
                },
                wind: {
                    low: -50,
                    medium: -30,
                    high: 20,
                },
                temperature: {
                    low: 10,
                    medium: 30,
                    high: 50,
                },
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temperature: "high",
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops }, environmentFactors)).toBe(21.78);
    });
});

describe("getCostsForCrop", () => {
    test("Calculate costs for a crop", () => {
        const corn = {
            name: "corn",
            cost: 2,
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 5 }]
        expect(getCostsForCrop({ crops })).toBe(30);
    });
});

describe("getRevenueForCrop", () => {
    test("Calculate revenue for a crop", () => {
        const corn = {
            name: "corn",
            cost: 2,
            yield: 3,
            salePrice: 4,
        };
        const crops = [{ crop: corn, numCrops: 5 }];
        expect(getRevenueForCrop({ crops })).toBe(60);
    });

    test("Calculate revenue for a crop, with environment factors", () => {
        const corn = {
            name: "corn",
            cost: 2,
            yield: 3,
            salePrice: 4,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: 20,
                    high: 40,
                },
                temperature: {
                    low: -50,
                    medium: -20,
                    high: 30,
                },
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temperature: "high",
        };
        const crops = [{ crop: corn, numCrops: 5 }];
        expect(getRevenueForCrop({ crops }, environmentFactors)).toBe(46.8);
    });
});

describe("getProfitForCrop", () => {
    test("Calculate profit for crop", () => {
        const corn = {
            name: "corn",
            cost: 2,
            yield: 3,
            salePrice: 4,
        };
        const crops = [{ crop: corn, numCrops: 5 }];
        expect(getProfitForCrop({ crops })).toBe(30);
    });

    test("Calculate profit for crop, with environment factors", () => {
        const corn = {
            name: "corn",
            cost: 2,
            yield: 3,
            salePrice: 4,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: 20,
                    high: 40,
                },
                temperature: {
                    low: -50,
                    medium: -20,
                    high: 30,
                },
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temperature: "high",
        };
        const crops = [{ crop: corn, numCrops: 5 }];
        expect(getProfitForCrop({ crops }, environmentFactors)).toBe(16.8);
    });
});

describe("getTotalProfit", () => {
    test("Calculate profit for multiple crops", () => {
        const corn = {
            name: "corn",
            cost: 2,
            yield: 3,
            salePrice: 4,
        };
        const pumpkin = {
            name: "pumpkin",
            cost: 3,
            yield: 4,
            salePrice: 6,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalProfit({ crops })).toBe(54);
    });

    test("Calculate profit for multiple crops, with environment factors", () => {
        const corn = {
            name: "corn",
            cost: 2,
            yield: 3,
            salePrice: 4,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: 20,
                    high: 40,
                },
                temperature: {
                    low: -50,
                    medium: -20,
                    high: 30,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            cost: 3,
            yield: 4,
            salePrice: 6,
            factor: {
                sun: {
                    low: 20,
                    medium: 40,
                    high: 60,
                },
                wind: {
                    low: -50,
                    medium: -30,
                    high: 20,
                },
                temperature: {
                    low: 10,
                    medium: 30,
                    high: 50,
                },
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temperature: "high",
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(53.28);
    });
});