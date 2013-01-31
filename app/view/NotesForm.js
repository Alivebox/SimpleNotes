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
            xtype: 'container',
            layout: 'hbox',
            height: 30,
            width: '100%',
            cls: 'dateContainer',
            docked: 'top',
            items: [
                {
                    xtype: 'spacer'
                },{
                    xtype: 'label',
                    html: Ext.Date.format(new Date(), 'F j Y')
                }
            ]
        };

        return tmpToolbar;
    },

    createTopToolbar: function(){
    	var tmpBackButton = {
            xtype: "button",
            text: "Notes",
            scope: this,
            handler: this.onBackToHome
        };

        var tmpSaveButton = {
            xtype: "button",
            name: 'savebutton',
            text: "Done",
            scope: this,
            handler: this.onSaveNote
        };

        var tmpNewNote={
            xtype: "button",
            name: 'newNoteButton',
            iconCls: 'add',
            iconMask: true,
            scope: this,
            hidden: true,
            handler: this.onNewNoteClick
        };

        var tmpTopToolbar = {
            xtype: "toolbar",
            docked: "top",
            height: 80,
            title: "New Note",
            name: 'titleNote',
            cls: 'titletoolbar',
            items: [
                tmpBackButton,
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
            iconCls: 'deletenote',
            handler: this.onRemoveNote
        };

        var tmpPrevButton = {
            xtype: 'button',
            scope: this,
            name: 'previousButton',
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
            cls: 'navtoolbar',
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
            docked: 'top',
            clearIcon: false,
            flex: 1,
            listeners: {
                scope: this,
                keyup: this.onChangeText
            }
        };
    	return tmpNoteTextField;
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
    }
    
});