const path = require('path');

const DIST = './dist';
const SRC = './src';
const IN_SRC = (subPath = "") => path.resolve(__dirname, SRC + subPath);
const IN_DIST = (subPath = "") => path.resolve(__dirname, DIST + subPath);

module.exports = {
    DIST: DIST,
    SRC: SRC,
    IN_DIST: IN_DIST,
    IN_SRC: IN_SRC
};