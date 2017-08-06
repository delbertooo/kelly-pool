import * as generate from 'project-name-generator';

export function generateName() {
    return function (hook) {
        const name = generate().raw.map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
        hook.data.name = name;
        return Promise.resolve(hook);
    };
}