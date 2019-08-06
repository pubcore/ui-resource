import {expect} from 'chai'
import validateKey, {initDefaults} from '../src/validateKey'

describe('validateKey, ' + new Date(), () => {
	it('get undefined configuration', () => {
		initDefaults(undefined)
		expect(validateKey({R:{},key:'a'})).to.deep.equal({value:undefined,R:{},key:'a',def:undefined})
	})
	it('get object {b:2}, because default is set', () => {
		initDefaults(undefined)
		expect(validateKey({R:{},key:'b',def:{b:2}})).to.deep.equal({value:undefined,R:{},key:'b',def:{b:2}})
	})
	it('get object {c:3} default is different', () => {
		initDefaults(undefined)
		expect(validateKey({R:{c:{c:3}},key:'c',def:{d:4}})).to.deep.equal({value:{c:3},R:{c:{c:3}},key:'c',def:{d:4}})
	})
	it('get default object {e:5} even if wrong resource, because it works in production mode', () => {
		initDefaults(undefined)
		expect(validateKey({R:'wrong',key:'e',def:{e:5}})).to.deep.equal({value:undefined,R:{},key:'e',def:{e:5}})
	})
	it('get default object {e:5} even if wrong resource, because it works in production mode', () => {
		initDefaults({})
		expect(validateKey({R:{},key:'f',def:{f:6}})).to.deep.equal({value:undefined,R:{},key:'f',def:{f:6}})
	})
	it('get default object {e:5} even if wrong resource, because it works in production mode', () => {
		initDefaults({})
		expect(validateKey({R:{},key:'f',def:{f:6},isDev:true})).to.deep.equal({value:undefined,R:{},key:'f',def:{f:6}})
	})
	it('throw exception in DEV mode', () => {
		initDefaults({f:{f:7}})
		expect(() => validateKey({R:{},key:'f',def:{f:6},isDev:true})).to.throw('ERROR_DEFAULT_CONFLICT in f')
	})
	it('throw exception in DEV mode', () => {
		initDefaults({})
		expect(() => validateKey({R:{},key:'f',isDev:true})).to.throw('ERROR_NO_DEFAULT_DEFINED for f')
	})
	it('if key is integer and production mode is active then value should string one and def too' , () => {
		initDefaults({})
		expect(validateKey({R:{1:'one'},key:1})).to.deep.equal({value:'one',R:{1:'one'},key:'1',def:'one'})
	})
	it('if key is integer and production mode is active then value should string one and def too' , () => {
		initDefaults({})
		expect(validateKey({R:{},key:{'object':'is not allowed'}})).to.deep.equal({value:undefined,R:{},key:'',def:undefined})
	})
	it('two diffrent resources context switch' , () => {
		initDefaults({'a':1})
		initDefaults({'b':2},'ctx2')
		expect(validateKey({R:{},key:'a'})).to.deep.equal({value:undefined,R:{},key:'a',def:1})
		expect(validateKey({R:{},key:'b'})).to.deep.equal({value:undefined,R:{},key:'b',def:undefined})
		expect(validateKey({R:{},key:'b',ctx:'ctx2'})).to.deep.equal({value:undefined,R:{},key:'b',def:2})
		expect(validateKey({R:{},key:'a'})).to.deep.equal({value:undefined,R:{},key:'a',def:1})
	})
})
