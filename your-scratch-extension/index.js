const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');

class Scratch3YourExtension {
    constructor(runtime) {
        // Put any setup for your extension here
    }

    /**
     * Returns the metadata about your extension.
     */
    getInfo() {
        return {
            // Unique ID for your extension
            id: 'yourScratchExtension',

            // Name that will be displayed in the Scratch UI
            name: 'Demo',

            // Colours to use for your extension blocks
            color1: '#000099',
            color2: '#660066',

            // Icons to display
            blockIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',
            menuIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',

            // Your Scratch blocks
            blocks: [
                {
                    // MyFirstBlock definition
                    opcode: 'myFirstBlock',
                    blockType: BlockType.REPORTER,
                    text: 'Title for Book [BOOK_NUMBER]',
                    terminal: false,
                    filter: [TargetType.SPRITE, TargetType.STAGE],
                    arguments: {
                        BOOK_NUMBER: {
                            defaultValue: 1718500564,
                            type: ArgumentType.NUMBER
                        }
                    }
                },
                {
                    // MySecondBlock definition
                    opcode: 'mySecondBlock',
                    blockType: BlockType.REPORTER,
                    text: 'Syllables in [MY_TEXT]',
                    arguments: {
                        MY_TEXT: {
                            defaultValue: 'Hello World',
                            type: ArgumentType.STRING
                        }
                    }
                }
            ]
        };
    }

    /**
     * Implementation of the block with the opcode that matches this name.
     * This will be called when the block is used.
     */
    myFirstBlock({ BOOK_NUMBER }) {
        return fetch('https://openlibrary.org/isbn/' + BOOK_NUMBER + '.json')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return { title: 'Unknown' };
                }
            })
            .then((bookinfo) => {
                return bookinfo.title;
            });
    }

    mySecondBlock({ MY_TEXT }) {
        // Implement syllable counting logic here
        // Return the number of syllables in the provided text
        // For example, you can use a library or function to count syllables
        return countSyllables(MY_TEXT);
    }
}

module.exports = Scratch3YourExtension;
