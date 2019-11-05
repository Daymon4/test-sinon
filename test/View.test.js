const View = require('../src/View');

describe('View instance', () => {
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();

        sandbox.stub(document, 'getElementById');
    });

    beforeEach(() => {
        sandbox.resetHistory();
    })

    after(() => {
        sandbox.restore();
    });

    it('should be an object', () => {
        const view = new View();

        assert.isObject(view);
    });

    it('should find #root', () => {
        const expectedArg = 'root';

        new View();

        sinon.assert.calledOnce(document.getElementById);
        sinon.assert.calledWithExactly(document.getElementById, expectedArg);
    });
});

describe('View.createTest', () => {
    let sandbox;
    let element;
    let root;
    let createElement;

    before(() => {
        sandbox = sinon.createSandbox();
        element = {
            classList: {
                add: sandbox.stub(),
            },
            append: sandbox.stub(),
        }
        root = {
            append: sandbox.stub() 
        }

        sandbox.stub(document, 'getElementById').returns(root);
        createElement = sandbox.stub(document, 'createElement');
        createElement.withArgs('p').returns({...element, name: 'p'});
        createElement.withArgs('div').returns({...element, name: 'div'});
    });

    beforeEach(() => {
        sandbox.resetHistory();
    })

    after(() => {
        sandbox.restore();
    });

    it('should create p with text', () => {
        const text = 'Test';
        const view = new View();

        view.createText(text);

        sinon.assert.calledWith(document.createElement, 'p');
        sinon.assert.calledWith(element.classList.add, 'wrapper__text');
    });

    it('should create div for text wrapper', () => {
        const text = 'Test';
        const expectedP = {
            ...element,
            name: 'p',
            innerText: text
        }
        const expectedDiv = {
            ...element,
            name: 'div'
        }
        const view = new View();

        view.createText(text);

        sinon.assert.calledWith(document.createElement, 'div');
        sinon.assert.calledWith(element.classList.add, 'wrapper');
        sinon.assert.calledWith(element.append, expectedP);
        sinon.assert.calledWith(root.append, expectedDiv);
    });
});