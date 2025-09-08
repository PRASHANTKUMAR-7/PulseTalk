import mergeWith from 'lodash.mergewith';
const overrideEverything = (_, source) => source;
export const mergeDeep = (target, source) => mergeWith(target, source, overrideEverything);
const overrideUndefinedOnly = (object, source) => object ?? source;
export const mergeDeepUndefined = (target, source) => mergeWith(target, source, overrideUndefinedOnly);
