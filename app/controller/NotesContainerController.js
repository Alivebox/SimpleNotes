Ext.define('Notes.controller.NotesContainerController', {
	
    extend: 'Ext.app.Controller',

    config: {
	    refs: {
	    	notesContainer: 'notescontainer',
            notesForm: 'notesform',
            notesTitleToolbar: 'notesform label[name=titleNote]',
            mainTitleToolbar: 'notescontainer toolbar[name=mainToolbar]',
            navigationToolbar: 'notesform toolbar[name=navToolbar]',
            notesList: 'notescontainer list[name=notesList]',
            saveButton: 'notesform button[name=savebutton]',
            newNoteButton: 'notesform button[name=newNoteButton]',
            searchToolbar: 'notescontainer toolbar[name=searchToolbar]',
            textArea: 'notesform textareafield[name=text]'
	    },
	    control: {
	    	notesContainer: {
	    		newNote: 'onNewNote',
	    		editNote: 'onEditNote',
                refreshList: 'onRefreshList',
                searchKeyup: 'onSearchKeyup',
                clearSearch: 'onClearSearch'
	    	}
	    }
    },
    
    slideLeftTransition: { 
    	type: 'slide',
    	direction: 'left'
    },

    notesForm: undefined,
    
    onNewNote: function(){
    	this.executeNewNote();
    },
    
    /**
     * Here we create a new NoteItem instance with the default values 
     *  and activate the noteForm with it
     */
    executeNewNote: function(){
    	var tmpNow = new Date();
    	var tmpNoteId = tmpNow.getTime();
    	var tmpNewNote = Ext.create('Notes.model.NoteItem',{
    		id: tmpNoteId,
    		created: tmpNow,
    		title: '',
    		text: ''
    	});
    	this.activateNoteForm(tmpNewNote);
        this.changeToolbarTitle('New Note');
        this.setNavigationToolbarVisible(true);
    },
    
    /**
     * Here we active the noteForm with the selected noteItem
     */
    onEditNote: function(argNote){
    	this.activateNoteForm(argNote);
        this.changeToolbarTitle(argNote.get('text'));
        this.setNavigationToolbarVisible(false);
    },
    
    /**
     * Here we move to the notesForm view setting the noteItem passed as parameter
     */
    activateNoteForm: function(argNote){
    	if(!argNote){
    		return;
    	}
        if(this.notesForm == undefined){
            this.notesForm = Ext.create('Notes.view.NotesForm');
        }
        this.notesForm.setRecord(argNote);
    	Ext.Viewport.animateActiveItem(this.notesForm, this.slideLeftTransition);
    },

    changeToolbarTitle: function(argTitle){
        this.getNotesTitleToolbar().setHtml(Notes.util.StringUtil.getTitleFromText(argTitle));
    },

    onRefreshList: function(argList){
        this.updateNotesTitle(argList);
    },

    onSearchKeyup: function(argField){
        var value = argField.getValue();
        var tmpStore= Ext.getStore("NoteItems");
        tmpStore.clearFilter();

        if (value) {
            var searches = [value],
                regexps = [],
                i;

            for (i = 0; i < searches.length; i++) {
                if (!searches[i]) continue;

                regexps.push(new RegExp(searches[i], 'i'));
            }

            tmpStore.filter(function(record) {
                var matched = [];

                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('text').match(search);

                    matched.push(didMatch);

                }

                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    return matched[0];
                }
            });
        }
        this.getSearchToolbar().setHidden(false);
    },

    onClearSearch: function(){
        Ext.getStore("NoteItems").clearFilter();
    },

    setNavigationToolbarVisible: function(argVisible){
        this.getNavigationToolbar().setHidden(argVisible);
    },

    updateNotesTitle: function(argList){
        var tmpNotesStore = Ext.getStore('NoteItems');
        var tmpListItemsLength = tmpNotesStore.getData().length;
        if(tmpListItemsLength <= 0){
            this.getMainTitleToolbar().setTitle('Notes');
            this.getSearchToolbar().setHidden(true);
        }else{
            this.getMainTitleToolbar().setTitle('Notes ('+ tmpListItemsLength +')');
            this.getSearchToolbar().setHidden(false);
        }
    }
    
});
