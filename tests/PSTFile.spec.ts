import * as chai from 'chai';
import * as mocha from 'mocha';

import { PSTFile } from '../src/PSTFile/PSTFile.class';
import { Log } from '../src/Log.class';

const resolve = require('path').resolve
const expect = chai.expect;
let pstFile: PSTFile;

before(() => {
    pstFile = new PSTFile(resolve('./tests/testdata/michelle_lokay_000_1_1_1_1.pst'));
});

after(() => {
    pstFile.close();
});

describe('PSTfile tests', () => {
    it('should open the file', () => {
        expect(pstFile.encryptionType).to.equal(1);
        expect(pstFile.pstFileType).to.equal(23);
        expect(pstFile.pstFilename).to.contain('michelle_lokay_000_1_1_1_1.pst');
        expect(pstFile.getMessageStore().displayName).to.equal('Personal folders');
        expect(pstFile.getRootFolder()).to.not.be.null;
        // Log.debug1(JSON.stringify(pstFile, null, 2));
    });
});