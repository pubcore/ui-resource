import {expect} from 'chai'
import uiResource, {initEnvIsDev,envIsDev,initDefaults,initAutoupdateDefaults} from '../src/uiResource'

describe('uiResource, ' + new Date(), () => {
	it('get valid configuration object {a:1}', () => {
		expect(uiResource({a:{a:1}},'a')).to.deep.equal({a:1})
	})
	it('get valid configuration object {b:2}', () => {
		initEnvIsDev(true)
		expect(uiResource({b:{b:2}},'b')).to.deep.equal({b:2})
	})
	it('get valid configuration object {c:3}', () => {
		expect(uiResource({c:{c:3}},'c',{c:3})).to.deep.equal({c:3})
	})
	it('get valid configuration object {d:4}', () => {
		initAutoupdateDefaults({postUri:'someuri'})
		expect(uiResource({d:{d:4}},'d',{d:4})).to.deep.equal({d:4})
	})
	it('get valid configuration string {e:5}', () => {
		initDefaults({e:'{e:5}'})
		initAutoupdateDefaults({postUri:'someuri'})
		expect(uiResource({e:'{e:5}'},'e','{e:5}')).to.deep.equal('{e:5}')
	})
	it('throw ERROR_R_IS_NOT_AN_OBJECT', () => {
		expect(()=>uiResource('string','key')).to.throw('ERROR_R_IS_NOT_AN_OBJECT')
	})
	it('throw ERROR_KEY_IS_NOT_A_STRING', () => {
		expect(()=>uiResource({},3)).to.throw('ERROR_KEY_IS_NOT_A_STRING')
	})
	it('get valid configuration object {f:6}', () => {
		initEnvIsDev(false)
		expect(uiResource({f:{f:6}},'f',{g:7})).to.deep.equal({f:6})
	})
	it('get undefined configuration object {h:8}', () => {
		initEnvIsDev(true)
		initAutoupdateDefaults({postUri:'some'})
		expect(uiResource({},'h',{h:8})).to.deep.equal({h:8})
	})
	it('get undefined configuration object {h:8}', () => {
		initEnvIsDev(false)
		initAutoupdateDefaults({postUri:''})
		expect(uiResource({},'h',{h:8})).to.deep.equal(undefined)
	})
	it('envIsDev true', () => {
		initEnvIsDev(true)
		expect(envIsDev()).to.be.true
	})
})
