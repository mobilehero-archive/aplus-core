<h3 align="center">
  <img src="https://cdn.secure-api.org/images/mobilehero-alloy-plus.jpg" alt="alloy+ logo" />
</h3>

> **CAUTION:  PRE-PRODUCTION BETA**

# alloy-plus

[![](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)]()

> We have the capability to make the world's first bionic framework. Alloy+ will be that framework. Code Better... Stronger... Faster...

<!-- TOC depthFrom:1 depthTo:6 insertAnchor:false orderedList:false updateOnSave:true withLinks:true -->

- [alloy-plus](#alloy-plus)
	- [Overview](#overview)
		- [What is Alloy+?](#what-is-alloy)
		- [How is this different than Adamantium?](#how-is-this-different-than-adamantium)
	- [Install](#install)
	- [Usage](#usage)
	- [Alloy+ Plugins](#alloy-plugins)
	- [Need Help?](#need-help)
	- [License](#license)
	- [Legal](#legal)

<!-- /TOC -->

## Overview

### What is Alloy+?

[Alloy+][] is an entire framework built around 
[Appcelerator Mobile](http://www.appcelerator.com/mobile-app-development-products/) and their [Alloy][] product. 
The idea for this framework was built upon the concepts of [MobileHero Adamantium](https://github.com/mobilehero/adamantium) 
and a desire to customize and extend Appcelerator Alloy for developers.  How much faster or stronger all depends on YOU, the developer.  

There will be an assortment of alloy+ plugins (available as npm modules) that you can install 
in your project to help you take your existing development tools furthur 
than possible today.  You can choose which modules are executed in your `config.json` file 
(which is part of your Alloy project).  You can also easily create your own plugins by simply 
creating a npm module that follows a simple convention.  

### How is this different than Adamantium?

[Adamantium](https://github.com/mobilehero/adamantium) is a custom build of [Appcelerator Alloy](https://github.com/appcelerator/alloy).  
[Alloy+][] is a framework for modifying your app and code during the build process.  Both
accomplish getting new features and capabilities into your app.  Alloy+ might take longer to execute and be limited in scope as it has 
to work within the available Alloy build hooks.  It is, however, more flexible and easier to get up and running because it does
not require replacing Alloy.


## Install 

[![NPM version](https://badge.fury.io/js/alloy-plus.svg)](https://www.npmjs.com/package/alloy-plus)

> _Install in the root directory of your Appcelerator mobile project (the directory containing `tiapp.xml`)._


```bash
npm install --save alloy-plus
```

## Usage

To use plugins in your app, add entries for your plugins to your app's `config.json` file:

```json
  {
      "global": {
            "alloy+": {
                  "preload": [ "alloy-npm" ],
                  "precompile": [ "some-other-module" ],
                  "postcompile": [ "some-other-module" ],
                  "appjs": [ "some-other-module" ]
            }
      }
```

## Alloy+ Plugins 

> ** Coming Soon! **

| Plugin  |  Description |
|---|---|---|
| `npm`  |  Execute npm commands (Useful for installing/updating npm packages that are part of your mobile app) |
|  `underscore` | Fix some issues with the implementation of underscore in Alloy and pave the way for upgrading to lodash   |
|  `babel` | Run babel transformations on your code during the build process, thus allowing support for ES6 and much more!  |
|  `nodejs` | Make `require` statements in your app support nodejs packages installed via npm  |


## Need Help?

Please [submit an issue](https://github.com/mobilehero/alloy-plus/issues) on GitHub and provide information about your setup.


## License

[![](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)]()

This project is licensed under the terms of the MIT license. See the [license.md](https://github.com/mobilehero/alloy-plus/blob/master/license.md)  file.
This means you have full access to the source code and can modify it to fit your own needs. 

## Legal

_Superhero Studios Incorporated and this project are in no way affiliated with any of the following companies:_

  * _Appcelerator, Inc_
  * _Axway Inc_
  * _Apple Inc_
  * _Google Inc_

Alloy is developed by Appcelerator and the community and is Copyright (c) 2012 by Appcelerator, Inc. All Rights Reserved.   
Alloy is made available under the Apache Public License, version 2. See their [LICENSE](https://github.com/appcelerator/alloy/blob/master/LICENSE) file for more information.  


 [alloy+]: https://github.com/mobilehero/alloy-plus  "Alloy+"
 [npm]: https://www.npmjs.com/  "npm"
 [alloy]: https://github.com/appcelerator/alloy  "alloy"