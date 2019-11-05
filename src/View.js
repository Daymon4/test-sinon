const View = function() {
    this._root = document.getElementById('root');
}

View.prototype.createText = function(text) {
    const node = document.createElement('p');
    node.classList.add('wrapper__text');
    node.innerText = text;

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    wrapper.append(node);

    this._root.append(wrapper);
}

module.exports = View;