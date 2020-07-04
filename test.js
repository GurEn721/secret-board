'use strict';
const pug = require('pug');
const assert = require('assert');

//pugのテンプレートにおけるxssの脆弱性テスト
const html = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    //""と''と``があるのは、中に入れるときに使える
    //下のはassert(html.includes('&lt;script&gt;alert(\'test\');&lt;/script&gt;'));だった
    content: "<script>alert('test');</script>",
    postedBy: 'guest1',
    trackingCookie: '519775250063603_a4ba078b4ea3d59eb3ba02dedc1613cc362cb29d',
    createdAt: new Date(),
    updateAt: new Date()
  }],
  user: 'guest1'
});

//スクリプトタグがエスケープされて含まれていることをチェック
assert(html.includes("&lt;script&gt;alert('test');&lt;/script&gt;"));
assert(html.includes("519775250063603"));
assert(!html.includes("a4ba078b4ea3d59eb3ba02dedc1613cc362cb29d"));
console.log('テストが正常に完了しました');