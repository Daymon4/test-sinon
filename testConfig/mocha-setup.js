const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const sinon = require('sinon');

const dom = new JSDOM(
    '<!DOCTYPE html>'+ 
    '<html>'+
    '<head>'+
    '</head>'+
    '<body>'+
    '</body>'+
    '</html>'
)

const { window } = dom;

global.dom = dom;
global.window = window;
global.document = window.document;

global.assert = assert;
global.sinon = sinon;