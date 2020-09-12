[![Build Status](https://travis-ci.org/timblack1/cidr-lib.svg?branch=master)](https://travis-ci.org/timblack1/cidr-lib)
# cidr-lib
cidr-lib - a library to determine whether IPv4 CIDRs/subnets overlap

Docs on each method are at [https://timblack1.github.io/cidr-lib/](https://timblack1.github.io/cidr-lib/)

## PURPOSE:  Provides methods for working with CIDRs.

The key methods it provides are:

* `doSubnetsOverlap()` - Pass it two subnet strings, and it tells you whether they overlap
* `sortCidrByBinary()` - Use this as your sort function's callback and you can sort subnets by their binary representation

Another public method some may find useful is:

* `getBinaryRepresentation()` - Returns the binary representation of a CIDR string.

A CIDR is a Classless Inter-Domain Routing address.  See https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing.

In a bit more detail, a CIDR is an IP address with an optional range suffix appended after a forward slash.  The range is
the number of digits (bits, counted from left to right) in the binary representation of the IP address to count as part of 
that CIDR's prefix. When the range suffix is present, only the prefix (and not the rest of the IP address's) digits are 
considered to be significant.  The result is the prefix represents a range of IP addresses, which is called a subnet.

## USAGE:

To use this library, import and instantiate the `Cidr` class, then call the`doSubnetsOverlap` method with two CIDRs,
like this:

```javascript
import { Cidr } from './cidr.js';

let cidr = new Cidr();

let overlaps = cidr.doSubnetsOverlap('11.1.1.2/21', '11.1.1.1/20');
```

## Related libraries that are more full-featured

Note:  In the future I might use a different library in the app for which I wrote this one.  A couple far more full-featured
libraries are below:

* [https://github.com/whitequark/ipaddr.js](https://github.com/whitequark/ipaddr.js)
* [https://github.com/beaugunderson/ip-address](https://github.com/beaugunderson/ip-address)