Ext.define("Notes.view.NotesList", {
	
    extend: "Ext.dataview.List",
    alias: 'widget.noteslist',
	name: 'noteslist',

    config: {
    	loadingText: 'Loading Notes...',
    	grouped: true,
    	emptyText: 
    		'<pre>' +
    			'<div></div>' +
    		'</pre>',
    	itemTpl: 
    		'<pre>' +
                '<div>' +
                    '<label class="list-item-narrative">{text}</label>' +
                    '<img class="list-item-icon" src="resources/images/goto_up.png"/>' +
                '</div>' +
    		'</pre>'

    }
    
});