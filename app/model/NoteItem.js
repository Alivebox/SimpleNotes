Ext.define('Notes.model.NoteItem', {
	
    extend: 'Ext.data.Model',
    
    config: {
    	idProperty: 'id',
    	fields: [
            { 
            	name: 'id', 
            	type: 'int' 
            },
            { 
            	name: 'created', 
            	type: 'date', 
            	dateFormat: 'c' 
            },
            {
            	name: 'title',
            	type: 'string'
            },
            { 
            	name: 'text', 
            	type: 'string' 
            }
        ],
        validations: [
        	{
        		type: 'presence',
        		field: 'id'
        	},
            {
            	type: 'presence',
            	field: 'created'
            },
            {
            	type: 'presence',
            	field: 'title',
            	message: 'Please enter a title for this note.'
            }
        ]
    }
    
});