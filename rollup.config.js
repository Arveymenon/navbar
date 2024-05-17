import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';

const packageJson = require("./package.json");

export default {
    input: 'src/main.ts',
    output: [
        {
            file: packageJson.main,
            format: "cjs",
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: true,
        },
    ],
    plugins: [
        typescript(),
        css({output: 'bundle.css'})
    ]
  };