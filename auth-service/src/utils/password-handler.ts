import passwordGenerator from "generate-password";

/**
 * this function generates a random password
 * @returns a randomly generated password
 */
const generateTempPassword = () => {
    return passwordGenerator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        excludeSimilarCharacters: true,
        exclude: '"`~^,;:.<>/?([{)]}\\|',
        strict: true,
    });
};

export {
    // eslint-disable-next-line import/prefer-default-export
    generateTempPassword,
};
