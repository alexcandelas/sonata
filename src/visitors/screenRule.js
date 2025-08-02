let breakpoints;

/**
 * Resolve a registered breakpoint if needed and return a media feature.
 *
 * @param {Object} param
 * @returns {string}
 */
function buildLengthFeature(param) {
    param.value = ((breakpoints[param.value]) || param.value);
    let decrement = param.unit === 'px' ? .1 : .01;

    return param.isMaxValue
        ? `(max-width: ${param.value - decrement}${param.unit})`
        : `(min-width: ${param.value}${param.unit})`;
}

/**
 * Resolve the params values and units needed for media features.
 *
 * @param {Array} params
 * @returns {Array}
 */
function normalizeParams(params) {
    const ignoreList = ['parenthesis-block', 'close-parenthesis'];
    const isRange = params.map(el => el.value.value).includes('to');
    let isMaxValue = false;

    return params.map(el => {
        let { value, type, unit } = el.value;

        if (ignoreList.includes(type)) {
            isMaxValue = false;
            return;
        }

        if (value === '<' || value === 'to') {
            isMaxValue = true;
            return;
        }

        return {
            isMaxValue,
            isRange,
            value: value.toString(),
            unit: unit || 'px'
        };
    }).filter(el => el && el.value !== ' ');
}

/**
 * Create a width media query using registered breakpoints or length values.
 *
 * @param {Object} _breakpoints
 * @returns {Object}
 */
export default function screenRule(_breakpoints) {
    breakpoints = _breakpoints;

    return {
        Rule: {
            custom: {
                screen(rule) {
                    const params = normalizeParams(rule.prelude.value);

                    if (params[0].isRange && ! params[1]) {
                        let prelude = rule.prelude.value.map(el => el.value.value).join('');

                        throw new Error(`Sonata CSS: the "@screen ${prelude}" rule is missing a second value for max-width.`);
                    }

                    let media = buildLengthFeature(params[0]);

                    if (params[0].isRange) {
                        media += ' and ' + buildLengthFeature(params[1], true);
                    }

                    return {
                        type: 'media',
                        value: {
                            rules: rule.body.value,
                            loc: rule.loc,
                            query: {
                                mediaQueries: [
                                    { raw: media }
                                ]
                            }
                        }
                    };
                }
            }
        }
    };
}
