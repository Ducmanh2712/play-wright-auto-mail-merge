import * as esbuild from 'esbuild';

const config = {
    entryPoints: ['index.js'],
    bundle: true,
    platform: 'node',
    target: 'node22',
    format: 'esm',
    outfile: 'dist/index.js',
    sourcemap: false,
    minify: true,
    external: ['playwright'],
    packages: 'bundle',
    define: {
        'process.env.NODE_ENV': '"production"'
    },
    loader: {
        '.js': 'js'
    },
    keepNames: false,
    drop: ['console', 'debugger'],
    supported: {
        'class-private-method': false,
        'class-private-field': false
    }
};

const build = async () => {
    try {
        await esbuild.build(config);
    } catch {
        process.exit(1);
    }
};

build();
