import chalk from "chalk";
class Logger {
    log(message) {
        console.log(chalk.green(`🟢 [LOG]: ${message}`));
    }

    warn(message) {
        console.log(chalk.yellow(`🟡 [WARN]: ${message}`));
    }

    error(message) {
        console.log(chalk.red(`🔴 [ERROR]: ${message}`));
    }

    verbose(message) {
        console.log(chalk.blue(`🔵 [VERBOSE]: ${message}`));
    }
}

export default new Logger();
