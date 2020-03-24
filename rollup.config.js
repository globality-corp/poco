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
            plugins: [
                '@babel/plugin-external-helpers',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-export-default-from',
            ],
            presets: [
                ['@babel/preset-env', { modules: false }],
                '@babel/preset-flow',
                '@babel/preset-react',
            ],
            runtimeHelpers: true,
        }),
    ],
    external: id => /lodash/.test(id) || (dependencies && Object.keys(dependencies).includes(id)),
};
