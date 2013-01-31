Ext.define('Notes.store.NoteItems', {
	
   extend: 'Ext.data.Store',
    
    config: {
    	model: 'Notes.model.NoteItem',
    	autoLoad: true,
    	proxy: {
            type: 'localstorage',
            id: 'noteItemsStore'
        },
    	sorters: [
    		{ 
    			property: 'created', 
    			direction: 'DESC'
    		}
    	],
    	grouper: {
            sortProperty: "created",
            direction: "DESC",
            groupFn: function(argRecord){
                if(argRecord && argRecord.get('created')) {
                    return argRecord.get('created').toDateString();
                }
                return '';
            }
        }
    }
    
});