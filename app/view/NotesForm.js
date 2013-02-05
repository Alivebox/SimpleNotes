Ext.define("Notes.view.NotesForm", {
	
    extend: "Ext.form.Panel",
    alias: 'widget.notesform',
	name: 'notesform',

    config: {
    	scrollable: 'vertical',
        cls: 'notesform'
    },

    initialize: function(){
    	this.callParent(arguments);
    	var tmpTopToolbar = this.createTopToolbar();
		var tmpBottomBar = this.createBottomToolbar();
		var tmpTextArea = this.createTextArea();
        var tmpDateToolbar = this.createDateToolbar();
        this.add([
        	tmpTopToolbar,
            tmpDateToolbar,
            tmpTextArea,
        	tmpBottomBar
        ]);

    },

    createDateToolbar: function(){
        var tmpToolbar = {
            xtype: 'label',
            width: '100%',
            docked: 'top',
            ui:'datecontainer',
            html: Ext.Date.format(new Date(), 'F j Y')
        };

        return tmpToolbar;
    },

    createTopToolbar: function(){
    	var tmpBackButton = {
            xtype: "button",
            text: "Notes",
            ui: 'defaultbutton',
            scope: this,
            handler: this.onBackToHome
        };

        var tmpSaveButton = {
            xtype: "button",
            name: 'savebutton',
            text: "Done",
            ui: 'defaultbutton',
            scope: this,
            handler: this.onSaveNote
        };

        var tmpNewNote={
            xtype: "button",
            name: 'newNoteButton',
            ui: 'addbutton',
            iconCls: 'add',
            iconMask: true,
            scope: this,
            hidden: true,
            handler: this.onNewNoteClick
        };

        var tmpNoteTitle={
            xtype: 'label',
            name: 'titleNote',
            html: 'New Note',
            cls: 'noteTitleLabel'
        };

        var tmpTopToolbar = {
            xtype: "toolbar",
            docked: "top",
            height: 80,
            cls: 'titletoolbar',
            items: [
                tmpBackButton,
                { xtype: "spacer" },
                tmpNoteTitle,
                { xtype: "spacer" },
                tmpSaveButton,
                tmpNewNote
            ]
        };
        return tmpTopToolbar;
    },

    createBottomToolbar: function(){
    	var tmpDeleteButton = {
            xtype: "button",
            scope: this,
            align: 'center',
            ui: 'transpatentbutton',
            iconCls: 'deletenote',
            handler: this.onRemoveNote
        };

        var tmpPrevButton = {
            xtype: 'button',
            scope: this,
            name: 'previousButton',
            ui: 'transpatentbutton',
            iconCls: 'prevbutton',
            align: 'left',
            listeners: {
                scope: this,
                tap: this.onPrevButtonClick
            }
        };

        var tmpNextButton = {
            xtype: 'button',
            scope:this,
            name: 'nextButton',
            align: 'right',
            iconCls: 'nextbutton',
            ui: 'transpatentbutton',
            listeners: {
                scope: this,
                tap: this.onNextButtonClick
            }
        };

        var tmpBottomToolbar = {
            xtype: "toolbar",
            docked: "bottom",
            hidden: true,
            name: 'navToolbar',
            ui: 'navigationtoolbar',
            items: [
                tmpPrevButton,{
                    xtype: 'spacer'
                },
                tmpDeleteButton,{
                    xtype: 'spacer'
                },
                tmpNextButton
            ]
        };
        return tmpBottomToolbar;
    },

    createTextArea: function(){
        var tmpNoteTextField = {
            xtype: 'textareafield',
            name: 'text',
            clearIcon: false,
            maxRows: 14,
            maxLength: 335,
            listeners: {
                scope: this,
                keyup: this.onChangeText,
                change: this.onchangeTextNote,
                painted: this.onPaintedText
            }
        };

        var tmpContainer={
            xtype:'container',
            name: 'textContainer',
            docked: 'top',
            width: '100%',
            height: '68%',
            scrollable: true,
            centered: true,
            items: [
                tmpNoteTextField
            ]
        };

    	return tmpContainer;
    },

    onSaveNote: function(){
    	this.fireEvent('saveNote');
    },
    
    onRemoveNote: function(){
    	this.fireEvent('removeNote');
    },
    
    onBackToHome: function(){
    	this.fireEvent('backToHome');
    },

    onChangeText: function(argTextArea,argE,eOpts){
        this.fireEvent('changeText',argTextArea.getValue());
    },

    onPrevButtonClick: function(argButton,argE,argOpts){
        this.fireEvent('prevButtonClick');
    },

    onNextButtonClick: function(argButton,argE,argOpts){
        this.fireEvent('nextButtonClick');
    },

    onNewNoteClick: function(){
        this.fireEvent('createNewNote');
    },

    onchangeTextNote: function(argTextAreaField,argNewValue,argOldValue,eOpts ){
        this.fireEvent('changeTextNote');
    },

    onPaintedText: function(argTextAreaField,eOpts){
        this.fireEvent('paintedTextNote');
    }

});