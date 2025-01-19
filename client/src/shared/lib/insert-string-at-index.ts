export const insertStringAtIndex = (
    originalString: string,
    index: number,
    stringToInsert: string
): string => {
    if (index > originalString.length) {
        throw new Error("Index is out of range.");
    }

    return (
        originalString.slice(0, index) +
        stringToInsert +
        originalString.slice(index)
    );
};
