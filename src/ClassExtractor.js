import extractCopiedSelectors from './utils/extractCopiedSelectors.js';
import fg from 'fast-glob';
import fs from 'fs/promises';
import micromatch from 'micromatch';
import path from 'node:path';
import unoConfig from '../src/config/uno.js';
import { createGenerator } from 'unocss';

const IGNORED_PATHS = [
    '!**/vendor',
    '!**/node_modules',
    '!**/*.css',
];

/**
 * @param {Object} sonataConfig
 * @returns {Promise<{generateCSS: function, matchesContentPatterns: function, watchFile: function}>}
 * @constructor
 */
export async function ClassExtractor(sonataConfig) {
    const patterns = [
        ...IGNORED_PATHS,
        ...sonataConfig.content,
    ];

    let unoGenerator = await createGenerator(unoConfig(sonataConfig));
    let watchedPaths = await fg(patterns);
    let scannedFiles = new Map();
    let classCandidates = new Set();
    let copiedSelectors = new Set();

    for (const path of watchedPaths) {
        await watchFile(path);
    }

    /**
     * Transform the given set of selectors to an array
     * of tokens split by spaces.
     *
     * @param {Set} selectors
     * @returns {Set}
     */
    function createTokens(selectors) {
        return new Set(
            Array.from(selectors).map(
                string => string.split(' ').map(s => s.replace(/^./, '')).filter(Boolean)
            ).flat()
        );
    }

    /**
     * Add the given class candidates to the global set.
     *
     * @param {Array|Set} newCandidates
     */
    function addClassCandidates(newCandidates) {
        for (const candidate of newCandidates) {
            classCandidates.add(candidate);
        }
    }

    /**
     * Add the given path to the list of watched paths and extract class
     * candidates if the file has changed since the last scan.
     *
     * @param {string} path
     * @returns {Promise<void>}
     */
    async function watchFile(path) {
        const stat = await fs.stat(path);
        const cachedFile = scannedFiles.get(path);

        if (cachedFile && cachedFile === stat.mtimeMs) return;

        const content = await fs.readFile(path, 'utf8');
        const fileClassCandidates = await unoGenerator.applyExtractors(content, path);

        scannedFiles.set(path, stat.mtimeMs);

        addClassCandidates(fileClassCandidates);
    }

    /**
     * Generate the CSS from the class candidates with UnoCSS.
     *
     * @returns {string}
     */
    async function generateCSS() {
        addClassCandidates(createTokens(copiedSelectors));

        const generated = await unoGenerator.generate(classCandidates);
        let css = '';

        for (const layer of generated.layers) {
            css += generated.getLayer(layer) + '\n';
        }

        const containsNewTokens = addTokensFromCopyRules(css);

        return containsNewTokens ? generateCSS() : css;
    }

    /**
     * Check for new @copy rules in the generated CSS and add the new tokens
     * to the class candidates set. Return true if new tokens were added.
     *
     * @param {string} css
     * @returns {boolean}
     */
    function addTokensFromCopyRules(css) {
        const selectors = extractCopiedSelectors(css);

        if (! selectors.size) return false;

        const originalCandidatesCount = classCandidates.size;

        for (const selector of selectors) {
            copiedSelectors.add(selector);
        }

        addClassCandidates(createTokens(selectors));

        return classCandidates.size !== originalCandidatesCount;
    }

    /**
     * Check if the given file path matches the content patterns.
     *
     * @param {string} filePath
     * @returns {boolean}
     */
    function matchesContentPatterns(filePath) {
        const relative = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

        return micromatch.all(relative, patterns);
    }

    /**
     * @returns {Set}
     */
    function getCopiedSelectors() {
        return copiedSelectors;
    }

    /**
     * @param {Set} _copiedSelectors
     */
    function setCopiedSelectors(_copiedSelectors) {
        copiedSelectors = _copiedSelectors;
    }

    return {
        generateCSS,
        getCopiedSelectors,
        setCopiedSelectors,
        matchesContentPatterns,
        watchFile,
    };
}
