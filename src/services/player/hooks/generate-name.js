'use strict';

const generate = require('project-name-generator');
module.exports = function () {
    return function (hook) {
        const name = generate().raw.map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
        hook.data.name = name;
        return Promise.resolve(hook);
    };
}