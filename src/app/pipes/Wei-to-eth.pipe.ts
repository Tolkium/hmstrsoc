import { Pipe, PipeTransform } from '@angular/core';
const Web3 = require('web3');

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'weiToEth'})
export class WeiToEthPipe implements PipeTransform {
  transform(value: number): number {
    return Web3.utils.fromWei(value.toString())
  }
}
