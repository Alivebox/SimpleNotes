/**
 * Created with JetBrains PhpStorm.
 * User: Richard
 * Date: 1/28/13
 * Time: 10:08 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Notes.util.StringUtil', {

    statics: {

        /**
         * return the title from the text
         * @param argText
         * @return the title getting from first line text
         */
        getTitleFromText: function(argText){
            var tmpTitle = argText;
            if(tmpTitle.length > 0){
                var lines = argText.split('\n');
                tmpTitle = lines[0];
            }

            return tmpTitle;
        }
    }
});