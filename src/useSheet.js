import {Jss} from 'jss';
import reactJss from 'react-jss';
import jssPx from 'jss-px';
import jssCamelCase from 'jss-camel-case';
import jssNested from 'jss-nested';

const jss = new Jss();

if (typeof window !== 'undefined') {
  const vendorPrefixer = require('jss-vendor-prefixer');
  jss.use(vendorPrefixer);
}
jss.use(jssPx);
jss.use(jssCamelCase);
jss.use(jssNested);

export default reactJss(jss);
