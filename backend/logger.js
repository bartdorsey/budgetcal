import debug from 'debug';
import PrettyError from 'pretty-error';

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

export const appLog = debug('app');
export const appError = error => 
  debug('app:error')(pe.render(error))
export const validationLog = debug('valiation');