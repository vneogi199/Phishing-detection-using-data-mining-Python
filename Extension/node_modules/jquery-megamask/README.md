# [jquery](http://jquery.com)-megamask

> Create input masks.

Plugin that creates masks for your inputs.

## Getting started

Install with [npm](https://npmjs.org/package/jquery-megamask);

Or get the source from src folder.

** bower, and jquery packages will come somewhen **


## Overview

```javascript
// initialize plugin
$("#my_input").megamask('xxx.999-99-*');

// some time ago
// when we need to get a raw (without mask symbols) value of input
$("#my_input").megamask("getRaw");

// another way
// when we get a default value some time ago
// (by default masks do this on initialization)
$("#my_input").val("abc123123").megamask("refresh");
```

## Options

The signature of plugin calling is:

```
$element.megamask(String mask, Object [options])
```

Where `mask` is a string, representing the mask. Currently available symbols:

Symbol | Definition
-------|-----------
9      | Any number value
x      | Any character (a-z)
*      | Any value