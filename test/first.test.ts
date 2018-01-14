import { assert } from 'chai';
import { suite, test, slow, timeout } from 'mocha-typescript';

@suite
class Hello {
  @test
  world() {
    assert.equal(2, 2, 'Expected one to equal two.');
  }
}
