import { expect } from 'chai';
import { Cidr } from './cidr.js';

let cidr = new Cidr();

describe('CIDR library', function() {

  it('should determine whether CIDRs overlap', function () {

    const cidrs = [
      ['','',true],
      ['0.0.0.1','0.0.0.0/31',true],
      ['0.0.0.2','0.0.0.0/31',false],
      ['0.0.0.1','0.0.0.0/32',false],
      ['0.0.0.1','0.0.0.0/30',true],
      ['0.0.0.3','0.0.0.0/30',true],
      ['0.0.0.4','0.0.0.0/30',false],
      ['0.0.0.0','0.0.0.0/29',true],
      ['0.0.0.7','0.0.0.0/29',true],
      ['0.0.0.8','0.0.0.0/29',false],
      ['0.0.7.254','0.0.0.0/21',true],
      ['0.0.7.255','0.0.0.0/21',true],
      ['0.0.8.0','0.0.0.0/21',false],
      ['0.0.8.255','0.0.0.0/21',false],
      ['1.1.1.1','1.1.1.1/10',true],
      ['1.1.1.1','1.1.0.0/16',true],
      ['1.1.0.0','1.1.1.1/15',true],
      ['1.1.0.0','1.1.1.2/23',true],
      ['1.1.1.1','1.1.0.0/17',true],
      ['1.1.1.1','1.1.0.0/23',true],
      ['1.1.1.1','1.1.0.0/24',false],
      ['10.10.0.0/16','10.10.1.0/24',true],
      ['10.10.0.0/16','192.168.24.0/24',false],
      ['192.168.24.1','192.168.24.0/31',true],
      ['192.168.24.2','192.168.24.0/31',false],
      ['192.168.24.2','192.168.24.2/31',true],
      ['192.168.24.3','192.168.24.2/31',true],
      ['192.168.24.4','192.168.24.2/31',false],
      ['1.1.1.0/31','1.1.1.1/31',true],
      ['1.1.1.0/31','1.1.1.2/31',false],
      ['1.1.1.0/31','1.1.1.3/31',false],
      ['1.1.1.0/31','1.1.1.4/31',false],
      ['1.1.1.0/31','1.1.1.5/31',false],
      ['1.1.1.4/30','1.1.1.7/30',true],
      ['1.1.1.5/30','1.1.1.7/30',true],
      ['1.1.1.5/30','1.1.1.8/30',false],
      ['1.1.1.5/30','1.1.1.10/30',false],
      ['1.1.1.0/31','1.1.1.5/31',false]
    ];
  
    cidrs.forEach(function(pair){
    
      expect(cidr.doSubnetsOverlap(pair[0], pair[1])).to.equal(pair[2]);
    
      // Test comparing them in the opposite order, too
      expect(cidr.doSubnetsOverlap(pair[1], pair[0])).to.equal(pair[2]);
    
    });
  
  });

  it('should sort CIDRs by their binary representation', () => {

    const cidrs = [
      ['','',0],
      ['0.0.0.1','0.0.0.0', 1],
      ['0.0.0.2','0.0.0.0',1],
      ['0.0.0.2','0.0.0.1',1],
      ['0.0.0.2','0.0.0.3',-1],
      ['0.2.0.0','0.3.0.0',-1],
      ['0.2.0.0','0.1.0.0',1],
      ['0.0.2.0','0.1.0.0',-1],
      ['10.10.0.0','10.10.1.0',-1],
      ['10.10.0.0','10.10.1.0',-1],
      ['2.2.2.2','10.10.10.10',-1, "10 should sort later than 2, which doesn't work right in string comparisons if they aren't left-padded correctly"],
      ['192.168.24.1','192.168.24.0',1],
      ['192.168.24.2','192.168.24.2',0]
    ];
  
    cidrs.forEach(function(pair){
    
      if (pair[2] === 1) {
        expect(cidr.sortCidrByBinary(pair[0], pair[1])).to.be.above, pair[3];
      } else if (pair[2] === 0) {
        expect(cidr.sortCidrByBinary(pair[0], pair[1])).to.equal(0, pair[3]);
      } else if (pair[2] === -1) {
        expect(cidr.sortCidrByBinary(pair[0], pair[1])).to.be.below(0, pair[3]);
      }
    
      // Test comparing them in the opposite order, too
      if (pair[2] === 1) {
        expect(cidr.sortCidrByBinary(pair[1], pair[0])).to.be.below(0, pair[3]);
      } else if (pair[2] === 0) {
        expect(cidr.sortCidrByBinary(pair[1], pair[0])).to.equal(0, pair[3]);
      } else if (pair[2] === -1) {
        expect(cidr.sortCidrByBinary(pair[1], pair[0])).to.be.above(0, pair[3]);
      }
      
    
    });
  
  });

});

