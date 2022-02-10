import assert from 'assert';
import Keygrip from 'keygrip';

export function getSigningKeys({
  hashString,
}: {
  hashString: string;
}): Keygrip {
  // but we're going to use our list.
  // (note that the 'new' operator is optional)
  const keylist = ['SEKRIT3', 'SEKRIT2', 'SEKRIT1'];
  const keys = Keygrip(keylist);
  // .sign returns the hash for the first key
  // all hashes are SHA1 HMACs in url-safe base64
  let hash = keys.sign(hashString);

  assert.ok(/^[\w]{27}$/.test(hash));

  // .index returns the index of the first matching key
  let index = keys.index(hashString, hash);

  assert.strictEqual(index, 0);

  // .verify returns the a boolean indicating a matched key
  const matched = keys.verify(hashString, hash);

  assert.ok(matched);

  index = keys.index(hashString, 'o_O');
  assert.strictEqual(index, -1);

  // rotate a new key in, and an old key out
  keylist.unshift('SEKRIT4');
  keylist.pop();

  // if index > 0, it's time to re-sign
  index = keys.index(hashString, hash);
  assert.strictEqual(index, 1);
  hash = keys.sign(hashString);

  return keys;
}
