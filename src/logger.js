/* @flow */
class Logger {
    prefix: string;

    console: Object;

    constructor (prefix: string) {
        this.prefix = prefix;
        this.console = window.console || {
            debug: () => {},
            error: () => {},
            info: () => {},
            log: () => {},
        };
    }

    debug (...args: any): void {
        this.console.debug(...this._withPrefix(args));
    }

    error (...args: any): void {
        this.console.error(...this._withPrefix(args));
    }

    info (...args: any): void {
        this.console.info(...this._withPrefix(args));
    }

    log (...args: any): void {
        this.console.log(...this._withPrefix(args));
    }

    _withPrefix (args: Array<any>): Array<any> {
        if (this.prefix) {
            return [`[${this.prefix}]`, ...args];
        }
        return args;
    }
}

export default Logger;
