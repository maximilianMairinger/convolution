import { merge } from "webpack-merge"
import commonMod from "./rollup.node.common.config.mjs"


export default merge(commonMod, {
  input: 'app/src/cli/convolution-cli.ts',
  output: {
    banner: "#!/usr/bin/env node",
    file: 'app/dist/cjs/cli/convolution-cli.js',
    format: 'cjs'
  },
})