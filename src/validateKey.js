import equal from 'deep-equal'
import autoupdateDefaults from './autoupdateDefaults'

var config = {
	ctx: undefined,
	defaults: {}
}

export const initDefaults = (defaults,ctx) => {
	typeof ctx === 'undefined' && (ctx = 'defctx')
	config.ctx = ctx
	config.defaults[ctx] = defaults
}

export default ({R, key, def, isDev, ctx, autoupdateOff}) => {
	typeof ctx === 'undefined' && (ctx = 'defctx')
	if (typeof R !== 'object') R = {}
	if (typeof key === 'number') key = key.toString()
	if (typeof key !== 'string') key = ''

	var value = R[key]

	var d = config.defaults[ctx]
	if (typeof d === 'undefined') {
		return {value, R, key, def}
	}

	if (key && typeof d[key] === 'undefined') {
		if (typeof def !== 'undefined') d[key] = def
		else if (typeof R[key] !== 'undefined') d[key] = R[key]
		isDev && typeof d[key] !== 'undefined' && ! autoupdateOff && autoupdateDefaults(key,d[key],ctx)
	}

	if (isDev) {
		if (typeof d[key] === 'undefined') throw 'ERROR_NO_DEFAULT_DEFINED for '+key
		if (typeof def !== 'undefined' && ! equal(d[key],def)) throw 'ERROR_DEFAULT_CONFLICT in '+key
	}

	return {value, R, key, def:d[key]}
}
