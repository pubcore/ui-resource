# Supports developer synchronizing config-keys used in source-code and default resource files
Map resource keys to resource definition and returns resource json.
It can be used for config data.

# Configuration
		import {initEnvIsDev, initDefaults, initAutoupdateDefaults} from 'pubcore-ui-resource'

		//initial config.json content is a empty json object {}
		import defaultConfig from '../config.json'

		//if isDev is true then system will throw exceptions on wrong default data
		initEnvIsDev(isDev)

		// enables resource-key sync feature
		initDefaults(defaultConfig)

		// postUri points on a service which will write config-key with json data to config.json file
		initAutoupdateDefaults({
			postUri:'/service/config
		})

## Examples
	import uiConfig from 'pubcore-ui-resource'

	var C = {
		key1: {obj:'test'},
  	key2: [4,5,6],
  	key3: 'a,b,c'
	}

//Will log [4,5,6] and if postUri service exists on dev will also write
//a default {key1:[1,2,3]} into config.json file
console.log(
	uiConfig(
		C,
		'key1',
		[1,2,3] // default which will be written in config.json file, only on Dev system
	)
)
