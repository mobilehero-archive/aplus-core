

<h3 align="center">
  <img src="https://cdn.secure-api.org/images/mobilehero-alloy-plus.jpg" alt="fastlane Logo" />
</h3>

> We have the capability to make the world's first bionic framework. Alloy+ will be that framework. Code Better... Stronger... Faster...

alloy-plus
============

Alloy+ is an entire framework built around [Appcelerator Alloy](http://www.appcelerator.com/mobile-app-development-products/).  This framework was built upon the ideas of Adamantium and the concept of customizing and extending 
Appcelerator Alloy.  How much faster or stronger all depends on YOU, the developer.  

There will be an assortment of alloy+ plugins (available as npm modules) that you can install in your project to help you take your existing development tools furthur 
than possible today.  You can choose which modules are executed in your `config.json` file (which is part of your Alloy project).  You can also easily create your own plugins by simply creating a npm module that follows a simple convention.  

## Install [![NPM version](https://badge.fury.io/js/%40mobile%2Falloy-plus.svg)](https://www.npmjs.com/package/@mobile/alloy-plus)

Install in the root folder of your Appcelerator mobile project (the folder containing `tiapp.xml`).

```bash
npm install @mobile/alloy-plus
```

## Alloy+ Plugins 

> ** Coming Soon! **

| Plugin  |  Description |
|---|---|---|
| `npm`  |  Execute npm commands (Useful for installing/updating npm packages that are part of your mobile app) |
|  `underscore` | Fix some issues with the implementation of underscore in Alloy and pave the way for upgrading to lodash   |
|  `babel` | Run babel transformations on your code during the build process, thus allowing support for ES6 and much more!  |
|  `nodejs` | Make `require` statements in your app support nodejs packages installed via npm  |



## License

```
The MIT License (MIT)

Copyright (c) 2016 Superhero Studios Incorporated

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
