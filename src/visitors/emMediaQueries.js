function transformCondition(condition) {
    const value = condition.value.value?.value?.value;

    if (
        condition.value.value?.type === 'length' &&
        ['width', 'height'].includes(condition.value.name) &&
        value.unit === 'px'
    ) {
        condition.value.value.value.value = {
            unit: 'em',
            value: value.value / 16
        };
    }

    return condition;
}

/**
 * Transform (min|max)width and (min|max)height media queries from px to ems.
 *
 * @returns {Object}
 */
export default function emMediaQueries() {
    return {
        Rule: {
            media(rule) {
                rule.value.query.mediaQueries.map(mediaQuery => {
                    if (mediaQuery.condition?.value) {
                        mediaQuery.condition = transformCondition(mediaQuery.condition);
                    }

                    if (mediaQuery.condition?.conditions) {
                        mediaQuery.condition.conditions.map(transformCondition);
                    }

                    return mediaQuery;
                });

                return rule;
            }
        }
    };
}
