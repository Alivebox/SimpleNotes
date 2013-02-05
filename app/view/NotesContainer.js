/**
 * Main notes application view.
 * Contains the main toolbar and below it, the NotesList component.
 */
Ext.define("Notes.view.NotesContainer", {
	
    extend: "Ext.Container",
    alias: 'widget.notescontainer',
	name: 'notescontainer',

	config: {
		layout: 'fit',
        cls: 'notescontainer'
	},
    
    initialize: function(){
    	this.callParent(arguments);
    	var tmpToolbar = this.createMainToolbar();
        var tmpSearchField = this.createSearchNotes();
    	var tmpNotesList = this.createNotesList();
    	this.add([
    		tmpToolbar,
            tmpSearchField,
    		tmpNotesList
    	]);
    },
    
    createMainToolbar: function(){
    	var tmpNewButton = this.createNewButton();
    	var tmpToolbar = {
    		xtype: "toolbar",
    		name: 'mainToolbar',
        	docked: "top",
        	title: "Notes",
            height: 80,
        	items: [
        		{
            		xtype: "spacer"
        		},
        		tmpNewButton
    		]
    	};
    	return tmpToolbar;
    },
    
    createNewButton: function(){
    	var tmpNewButton = {
    		xtype: "button",
    		name: 'newNoteButton',
            iconCls: 'add',
            ui: 'addbutton',
            iconMask: true,
    		scope: this,
    		handler: this.onNewNote
    	};
    	return tmpNewButton;
    },
    
    createNotesList: function(){
    	var tmpNotesList = {
    		xtype: 'noteslist',
            name: 'notesList',
    		store: Ext.getStore("NoteItems"),
    		listeners: {
    			scope: this,
    			itemtap: this.onEditNote,
                refresh: this.onRefreshData
    		}
    	};
    	return tmpNotesList;
    },

    createSearchNotes: function(){

        var tmpSearch= {
            xtype: 'searchfield',
            name: 'searchNotes',
            placeHolder: ' Search',
            width: '100%',
            cls: 'seachfield',
            listeners: {
                scope: this,
                keyup: this.onSearchKeyUp,
                clearicontap: this.onSearchClearIconTap
            }
        };

        var tmpToolbar={
            xtype: 'toolbar',
            name: 'searchToolbar',
            docked: 'top',
            items: [
                tmpSearch
            ]
        };

        return tmpToolbar;
    },

    onNewNote: function(){
    	this.fireEvent("newNote");
    },
    
    onEditNote: function(argList,argIndex,argTarget,argNote,argE,eOpts){
    	this.fireEvent("editNote",argNote);
    },

    onRefreshData: function(argList,eOpts){
        this.fireEvent("refreshList",argList);
    },

    onSearchKeyUp: function(argField) {
        this.fireEvent("searchKeyup", argField);
    },

    onSearchClearIconTap: function() {
        this.fireEvent("clearSearch");
    }

    });