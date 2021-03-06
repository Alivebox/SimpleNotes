Ext.define('Notes.controller.NotesFormController', {
	
    extend: 'Ext.app.Controller',

    config: {
	    refs: {
	    	notesForm: 'notesform',
	    	notesContainer: 'notescontainer',
            notesTitleToolbar: 'notesform label[name=titleNote]',
            navigationToolbar: 'notesform toolbar[name=navToolbar]',
            prevButton: 'notesform button[name=previousButton]',
            nextButton: 'notesform button[name=nextButton]',
            saveButton: 'notesform button[name=savebutton]',
            newNoteButton: 'notesform button[name=newNoteButton]',
            mainTitleToolbar: 'notescontainer toolbar[name=mainToolbar]',
            searchToolbar: 'notescontainer toolbar[name=searchToolbar]',
            textNote: 'notesform textareafield[name=text]'
	    },
	    control: {
	    	notesForm: {
	    		saveNote: 'onSaveNote',
	    		removeNote: 'onRemoveNote',
	    		backToHome: 'onBackToHome',
                changeText: 'onChangeText',
                prevButtonClick: 'onPrevButtonClick',
                nextButtonClick: 'onNextButtonClick',
                createNewNote: 'onCreateNewNote',
                changeTextNote: 'onChangeTextNote',
                paintedTextNote: 'onPaintedTextNote'
	    	},
            notesContainer: {
                editNote: 'onEditNote'
            }
	    }
    },

    slideRightTransition: {
    	type: 'slide',
    	direction: 'right'
    },
    
    onSaveNote: function(){
        var tmpNotesForm = this.getNotesForm();
        var tmpNewValues = tmpNotesForm.getValues();
        if(tmpNewValues.text.length <= 0){
            this.activateNotesList();
        }else{
            this.saveData();
            this.setNavigationToolbarVisible(false);
            this.getSaveButton().setHidden(true);
            this.getNewNoteButton().setHidden(false);
        }
    },

    saveData: function(){
        var tmpCurrentNote = this.formToModel();
        this.addNoteToStore(tmpCurrentNote);
    },
    
    /**
     * Here we extract the values from the form and set them in the model instance
     */
    formToModel: function(){
    	var tmpNotesForm = this.getNotesForm();
    	var tmpCurrentNote = tmpNotesForm.getRecord();
    	var tmpNewValues = tmpNotesForm.getValues();
    	tmpCurrentNote.set('title',this.changeToolbarTitle(tmpNewValues.text));
    	tmpCurrentNote.set('text',tmpNewValues.text);
    	return tmpCurrentNote;
    },

    /**
     * Here we add the curren note to the Store using the localStorage proxy
     */
    addNoteToStore: function(argNote){
    	var tmpNotesStore = Ext.getStore('NoteItems');
    	if( !tmpNotesStore.findRecord("id",argNote.get("id")) ){
    		tmpNotesStore.add(argNote);
    	}
    	tmpNotesStore.sync();
    	tmpNotesStore.sort([
    		{ 
    			property: 'created', 
    			direction: 'DESC'
    		}
    	]);
    },
    
    onRemoveNote: function(){
        this.removeNoteFromStore();
    },

    removeNoteFromStore: function(){
    	var tmpNotesStore = Ext.getStore('NoteItems');
    	var tmpNotesForm = this.getNotesForm();
    	var tmpCurrentNote = tmpNotesForm.getRecord();
    	if( tmpNotesStore.findRecord("id",tmpCurrentNote.get("id")) ){
            this.selectedItemAfterRemove(tmpCurrentNote);
            tmpNotesStore.remove(tmpCurrentNote);
            tmpNotesStore.sync();
    	}

        this.setEnablePrevButton();
        this.setEnableNextButton();
        this.updateNotesTitle();
    },

    selectedItemAfterRemove: function(argCurrentNote){
        var tmpNote = this.getNextNote(argCurrentNote);
        if(tmpNote == undefined){
            tmpNote = this.getPrevNote(argCurrentNote);
        }
        if(tmpNote != undefined){
            this.getNotesForm().setRecord(tmpNote);
            this.changeToolbarTitle(tmpNote.getData().text);
            this.getSaveButton().setHidden(true);
            this.getNewNoteButton().setHidden(false);
        }else{
            this.activateNotesList();
        }
    },
    
    onBackToHome: function(){
        this.getSaveButton().setHidden(false);
        this.getNewNoteButton().setHidden(true);
    	this.activateNotesList();
        this.setNavigationToolbarVisible(true);
        var tmpNotesForm = this.getNotesForm();
        var tmpNewValues = tmpNotesForm.getValues();
        if(tmpNewValues.text.length > 0){
            this.saveData();
        }
    },
    
    activateNotesList: function(){
    	var tmpNotesContainer = this.getNotesContainer();
    	Ext.Viewport.animateActiveItem(tmpNotesContainer, this.slideRightTransition);
        this.updateNotesTitle();
    },

    onChangeText: function(argText){
        this.changeToolbarTitle(argText);
        this.getSaveButton().setHidden(false);
        this.getNewNoteButton().setHidden(true);
        this.adjustTextAreaHeight();
    },

    changeToolbarTitle: function(argTitle){
        var tmpTitle = Notes.util.StringUtil.getTitleFromText(argTitle);
        this.getNotesTitleToolbar().setHtml(tmpTitle);
        return tmpTitle;
    },

    setNavigationToolbarVisible: function(argVisible){
        if(argVisible == false){
            this.setEnablePrevButton();
            this.setEnableNextButton();
        }
        this.getNavigationToolbar().setHidden(argVisible);
    },

    setEnablePrevButton: function(){
        var tmpNotesStore = Ext.getStore('NoteItems');
        var tmpData = tmpNotesStore.getData();

        var tmpNotesForm = this.getNotesForm();
        var tmpCurrentNote = tmpNotesForm.getRecord();
        if(tmpData.length <= 0 || tmpData.items[0].getData().id == tmpCurrentNote.getData().id){
            this.getPrevButton().setDisabled(true);
        }else{
            this.getPrevButton().setDisabled(false);
        }
    },

    setEnableNextButton: function(){
        var tmpNotesStore = Ext.getStore('NoteItems');
        var tmpData = tmpNotesStore.getData();

        var tmpNotesForm = this.getNotesForm();
        var tmpCurrentNote = tmpNotesForm.getRecord();
        if(tmpData.length <= 0 || tmpData.items[tmpData.items.length-1].getData().id == tmpCurrentNote.getData().id){
            this.getNextButton().setDisabled(true);
        }else{
            this.getNextButton().setDisabled(false);
        }
    },

    onPrevButtonClick: function(){
        var tmpNotesForm = this.getNotesForm();
        var tmpCurrentNote = tmpNotesForm.getRecord();
        var tmpPrevNote = this.getPrevNote(tmpCurrentNote);
        if(tmpPrevNote != undefined){
            this.getNotesForm().setRecord(tmpPrevNote);
            this.changeToolbarTitle(tmpPrevNote.getData().text);
        }
        this.setEnablePrevButton();
        this.setEnableNextButton();
        this.getSaveButton().setHidden(true);
        this.getNewNoteButton().setHidden(false);
    },

    onNextButtonClick: function(){
        var tmpNotesForm = this.getNotesForm();
        var tmpCurrentNote = tmpNotesForm.getRecord();
        var tmpNextNote = this.getNextNote(tmpCurrentNote);
        if(tmpNextNote != undefined){
            this.getNotesForm().setRecord(tmpNextNote);
            this.changeToolbarTitle(tmpNextNote.getData().text);
        }
        this.setEnableNextButton();
        this.setEnablePrevButton();
        this.getSaveButton().setHidden(true);
        this.getNewNoteButton().setHidden(false);
    },

    getNextNote: function(argCurrentNote){
        var tmpNotesStore = Ext.getStore('NoteItems');
        var tmpData = tmpNotesStore.getData();

        for(var i= 0;i<=tmpData.items.length-1;i++){
            if(tmpData.items[i].getData().id == argCurrentNote.getData().id){
                if(i+1 < tmpData.items.length){
                    return tmpData.items[i+1];
                }
            }
        }
        return undefined;
    },

    getPrevNote: function(argCurrentNote){
        var tmpNotesStore = Ext.getStore('NoteItems');
        var tmpData = tmpNotesStore.getData();

        for(var i= 0;i<=tmpData.items.length-1;i++){
            if(tmpData.items[i].getData().id == argCurrentNote.getData().id){
                if(i-1 <= tmpData.items.length && i-1 >= 0){
                    return tmpData.items[i-1];
                }
            }
        }
        return undefined;
    },

    onCreateNewNote: function(){
        this.getSaveButton().setHidden(false);
        this.getNewNoteButton().setHidden(true);
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
        this.getNotesForm().setRecord(tmpNewNote);
        this.changeToolbarTitle('New Note');
        this.setNavigationToolbarVisible(true);
    },

    /**
     * Here we active the noteForm with the selected noteItem
     */
    onEditNote: function(argNote){
        this.getNotesForm().setRecord(argNote);
        this.setEnableNextButton();
        this.setEnablePrevButton();
    },

    updateNotesTitle: function(){
        var tmpNotesStore = Ext.getStore('NoteItems');
        tmpNotesStore.sync();
        if(tmpNotesStore.getData().length <= 0){
            this.getMainTitleToolbar().setTitle('Notes');
            this.getSearchToolbar().setHidden(true);
        }else{
            this.getMainTitleToolbar().setTitle('Notes ('+ tmpNotesStore.getData().length +')');
            this.getSearchToolbar().setHidden(false);
        }
    },

    onChangeTextNote: function(){
        this.adjustTextAreaHeight();
    },

    onPaintedTextNote: function(){
        this.adjustTextAreaHeight();
    },

    adjustTextAreaHeight: function(){
        var numOfRows = this.getTextNote().getValue().split("\n").length;
        var tmpLenght = this.getTextNote().getValue().length;
        if(numOfRows > 14){
            this.getTextNote().setMaxLength(tmpLenght );
        }else{
            this.getTextNote().setMaxLength(Notes.util.Constants.MAX_LENGHT_TEXT);
        }
    }

});
