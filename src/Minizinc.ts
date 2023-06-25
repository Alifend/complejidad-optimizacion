import * as MINZINC from 'minizinc';
export class MinZinc {
    private static instance: MinZinc;
    private constructor() { }
    static getInstance() {

        if (!MinZinc.instance) {
            MINZINC.init({
                // If omitted, searches for minizinc-worker.js next to the minizinc library script
                workerURL: 'http://localhost:3000/path/to/my-own-worker.js',
                // If these are omitted, searches next to the worker script
                wasmURL: 'http://localhost:3000/path/to/minizinc.wasm',
                dataURL: 'http://localhost:3000/path/to/minizinc.data'
              }).then(() => {
                console.log('Ready');
                MinZinc.instance = new MinZinc();
              });
        }
        return MinZinc.instance;
    }

}