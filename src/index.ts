import { PSTFile } from './PSTFile/PSTFile.class';
import { PSTTask } from './PSTTask/PSTTask.class';
import { PSTRecipient } from './PSTRecipient/PSTRecipient.class';
import { PSTAttachment } from './PSTAttachment/PSTAttachment.class';
import { PSTMessage } from './PSTMessage/PSTMessage.class';
import { PSTFolder } from './PSTFolder/PSTFolder.class';

if (typeof window !== 'undefined'){
	const BrowserFS = require('browserfs');
	BrowserFS.install(window);
	BrowserFS.FileSystem.IndexedDB.Create((e: Error, idbfs: any) => {
		if(e){
			console.log('[pst-extractor] Error Creating IndexedDB Filesystem', e);
		} else {
			BrowserFS.FileSystem.InMemory.Create((e: Error, imfs: any) => {
				if(e){
					console.log('[pst-extractor] Error Creating InMemory Filesystem', e);
				} else {
					BrowserFS.FileSystem.AsyncMirror.Create({sync:imfs, async:idbfs}, (e: Error, amfs: any) => {
						if(e){
							console.log('[pst-extractor] Error Creating Browser Filesystem', e);
						} else {
							BrowserFS.initialize(amfs);
							console.log('[pst-extractor] Browser Filesystem Initialized');
						}
					})
				}
			})
		}
	});
}

export {
	PSTFile,
	PSTTask,
	PSTRecipient,
	PSTAttachment,
	PSTMessage,
	PSTFolder
}