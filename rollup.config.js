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
            plugins: ['external-helpers'],
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
    ],
    external: id => /lodash/.test(id) || (dependencies && Object.keys(dependencies).includes(id)),
};
