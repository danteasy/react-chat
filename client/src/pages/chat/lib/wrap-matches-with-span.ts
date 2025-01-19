export const wrapMatchesWithSpan = (regex: RegExp, string: string) => {
    return string.replace(regex, match => `<span>${match}</span>`);
};
