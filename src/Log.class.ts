import * as bunyan from 'bunyan';

export class Log {
    static logger = bunyan.createLogger({name:'pst-extractor'});

    static error(s: string) {
        Log.logger.error(s);
    }

    static info(s: string) {
        Log.logger.info(s);
    }

    static debug(s: string) {
        Log.logger.debug(s);
    }

    static trace(s: string) {
        Log.logger.trace(s);
    }
}
