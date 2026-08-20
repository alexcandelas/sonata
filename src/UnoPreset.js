import attributes from './css/variants/attributes.js';
import breakpoints from './css/variants/breakpoints.js';
import children from './css/variants/children.js';
import containerVariant from './css/variants/container.js';
import motionPreference from './css/variants/motionPreference.js';
import print from './css/variants/print.js';
import pseudoClasses from './css/variants/pseudoClasses.js';
import pseudoElements from './css/variants/pseudoElements.js';
import root from './css/variants/root.js';
import theme from './css/variants/theme.js';
import { definePreset } from 'unocss';
import { alert } from './css/components/alert.js';
import { align, inset, justify, place, position } from './css/utilities/positionRules.js';
import {
    animationDelay,
    animationDirection,
    animationDuration,
    animationFillMode,
    animationIterationCount,
    animationPlayState,
    animationTiming
} from './css/utilities/animationRules.js';
import { backgroundColor, color } from './css/utilities/colorRules.js';
import { borderColor, borderStyle, borderWidth, radius } from './css/utilities/borderRules.js';
import { boxShadow, insetBoxShadow } from './css/utilities/boxShadowRules.js';
import { breaks } from './css/utilities/breakRules.js';
import { button } from './css/components/button.js';
import { checkbox } from './css/components/checkbox.js';
import { choiceLabel } from './css/components/choiceLabel.js';
import { clear, float } from './css/utilities/floatRules.js';
import { columns } from './css/utilities/columnsRules.js';
import { container } from './css/utilities/responsiveRules.js';
import { cursor } from './css/utilities/cursorRules.js';
import { display } from './css/utilities/displayRules.js';
import { fill, stroke, strokeWidth } from './css/utilities/svgRules.js';
import { flex, flexBasis, flexDirection, flexGrow, flexShrink, flexWrap } from './css/utilities/flexRules.js';
import { fontFamily, fontSize, fontWeight } from './css/utilities/fontRules.js';
import { formControl } from './css/components/formControl.js';
import { formField } from './css/components/formField.js';
import { formSwitch } from './css/components/formSwitch.js';
import { gap } from './css/utilities/gapRules.js';
import { gridAuto, gridSize, gridTemplate } from './css/utilities/gridRules.js';
import { headings } from './css/components/headings.js';
import { height, width } from './css/utilities/sizeRules.js';
import { isolation, zIndex } from './css/utilities/stackingRules.js';
import {
    letterSpacing,
    lineHeight,
    textAlign,
    textDecoration,
    textTransform,
    textUnderlineOffset,
    textWrap,
    verticalAlign,
    whiteSpace
} from './css/utilities/textRules.js';
import { margin, padding, space } from './css/utilities/spacingRules.js';
import { motionPreferenceRules } from './css/utilities/motionPreferenceRules.js';
import { objectFit, objectPosition } from './css/utilities/objectRules.js';
import { opacity } from './css/utilities/opacityRules.js';
import { order } from './css/utilities/orderRules.js';
import { overflow, overflowWrap } from './css/utilities/overflowRules.js';
import { pointerEvents } from './css/utilities/pointerEventsRules.js';
import { radio } from './css/components/radio.js';
import { ratio } from './css/utilities/aspectRatioRules.js';
import { ring } from './css/utilities/ringRules.js';
import { scale } from './css/utilities/scaleRules.js';
import { scrollPadding } from './css/utilities/scrollPaddingRules.js';
import { table } from './css/components/table.js';
import { transition, transitionDelay, transitionDuration, transitionTiming } from './css/utilities/transitionRules.js';
import { translate } from './css/utilities/translateRules.js';
import { visibility } from './css/utilities/visibilityRules.js';
import { visuallyHidden } from './css/utilities/visuallyHidden.js';

let ignoreList;

/**
 * Dynamically import rules from the given file
 * if it's not included on the ignore list.
 *
 * @param {string} file
 * @param {string} layer
 * @returns {Promise}
 */
async function importRule(file, layer) {
    const isIgnored = ignoreList.includes(`${layer}.*`) || ignoreList.includes(`${layer}.${file}`)

    if (isIgnored) return [];

    let rules = await import(`./css/${layer}/${file}.js`);
    rules = Object.values(rules).flat();
    rules.forEach(rule => rule.push({ layer }));

    return rules;
}

export default definePreset(async (tokens, _ignoreList = []) => {
    ignoreList = _ignoreList;

    const utilities = [
        ...align,
        ...animationDelay,
        ...animationDirection,
        ...animationDuration,
        ...animationFillMode,
        ...animationIterationCount,
        ...animationPlayState,
        ...animationTiming,
        ...backgroundColor(tokens?.colors),
        ...borderColor(tokens?.colors),
        ...borderStyle,
        ...borderWidth,
        ...breaks,
        ...boxShadow(tokens?.boxShadow),
        ...clear,
        ...color(tokens?.colors),
        ...columns,
        ...container,
        ...cursor,
        ...display,
        ...fill(tokens?.colors),
        ...flex,
        ...flexBasis,
        ...flexDirection,
        ...flexGrow,
        ...flexShrink,
        ...flexWrap,
        ...float,
        ...fontFamily(tokens?.fontFamily),
        ...fontSize(tokens?.fontSize),
        ...fontWeight(tokens?.fontWeight),
        ...gap,
        ...gridAuto,
        ...gridSize,
        ...gridTemplate,
        ...height,
        ...inset,
        ...insetBoxShadow(tokens?.insetBoxShadow),
        ...isolation,
        ...justify,
        ...letterSpacing(tokens?.letterSpacing),
        ...lineHeight(tokens?.lineHeight),
        ...margin,
        ...motionPreferenceRules,
        ...objectFit,
        ...objectPosition,
        ...order,
        ...opacity,
        ...overflow,
        ...overflowWrap,
        ...padding,
        ...place,
        ...pointerEvents,
        ...position,
        ...radius(tokens?.radius),
        ...ratio,
        ...ring,
        ...scale,
        ...scrollPadding,
        ...space,
        ...stroke(tokens?.colors),
        ...strokeWidth,
        ...textAlign,
        ...textDecoration(tokens?.colors),
        ...textTransform,
        ...textUnderlineOffset,
        ...textWrap,
        ...transition,
        ...transitionDelay,
        ...transitionDuration,
        ...transitionTiming,
        ...translate,
        ...verticalAlign,
        ...visibility,
        ...visuallyHidden,
        ...whiteSpace,
        ...width,
        ...zIndex,
    ];

    utilities.forEach(rule => rule.push({ layer: 'utilities' }));

    return {
        name: 'unocss-preset-sonatacss',
        tokens,
        rules: [
            // Abstractions
            ...await importRule('btnReset', 'abstractions'),
            ...await importRule('container', 'abstractions'),
            ...await importRule('disabled', 'abstractions'),
            ...await importRule('focused', 'abstractions'),
            ...await importRule('grid', 'abstractions'),
            ...await importRule('helpText', 'abstractions'),
            ...await importRule('link', 'abstractions'),
            ...await importRule('linkOverlay', 'abstractions'),
            ...await importRule('listInline', 'abstractions'),
            ...await importRule('listReset', 'abstractions'),
            ...await importRule('media', 'abstractions'),
            ...await importRule('stack', 'abstractions'),
            ...await importRule('tableScroll', 'abstractions'),
            ...await importRule('truncate', 'abstractions'),

            // Components
            ...await importRule('alert', 'components'),
            ...await importRule('button', 'components'),
            ...await importRule('checkbox', 'components'),
            ...await importRule('choiceLabel', 'components'),
            ...await importRule('formControl', 'components'),
            ...await importRule('formField', 'components'),
            ...await importRule('formSwitch', 'components'),
            ...await importRule('headings', 'components'),
            ...await importRule('radio', 'components'),
            ...await importRule('table', 'components'),

            ...utilities,
        ],
        variants: [
            attributes(),
            breakpoints(tokens?.breakpoints ?? {}),
            children(),
            containerVariant(tokens?.breakpoints ?? {}),
            motionPreference(),
            print(),
            pseudoClasses(),
            pseudoElements(),
            root(),
            theme(),
        ],
    };
});
