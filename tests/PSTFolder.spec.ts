import * as chai from 'chai';
import * as mocha from 'mocha';

import { PSTFolder } from '../src/PSTFolder/PSTFolder.class';
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

describe('PSTFolder tests', () => {
    it('should have a root folder', () => {
        const folder: PSTFolder = pstFile.getRootFolder();
        expect(folder).to.not.be.null;
        expect(folder.subFolderCount).to.equal(3);
        expect(folder.hasSubfolders).to.be.true;
    });

    // folder structure should look like:
    // Personal folders
    //  |- Top of Personal Folders
    //  |  |- Deleted Items
    //  |  |- lokay-m
    //  |  |  |- MLOKAY (Non-Privileged)
    //  |  |  |  |- TW-Commercial Group
    //  |  |  |  |- Systems
    //  |  |  |  |- Sent Items
    //  |  |  |  |- Personal
    //  |- Search Root
    //  |- SPAM Search Folder 2

    it('root folder should have sub folders', () => {
        let childFolders: PSTFolder[] = pstFile.getRootFolder().getSubFolders();
        expect(childFolders.length).to.equal(3);
        let folder = childFolders[0];
        expect(folder.subFolderCount).to.equal(2);
        expect(folder.displayName).to.equal('Top of Personal Folders');
        childFolders = folder.getSubFolders();
        folder = childFolders[0];
        expect(folder.displayName).to.equal('Deleted Items');
        folder = childFolders[1];
        expect(folder.displayName).to.equal('lokay-m');
        // Log.debug1(JSON.stringify(folder, null, 2));
        childFolders = folder.getSubFolders();
        folder = childFolders[0];
        expect(folder.displayName).to.equal('MLOKAY (Non-Privileged)');
        childFolders = folder.getSubFolders();
        expect(childFolders[0].displayName).to.equal('TW-Commercial Group');
        expect(childFolders[1].displayName).to.equal('Systems');
        expect(childFolders[2].displayName).to.equal('Sent Items');
        expect(childFolders[3].displayName).to.equal('Personal');
        expect(folder.subFolderCount).to.equal(4);
        expect(folder.emailCount).to.equal(1);
        expect(folder.folderType).to.equal(0);
        expect(folder.contentCount).to.equal(1);
        expect(folder.unreadCount).to.equal(0);
        expect(folder.containerFlags).to.equal(0);
        expect(folder.containerClass).to.equal('IPF.Note');
        expect(folder.hasSubfolders).to.equal(true);
        // Log.debug1(JSON.stringify(folder, null, 2));

        folder.moveChildCursorTo(0);
        folder.moveChildCursorTo(1);
        folder.moveChildCursorTo(100);
    });
});