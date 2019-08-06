import post from 'pubcore-http'

var config = {
	newDefaults: {},
	postUri: undefined
}

var postDefaults = ctx => post(config[ctx].postUri, config[ctx].newDefaults).then(() => config[ctx].newDefaults = {})

export const initAutoupdateDefaults = (c,ctx) => {
	typeof ctx === 'undefined' && (ctx = 'defctx')
	config[ctx] = {
		newDefaults: {},
		postUri: c.postUri
	}
}

export default (key,spec,ctx) => {
	typeof ctx === 'undefined' && (ctx = 'defctx')
	var postUri = config[ctx].postUri
	if (typeof postUri==='string' && postUri.length > 0) {
		typeof config[ctx].newDefaults === 'undefined' && (config[ctx].newDefaults = {})
		config[ctx].newDefaults[key] = spec
		postDefaults(ctx)
	}
}
