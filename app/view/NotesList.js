Ext.define("Notes.view.NotesList", {
	
    extend: "Ext.dataview.List",
    alias: 'widget.noteslist',
	name: 'noteslist',

    config: {
    	loadingText: 'Loading Notes...',
    	grouped: true,
    	emptyText: 
    		'<pre>' +
    			'<div class="notesListEmptyText"></div>' +
    		'</pre>',
    	itemTpl: 
    		'<pre>' +
    			'<div>' +
                '<span class="list-item-narrative">{text}</span>' +
                '<img class="list-item-icon" src="resources/images/goto_up.png"/>' +
                '</div>' +
    		'</pre>'

    }
    
});