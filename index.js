const core = require('@actions/core');

async function main() {

    const pullRequest = JSON.parse(core.getInput('pr'));
    if (!pullRequest.title.match(/[A-Z]+-[0-9]+\s.+/)) {
        return core.setFailed('Pull request title does not match required format, it must be BOARD-TICKET_NUM {Description}.');
    }

    const tokens        = pullRequest.title.split('-');
    const allowedBoards = core.getInput('allowed-boards').split(',');

    let isValidBoard = false;
    for (const board of allowedBoards) {
        if (tokens[0] === board) {
            isValidBoard = true;
            break;
        }
    }
    if (!isValidBoard) {
        return core.setFailed('The board name is not valid, please enter a valid board name.');
    }

    console.log('Pull request title verification successful.');

}

main().catch(e => core.setFailed(e));
