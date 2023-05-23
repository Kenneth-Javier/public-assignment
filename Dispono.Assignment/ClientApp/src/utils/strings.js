// eslint-disable-next-line import/prefer-default-export
export function truncate(text, maxlength) {
    return text.length > maxlength
        ? `${text.slice(0, maxlength - 1)} ...`
        : text;
}
