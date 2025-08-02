export default function kebabCase(str) {
    return str.trim()
        .replace(/([a-z\d])([A-Z])/g, '$1-$2') // Separate camel case words
        .replace(/[\W_]/g, m => /[À-ž]/.test(m) ? m : '-') // Replace symbols and spaces
        .replace(/^-+|-+$/g, '') // Remove hyphens at beginning and end of string
        .replace(/-{2,}/g, m => '-') // Remove consecutive hyphens
        .toLowerCase();
};
