import babel from 'rollup-plugin-babel';
import { dependencies } from './package.json';

export default {
    input: 'src/index.js',
    output: {
        exports: 'named',
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: false,
    },
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            plugins: ['external-helpers', 'transform-class-properties', 'transform-export-extensions'],
            presets: [['env', { modules: false }], 'flow', 'react'],
            runtimeHelpers: true,
        }),
    ],
    external: id => /lodash/.test(id) || (dependencies && Object.keys(dependencies).includes(id)),
};
