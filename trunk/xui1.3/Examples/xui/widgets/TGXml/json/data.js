{
header:[
{"caption":"no", "width":60, "type":"label"},
{"caption":"country", "width":60, "type":"listbox", editorListItems:["MA","SP","RA","UK","CA","IN"]},
{"caption":"customer", "width":50, "type":"input"},
{"caption":"employee", "width":70, "type":"input"},
{"caption":"indoor", "width":50,type:"checkbox"},
{"caption":"bill2008", "type":"number", "width":50, cellRenderer : function(cell){return '$'+(parseFloat(cell.value)||0)}},
{"caption":"bill2009", "type":"number", "width":50, cellRenderer : function(cell){return '$'+(parseFloat(cell.value)||0)}},
{"caption":"orderDate", "type":"date",  "width":70},
{"caption":"color", "type":"color",  "width":70},
{"caption":"progress", "type":"progress",  "width":120}
],

rows:[
["010-0", "MA", "Jerry", "Keith", false, 80, 46, 1242835200000,'#FF3300',0.4], 
["010-1", "SP", "Charles", "Marks", false, 40, 90, 1244649600000,'#FDE500',0.5], 
["010-2", "SP", "Vincent", "Harrison", false, 31, 40, 1247673600000,'#FFAE00',0.8], 
["020-3", "RA", "Edward", "Sidney", true, 80, 47, 1242489600000,'#FABF00',0.4], 
["020-4", "CA", "Patrick", "Solomon", true, 33, 38, 1241280000000,'#FEFF00',0.2], 
["020-5", "MA", "Leopold", "Glendon", true, 98, 36, 1239552000000,'#FFFCD0',0.3], 
["030-6", "SP", "Terence", "Edwin", false, 84, 41, 1237219200000,'#FFFAB0',0.5], 
["030-7", "SP", "Brent", "Mike", false, 97, 83, 1243353600000,'#FABF00',0.6], 
["030-8", "UK", "Sammy", "Kenneth", false, 31, 64, 1241625600000,'#FFAE00',0.2], 
["040-9", "CA", "Evan", "Chris", false, 43, 63, 1242835200000,'#FFFAB0',0.9]
]}